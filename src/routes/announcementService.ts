import { Knex } from "knex";
import Announcement from "../models/announcement";
import DepartmentAnnouncement from "../models/departmentAnnouncement";
import Reply from "../models/reply";

class AnnouncementService {
	constructor(private knex: Knex) {}

	getAnnouncements = async (staff_id: number): Promise<Reply> => {
		const checkDepartmentQry = await this.knex("staffs AS s")
			.leftJoin("titles as t", "s.id", "t.staff_id")
			.leftJoin("departments AS d", "t.id", "d.title_id")
			.select("s.id AS staff_id", "d.id AS department_id")
			.where({ staff_id });
		const department_id = checkDepartmentQry[0]["department_id"];
		const getAnnouncementQry = await this.knex<Announcement>(
			"announcements AS a"
		)
			.leftJoin("department-announcement AS da", "a.id", "da.announcement_id")
			.select("*")
			.where("da.department_id", department_id)
			.orWhere("a.is_public", true);
		const json = {
			success: true,
			outcome: { announcements: getAnnouncementQry },
		};
		return json;
	};

	announceToAll = async (
		staff_id: number,
		announcement: string
	): Promise<Reply> => {
		const addAnnouncementQry = await this.knex<Announcement>("announcements")
			.insert({ staff_id, announcement, is_public: true })
			.returning("id");
		const json = {
			success: true,
			outcome: { addedAnnouncement: addAnnouncementQry },
		};
		return json;
	};

	announceToDepartment = async (
		staff_id: number,
		announcement: string,
		department_id: number
	): Promise<Reply> => {
		const addAnnouncementQry = await this.knex<Announcement>("announcements")
			.insert({ staff_id, announcement, is_public: false })
			.returning("id");
		const announcement_id = addAnnouncementQry[0].id;
		const linkAnnouncementToDepartmentQry =
			await this.knex<DepartmentAnnouncement>("department-announcement")
				.insert({ department_id, announcement_id })
				.returning("id");
		const json = { success: true, outcome: { announcement_id } };
		return json;
	};

	editAnnouncement = async (
		id: number,
		announcement: string,
		staff_id: number
	): Promise<Reply> => {
		const editQry = await this.knex<Announcement>("announcements")
			.where({ id, staff_id })
			.update({ announcement })
			.returning("id");
		const edited = editQry[0];
		const json = { success: true, outcome: { edited } };
		return json;
	};

	delAnnouncement = async (
		id: number,
		staff_id: number,
		is_admin: boolean
	): Promise<Reply> => {
		const txn = await this.knex.transaction();
		try {
			const delQry = await txn("announcements as a")
				.where({ id })
				.join("department-announcement as da", "a.id", "da.announcement_id")
				.del()
				.returning(["id", "staff_id"]);
			if (!is_admin && delQry[0].staff_id !== staff_id) {
				throw new Error("No permission");
			}
			await txn.commit();
			const json = { success: true, outcome: { deleted: delQry[0].id } };
			return json;
		} catch (e) {
			await txn.rollback();
			const error = e as Error;
			return { success: false, message: error.message };
		}
	};
}

export default AnnouncementService;
