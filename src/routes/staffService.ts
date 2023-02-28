import type { Knex } from "knex";
import Reply from "../models/reply";
import Staff, { StaffProfile } from "../models/staff";

export default class StaffService {
	constructor(
		private knex: Knex,
		private checkPassword: (a: string, b: string) => Promise<boolean>
	) {}

	login = async (local: string, hashed_pw: string): Promise<Reply> => {
		const queryResult = await this.knex<Staff>("staffs")
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
		await this.knex<Staff>("staffs")
			.where("id", id)
			.update({ hashed_pw })
			.returning("id");
		return { success: true };
	};

	getProfile = async (id: number): Promise<Reply> => {
		const profileQry = await this.knex<Staff>("staffs")
			.where({ id })
			.select("*");
		const {
			nickname,
			first_name,
			last_name,
			gender,
			tel,
			is_hr,
			is_team_head,
			title_id,
		} = profileQry[0];
		const profile: StaffProfile = {
			nickname,
			first_name,
			last_name,
			gender,
			tel,
			is_hr,
			is_team_head,
			title_id,
		};
		return { success: true, outcome: { profile } };
	};
}
