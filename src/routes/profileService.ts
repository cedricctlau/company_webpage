import type { Knex } from "knex";
import Dept, { DeptMember } from "../models/dept";
import Profile from "../models/profile";
import Reply from "../models/reply";
import Staff from "../models/staff";
import Team, { TeamMember } from "../models/team";
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
	};

	getMembership = async (id: number): Promise<Reply> => {
		const deptRows = await this.knex<DeptMember>("dept-members as dm")
			.leftJoin<Dept>("depts as d", "dm.dept_id", "d.id").select('*')
			.where("dm.staff_id", id)
			.orderBy("d.dept");
		const depts = deptRows.map((row) => {
			return { dept: row.dept, is_dept_head: row.is_dept_head };
		});

		const teamRows = await this.knex<TeamMember>("team-members as tm")
			.leftJoin<Team>("teams as t", "tm.team_id", "t.id")
			.select("*")
			.where("tm.staff_id", id)
			.orderBy("t.team");
		const teams = teamRows.map((row) => {
			return { team: row.team, is_team_head: row.is_team_head };
		});

		return { success: true, outcome: { depts, teams } };
	};
}
