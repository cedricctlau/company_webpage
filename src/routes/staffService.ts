import type { Knex } from "knex";
import Reply from "../models/reply";
import Staff from "../models/staff";

export default class StaffService {
	constructor(
		private database: Knex,
		private checkPassword: (a: string, b: string) => Promise<boolean>
	) {}

	login = async (local: string, hashed_pw: string): Promise<Reply> => {
		const queryResult = await this.database<Staff>("staffs")
			.select("id", "local", "hashed_pw", "nickname", "is_hr", "is_team_head")
			.where("local", local);
		if (!queryResult.length) {
			return { success: true, message: "No such username" };
		}
		const staff = queryResult[0];
		const checkPassword = await this.checkPassword(staff.hashed_pw, hashed_pw);
		if (!checkPassword) {
			return { success: true, message: "Incorrect password" };
		}
		const { id, nickname, is_hr, is_team_head } = staff;
		return { success: true, outcome: { id, nickname, is_hr, is_team_head } };
	};

	changePW = async (id: number, hashed_pw: string): Promise<Reply> => {
		await this.database("staffs")
			.where("id", id)
			.update({hashed_pw})
			.returning("id");
		return { success: true };
	};
}
