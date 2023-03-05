import type { Knex } from "knex";
import Priv from "../models/priv";
import Profile from "../models/profile";
import Reply from "../models/reply";
import Staff from "../models/staff";
import Title from "../models/title";

export default class UserService {
	constructor(
		private knex: Knex,
		private checkPassword: (a: string, b: string) => Promise<boolean>
	) {}

	login = async (username: string, hashed_pw: string): Promise<Reply> => {
		const queryResult = await this.knex<Staff>("staffs as s")
			.select(
				"id",
				"username",
				"hashed_pw",
				"priv_all",
				"priv_dept",
				"priv_team",
				"priv_private"
			)
			.where("username", username);
		if (!queryResult.length) {
			return { success: true, message: "Incorrect username" };
		}
		const staff = queryResult[0];
		const checkPassword = await this.checkPassword(staff.hashed_pw, hashed_pw);
		if (!checkPassword) {
			return { success: true, message: "Incorrect password" };
		}
		const { id, priv_all, priv_dept, priv_team, priv_private } = staff;
		const priv: Priv = { priv_all, priv_dept, priv_team, priv_private };
		return { success: true, outcome: { staff: { id, priv } } };
	};

	changePW = async (staff_id: number, hashed_pw: string): Promise<Reply> => {
		await this.knex<Staff>("staffs")
			.where("id", staff_id)
			.update({ hashed_pw })
			.returning("id");
		return { success: true };
	};

	getProfile = async (staff_id: number): Promise<Reply> => {
		const queryResult = await this.knex<Profile>("profiles")
			.select("*")
			.where("staff_id", staff_id);
		const profile = queryResult[0];
		return { success: true, outcome: { profile } };
	};

	getAllProfiles = async (): Promise<Reply> => {
		const profiles = await this.knex<Staff>("staffs as s")
			.leftJoin<Profile>("profiles as p", "s.profile_id", "p.id")
			.leftJoin<Title>("titles as t", "p.title_id", "t.id")
			.select("*");
		return { success: true, outcome: { profiles } };
	};

	getNickname = async (staff_id: number): Promise<Reply> => {
		const queryResult = await this.knex<Profile>("profiles")
			.select("nickname")
			.where("staff_id", staff_id);
		const nickname = queryResult[0].nickname;
		return { success: true, outcome: { nickname } };
	};
}
