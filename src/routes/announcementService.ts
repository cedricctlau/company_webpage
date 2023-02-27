import { Knex } from "knex";
import Announcement from "../models/announcement";
import Reply from "../models/reply";

class AnnouncementService {
	constructor(private knex: Knex) {}

	getAnnouncements = async (id: number): Promise<Reply> => {
		const qryResult1 = await this.knex("staffs AS s")
			.leftJoin("titles as t", "s.id", "t.staff_id")
			.leftJoin("departments AS d", "t.id", "d.title_id")
			.select("s.id AS staff_id", "d.id AS department_id");
		const department_id = qryResult1[0]["department_id"];
		const qryResult2 = await this.knex<Announcement>("announcements AS a")
			.leftJoin("announcement-department AS ad", "a.id", "ad.announcement_id")
			.select("*")
			.where("department_id", department_id);
		const json = { success: true, outcome: { announcements: qryResult2 } };
		return json;
	};

	announceToAll = async (
		staff_id: number,
		announcement: string
	): Promise<Reply> => {
		const qryResult1 = await this.knex<Announcement>("announcements")
			.insert({ staff_id, announcement })
			.returning("id");

		const json = { success: true, outcome: { addedAnnouncement: qryResult1 } };
		return json;
	};
}

export default AnnouncementService;
