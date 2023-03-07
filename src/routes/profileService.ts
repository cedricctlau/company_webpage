import type { Knex } from "knex";
import Profile from "../models/profile";
import Reply from "../models/reply";
import Staff from "../models/staff";
import Title from "../models/title";

export default class ProfileService {
	constructor(private knex: Knex) {}

	getAllProfiles = async (): Promise<Reply> => {
		const jointRows = await this.knex<Staff>("staffs as s")
			.leftJoin<Profile>("profiles as p", "s.profile_id", "p.id")
			.leftJoin<Title>("titles as t", "p.title_id", "t.id")
			.select("s.id as staff_id", "s.username", "p.*", "t.title")
			.where("active", true)
			.orderBy([{ column: "p.last_name" }, { column: "p.first_name" }]);
		const profiles = jointRows.map((row) => {
			return {
				staff_id: row.staff_id,
				name: row.last_name + ", " + row.first_name + " (" + row.nickname + ")",
				gender: row.gender,
				title: row.title,
				email: row.username,
				tel: row.tel,
				picture: row.picture,
			};
		});
		return { success: true, outcome: { profiles } };
	};

	getAllTitles = async (): Promise<Reply> => {
		const titleRows = await this.knex<Title>("titles").orderBy("title");
		const titles = titleRows.map((row) => row.title);
		return { success: true, outcome: { titles } };
	}
}
