import { Knex } from "knex";
import Dept from "../models/dept";
import PersonalInfo from "../models/personalInfo";
import Profile from "../models/profile";
import Reply from "../models/reply";
import Staff from "../models/staff";
import Team from "../models/team";
import Title from "../models/title";

class AdminService {
	constructor(private knex: Knex) {}

	createTitle = async (title: string): Promise<Reply> => {
		const qryResult = await this.knex<Title>("titles")
			.insert({ title })
			.returning("*");
		const createdEntry = qryResult[0];
		return { success: true, outcome: { createdEntry } };
	};

	editTitle = async (id: number, title: string): Promise<Reply> => {
		const qryResult = await this.knex<Title>("titles")
			.where("id", id)
			.update({ title })
			.returning("*");
		const editedEntry = qryResult[0];
		return { success: true, outcome: { editedEntry } };
	};

	createDept = async (dept: string): Promise<Reply> => {
		const qryResult = await this.knex<Dept>("depts")
			.insert({ dept })
			.returning("*");
		const createdEntry = qryResult[0];
		return { success: true, outcome: { createdEntry } };
	};

	editDept = async (id: number, dept: string): Promise<Reply> => {
		const qryResult = await this.knex<Dept>("depts")
			.where("id", id)
			.update({ dept })
			.returning("*");
		const editedEntry = qryResult[0];
		return { success: true, outcome: { editedEntry } };
	};

	createTeam = async (team: string): Promise<Reply> => {
		const qryResult = await this.knex<Team>("teams")
			.insert({ team })
			.returning("*");
		const createdEntry = qryResult[0];
		return { success: true, outcome: { createdEntry } };
	};

	editTeam = async (id: number, team: string): Promise<Reply> => {
		const qryResult = await this.knex<Team>("teams")
			.where("id", id)
			.update({ team })
			.returning("*");
		const editedEntry = qryResult[0];
		return { success: true, outcome: { editedEntry } };
	};

	getProfileSudo = async (staff_id: number): Promise<Reply> => {
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

	genAcc = async (
		nickname: string,
		first_name: string,
		last_name: string
	): Promise<Reply> => {
		const first_name_words = first_name.split(" ");
		const initials = first_name_words.reduce(
			(initials, word) => (initials += word.toLowerCase().at(0)),
			""
		);
		let local = nickname.toLowerCase() + initials + last_name.toLowerCase();
		const staffRows = await this.knex<Staff>("staffs")
			.select("id", "username")
			.whereLike("username", `${local}%`);

		const locals = staffRows.map((obj) =>
			obj.username.substring(0, obj.username.search("@"))
		);
		if (locals.length !== 0) {
			local = local + `${locals.length}`;
		}
		const email = local + "@candy.io";
		const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
		const nums = "1234567890";
		const symbols = "!@#$%^&*";
		let temp = "";
		for (let i = 0; i < 4; i++) {
			temp += chars[Math.floor(Math.random() * chars.length)];
		}
		for (let i = 0; i < 4; i++) {
			temp += nums[Math.floor(Math.random() * nums.length)];
		}
		for (let i = 0; i < 2; i++) {
			temp += symbols[Math.floor(Math.random() * symbols.length)];
		}
		const password = temp;
		return { success: true, outcome: { email, password } };
	};
}

export default AdminService;
