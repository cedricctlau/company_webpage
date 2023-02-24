import type { Knex } from "knex";
import Reply from "../models/reply";
import Staff, { StaffProfile } from "../models/staff";

export default class HRService {
	constructor(private database: Knex) {}

	createLocal = async (
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
		const queryResult = await this.database<Staff>("staffs")
			.select("id", "local")
			.whereLike("local", `${local}%`);
		if (queryResult.length !== 0) {
			local = local + `${queryResult.length}`;
		}
		return { success: true, outcome: { local } };
	};

	register = async (
		local: string,
		hashed_pw: string,
		profile: StaffProfile
	): Promise<Reply> => {
		const {
			nickname,
			first_name,
			last_name,
			gender,
			tel,
			is_hr,
			is_team_head,
			title_id,
		} = profile;
		const queryResult = await this.database<Staff>("staffs")
			.insert({
				local,
				hashed_pw,
				nickname,
				first_name,
				last_name,
				gender,
				tel,
				is_hr,
				is_team_head,
				title_id,
			})
			.returning("id");
		const createdUserID = queryResult[0].id;
		return { success: true, outcome: { createdUserID } };
	};

	changeProfile = async (id: string, profile: StaffProfile): Promise<Reply> => {
		const {
			nickname,
			first_name,
			last_name,
			gender,
			tel,
			is_hr,
			is_team_head,
			title_id,
		} = profile;
		await this.database<Staff>("staffs").where("id", id).update({
			nickname,
			first_name,
			last_name,
			gender,
			tel,
			is_hr,
			is_team_head,
			title_id,
		});
		return { success: true };
	};
}
