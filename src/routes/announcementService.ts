import { Knex } from "knex";
import Announcement from "../models/announcement";
import DepartmentAnnouncement from "../models/departmentAnnouncement";
import Reply from "../models/reply";
import Staff from "../models/staff";

class AnnouncementService {
  constructor(private knex: Knex) {}

  getAnnouncements = async (staff_id: number): Promise<Reply> => {
    const checkDepartmentQry = await this.knex<Staff>("staffs AS s")
      .leftJoin("titles as t", "s.title_id", "t.id")
      .leftJoin("departments AS d", "t.department_id", "d.id")
      .select("s.id", "d.id as department_id")
      .where({ "s.id": staff_id });
    const department_id = checkDepartmentQry[0]["department_id"];
    const getAnnouncementQry = await this.knex<Announcement>(
      "announcements AS a"
    )
      .leftJoin("staffs AS s", "s.id", "a.staff_id")
      .leftJoin("department-announcement AS da", "a.id", "da.announcement_id")
      .select("a.content", "s.local", "a.is_public", "a.updated_at")
      .where("da.department_id", department_id)
      .orWhere("a.is_public", true)
      .orderBy("a.created_at", "desc");
    const announcements = getAnnouncementQry.map((ANNC) => {
      ANNC.created_at = ANNC.created_at.substring(0, 10);
      return ANNC;
    });
    const json = {
      success: true,
      outcome: { announcements },
    };
    return json;
  };

  announceToAll = async (staff_id: number, content: string): Promise<Reply> => {
    const addAnnouncementQry = await this.knex<Announcement>("announcements")
      .insert({ staff_id, content, is_public: true })
      .returning(["id", "staff_id", "content"]);
    const json = {
      success: true,
      outcome: { addedAnnouncement: addAnnouncementQry[0] },
    };
    return json;
  };

  announceToDepartment = async (
    staff_id: number,
    content: string,
    department_id: number
  ): Promise<Reply> => {
    const addAnnouncementQry = await this.knex<Announcement>("announcements")
      .insert({ staff_id, content, is_public: false })
      .returning(["id", "staff_id", "content"]);
    const announcement_id = addAnnouncementQry[0].id;
    const linkAnnouncementToDepartmentQry =
      await this.knex<DepartmentAnnouncement>("department-announcement")
        .insert({ department_id, announcement_id })
        .returning(["department_id", "announcement_id"]);
    const json = {
      success: true,
      outcome: {
        addedAnnouncement: addAnnouncementQry[0],
        addedRelationship: linkAnnouncementToDepartmentQry[0],
      },
    };
    return json;
  };

  editAnnouncement = async (
    id: number,
    content: string,
    staff_id: number
  ): Promise<Reply> => {
    const txn = await this.knex.transaction();
    try {
      const editQry = await this.knex<Announcement>("announcements")
        .where({ id })
        .update({ content })
        .returning(["id", "content", "staff_id"]);
      if (editQry[0].staff_id !== staff_id) {
        throw new Error("No permission");
      }
      await txn.commit();
      const edited = editQry[0];
      const json = { success: true, outcome: { edited } };
      return json;
    } catch (e) {
      await txn.rollback();
      const error = e as Error;
      return { success: false, message: error.message };
    }
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
        .returning(["id", "content", "staff_id"]);
      if (!is_admin && delQry[0].staff_id !== staff_id) {
        throw new Error("No permission");
      }
      await txn.commit();
      const json = { success: true, outcome: { deleted: delQry[0] } };
      return json;
    } catch (e) {
      await txn.rollback();
      const error = e as Error;
      return { success: false, message: error.message };
    }
  };
}

export default AnnouncementService;
