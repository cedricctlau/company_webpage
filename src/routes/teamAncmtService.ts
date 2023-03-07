import { Knex } from "knex";
import { TeamAncmt } from "../models/ancmt";
import Team, { TeamMember } from "../models/team";
import Reply from "../models/reply";
import Staff from "../models/staff";

class TeamAncmtService {
	constructor(private knex: Knex) {}

	getTeamList = async (staff_id: number): Promise<Reply> => {
		const teamList = await this.knex<TeamMember>("team-members as tm")
			.leftJoin<Team>("teams as t", "tm.team_id", "t.id")
			.select("tm.team_id", "t.team")
			.where("tm.staff_id", staff_id)
			.andWhere("tm.is_team_head", true);
		return { success: true, outcome: { teamList } };
	};

	getTeamAncmts = async (staff_id: number): Promise<Reply> => {
		const teamQuery = await this.knex<TeamMember>("team-members")
			.select("team_id")
			.where("staff_id", staff_id);
		const team_ids = teamQuery.map((obj) => obj.team_id);
		const teamAncmtQry = await this.knex<TeamAncmt>("team-ancmts as ta")
			.leftJoin<Staff>("staffs as s", "ta.staff_id", "s.id")
			.leftJoin<Team>("teams as t", "ta.team_id", "t.id")
			.select("ta.*", "s.username", "t.team")
			.whereIn("ta.team_id", team_ids)
			.orderBy("created_at", "desc");
		const teamAncmts = teamAncmtQry.map((row) => {
			const { id, content, staff_id: owner_id, created_at, username, team } = row;
			return {
				id,
				staff_id: owner_id,
				content,
				created_at: created_at.toISOString().substring(0, 10),
				username,
				team,
				owned: staff_id === owner_id,
			};
		});
		return {
			success: true,
			outcome: { teamAncmts },
		};
	};

	createTeamAncmt = async (
		staff_id: number,
		content: string,
		team_id: number
	): Promise<Reply> => {
		const checkTeamQry = await this.knex<TeamMember>("team-members")
			.select("*")
			.where({ staff_id, team_id });
		if (!checkTeamQry.length) {
			throw new Error(
				`This hacker try to announce to a department without membership.`
			);
		}
		const insertQry = await this.knex<TeamAncmt>("team-ancmts")
			.insert({ staff_id, content, team_id })
			.returning("*");
		const newTeamAncmt = insertQry[0];
		return { success: true, outcome: { newTeamAncmt } };
	};

	editTeamAncmt = async (
		id: number,
		content: string,
		staff_id: number
	): Promise<Reply> => {
		const editQry = await this.knex<TeamAncmt>("team-ancmts")
			.where({ id, staff_id })
			.update({ content, updated_at: this.knex.fn.now() })
			.returning("*");
		const editedEntry = editQry[0];
		return { success: true, outcome: { editedEntry } };
	};

	delTeamAncmt = async (id: number, staff_id: number): Promise<Reply> => {
		const delQry = await this.knex<TeamAncmt>("team-ancmts")
			.where({ id, staff_id })
			.del()
			.returning("*");
		const deletedEntry = delQry[0];
		const json = {
			success: true,
			outcome: { deletedEntry },
		};
		return json;
	};
}

export default TeamAncmtService;
