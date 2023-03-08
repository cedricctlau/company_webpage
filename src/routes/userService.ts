import type { Knex } from "knex";
import { DeptMember } from "../models/dept";
import PersonalInfo from "../models/personalInfo";
import Priv from "../models/priv";
import Profile from "../models/profile";
import Reply from "../models/reply";
import Staff from "../models/staff";
import { TeamMember } from "../models/team";
import Title from "../models/title";

export default class UserService {
	constructor(
		private knex: Knex,
		private hashPassword: (a: string) => Promise<string>,
		private checkPassword: (a: string, b: string) => Promise<boolean>
	) {}

	login = async (username: string, password: string): Promise<Reply> => {
		const staffRows = await this.knex<Staff>("staffs")
			.select("id", "username", "hashed_pw", "is_admin")
			.where("username", username);
		if (!staffRows.length) {
			return { success: true, message: "Incorrect username" };
		}

		const staff = staffRows[0];
		const checkPassword = await this.checkPassword(password, staff.hashed_pw);
		if (!checkPassword) {
			return { success: true, message: "Incorrect password" };
		}
		const { id, is_admin: isAdmin } = staff;
		const deptMemberRows = await this.knex<DeptMember>("dept-members")
			.select("*")
			.where({ staff_id: id, is_dept_head: true });
		const isDeptHead = deptMemberRows.length > 0 ? true : false;
		const teamMemberRows = await this.knex<TeamMember>("team-members")
			.select("*")
			.where({ staff_id: id, is_team_head: true });
		const isTeamHead = teamMemberRows.length > 0 ? true : false;
		const priv: Priv = { isAdmin, isDeptHead, isTeamHead };
		return { success: true, outcome: { staff: { id, priv } } };
	};

	changePW = async (
		staff_id: number,
		old_pw: string,
		new_pw: string
	): Promise<Reply> => {
		const staffRows = await this.knex<Staff>("staffs")
			.select("hashed_pw")
			.where("id", staff_id);
		const check = await this.checkPassword(old_pw, staffRows[0].hashed_pw);
		if (!check) {
			return { success: true, message: "Wrong PW" };
		}
		const hashed_pw = await this.hashPassword(new_pw);
		await this.knex<Staff>("staffs")
			.where("id", staff_id)
			.update({ hashed_pw })
			.returning("id");
		return { success: true };
	};

	getSelfProfile = async (staff_id: number): Promise<Reply> => {
		const jointRows = await this.knex<Staff>("staffs as s")
			.leftJoin<Profile>("profiles as p", "s.profile_id", "p.id")
			.leftJoin<Title>("titles as t", "p.title_id", "t.id")
			.leftJoin<PersonalInfo>(
				"personal-infos as pi",
				"s.personal_info_id",
				"pi.id"
			)
			.select("s.id as staff_id", "s.username", "p.*", "t.title", "pi.*")
			.where("s.id", staff_id);

		let profile = jointRows[0];
		profile.date_of_birth = profile.date_of_birth
			.toISOString()
			.substring(0, 10);
		return { success: true, outcome: { profile } };
	};
}
