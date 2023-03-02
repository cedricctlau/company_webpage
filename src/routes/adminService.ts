import { Knex } from "knex";
import Dept from "../models/dept";
import Reply from "../models/reply";
import Team from "../models/team";
import Title from "../models/title";

class AdminService {
	constructor(private knex: Knex) {}

	createTitle = async (title: string): Promise<Reply> => {
		const qryResult = await this.knex<Title>("titles")
			.insert({ title })
			.returning("*");
		const createdEntry = qryResult[0];
		return { success: true, outcome: { createdEntry } };
	};

	editTitle = async (id: number, title: string): Promise<Reply> => {
		const qryResult = await this.knex<Title>("titles")
			.where("id", id)
			.update({ title })
			.returning("*");
		const editedEntry = qryResult[0];
		return { success: true, outcome: { editedEntry } };
	};

	createDept = async (dept: string): Promise<Reply> => {
		const qryResult = await this.knex<Dept>("depts")
			.insert({ dept })
			.returning("*");
		const createdEntry = qryResult[0];
		return { success: true, outcome: { createdEntry } };
	};

	editDept = async (id: number, dept: string): Promise<Reply> => {
		const qryResult = await this.knex<Dept>("depts")
			.where("id", id)
			.update({ dept })
			.returning("*");
		const editedEntry = qryResult[0];
		return { success: true, outcome: { editedEntry } };
	};

	createTeam = async (team: string): Promise<Reply> => {
		const qryResult = await this.knex<Team>("teams")
			.insert({ team })
			.returning("*");
		const createdEntry = qryResult[0];
		return { success: true, outcome: { createdEntry } };
	};

	editTeam = async (id: number, team: string): Promise<Reply> => {
		const qryResult = await this.knex<Team>("teams")
			.where("id", id)
			.update({ team })
			.returning("*");
		const editedEntry = qryResult[0];
		return { success: true, outcome: { editedEntry } };
	};
}

export default AdminService;
