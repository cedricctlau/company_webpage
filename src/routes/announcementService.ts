import { Knex } from "knex";
import { PublicAncmt, DeptAncmt, TeamAncmt } from "../models/ancmt";
import { DeptMember } from "../models/dept";
import Reply from "../models/reply";
import { TeamMember } from "../models/team";

class AnnouncementService {
	constructor(private knex: Knex) {}

	getAnnouncements = async (staff_id: number): Promise<Reply> => {
		const PublicAncmtQry = await this.knex<PublicAncmt>("public-ancmts").select("*")


		const deptQuery = await this.knex<DeptMember>("dept-members")
			.select("dept_id")
			.where("staff_id", staff_id);
		const dept_ids = deptQuery.map((obj) => obj.dept_id);
		const teamQuery = await this.knex<TeamMember>("team-members")
			.select("team_id")
			.where("staff_id", staff_id);
		const team_ids = teamQuery.map((obj) => obj.team_id);
		const ancmts = qryResult.map((row) => {
			return {
				id: row.id,
				content: row.content,
				creator: row.staff_id,
				updated_at: row.updated_at.substring(0, 10),
				is_public: row.is_public,
				dept_id: row.department_id,
				team_id: row.team_id,
				owned: row.staff_id === staff_id,
			};
		});
		return {
			success: true,
			outcome: { ancmts },
		};
	};

	announceToAll = async (staff_id: number, content: string): Promise<Reply> => {
		const addAnnouncementQry = await this.knex<PublicAncmt>("announcements")
			.insert({ staff_id, content, is_public: true })
			.returning(["id", "staff_id", "content"]);
		const ancmt_id = addAnnouncementQry[0].id;
		return { success: true, outcome: { ancmt_id } };
	};

	announceToDepartment = async (
		staff_id: number,
		content: string,
		dept_id: number
	): Promise<Reply> => {
		const checkDeptQuery = await this.knex<DeptMember>("dept-members")
			.select("*")
			.where({ staff_id, dept_id });
		if (!checkDeptQuery.length) {
			throw new Error(
				`This hacker try to announce to a department without membership.`
			);
		}
		const addAnnouncementQry = await this.knex<PublicAncmt>("announcements")
			.insert({ staff_id, content, is_public: false })
			.returning("id");
		const ancmt_id = addAnnouncementQry[0].id;
		const addRelationQry = await this.knex<DeptAncmt>("dept-ancmts")
			.insert({
				dept_id,
				ancmt_id,
			})
			.returning("id");
		const dept_ancmt_id = addRelationQry[0].id;
		return { success: true, outcome: { ancmt_id, dept_ancmt_id } };
	};

	announceToTeam = async (
		staff_id: number,
		content: string,
		team_id: number
	): Promise<Reply> => {
		const checkDeptQuery = await this.knex<TeamMember>("team-members")
			.select("*")
			.where({ staff_id, team_id });
		if (!checkDeptQuery.length) {
			throw new Error(
				`This hacker try to announce to a team without membership.`
			);
		}
		const addAnnouncementQry = await this.knex<PublicAncmt>("announcements")
			.insert({ staff_id, content, is_public: false })
			.returning("id");
		const ancmt_id = addAnnouncementQry[0].id;
		const addRelationQry = await this.knex<TeamAncmt>("team-ancmts")
			.insert({
				team_id,
				ancmt_id,
			})
			.returning("id");
		const team_ancmt_id = addRelationQry[0].id;
		return { success: true, outcome: { ancmt_id, team_ancmt_id } };
	};

	editAnnouncement = async (
		id: number,
		content: string,
		staff_id: number
	): Promise<Reply> => {
		const editQry = await this.knex<PublicAncmt>("announcements")
			.where({ id, staff_id })
			.update({ content })
			.returning(["id", "content", "staff_id"]);
		if (!editQry.length) {
			throw new Error(
				`This hacker tried to del an announcement owned by others`
			);
		}
		const editedEntry = editQry[0];
		return { success: true, outcome: { editedEntry } };
	};

	delAnnouncement = async (
		ancmt_id: number,
		staff_id: number
	): Promise<Reply> => {
		const delRelationQry1 = await this.knex<DeptAncmt>("dept-ancmts")
			.where({ ancmt_id })
			.del()
			.returning("id");
		const delRelationQry2 = await this.knex<TeamAncmt>("team-ancmts")
			.where({ ancmt_id })
			.del()
			.returning("id");
		const delQry = await this.knex("announcements")
			.where({ id: ancmt_id, staff_id })
			.del()
			.returning(["id", "content", "staff_id"]);
		if (!delQry.length) {
			throw new Error(
				`This hacker tried to del an announcement owned by others`
			);
		}
		const deletedEntry = delQry[0];
		const deletedRelationship = delRelationQry1.length + delRelationQry2.length;
		const json = {
			success: true,
			outcome: { deletedEntry, deletedRelationship },
		};
		return json;
	};
}

export default AnnouncementService;
