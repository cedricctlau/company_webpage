import { Knex } from "knex";
import Department from "../models/department";
import Reply from "../models/reply";
import Title from "../models/title";

class AdminService {
	constructor(private knex: Knex) {}

	createTitle = async (
		title: string,
		department_id: number
	): Promise<Reply> => {
		const qryResult = await this.knex<Title>("titles")
			.insert({ title, department_id })
			.returning("*");
		return { success: true, outcome: { created: qryResult } };
	};

	changeTitle = async (
		id: number,
		title: string,
		department_id: number
	): Promise<Reply> => {
		const qryResult = await this.knex<Title>("titles")
			.where("id", id)
			.update({ title, department_id })
			.returning("*");
		return { success: true, outcome: { updated: qryResult } };
	};

	deleteTitle = async (id: number): Promise<Reply> => {
		const qryResult = await this.knex<Title>("titles")
			.where("id", id)
			.del()
			.returning("*");
		return { success: true, outcome: { deleted: qryResult } };
	};

	createDepartment = async (department: string): Promise<Reply> => {
		const qryResult = await this.knex<Department>("departments")
			.insert({ department })
			.returning("*");
		return { success: true, outcome: { created: qryResult } };
	};
	changeDepartment = async (id: number, department: string): Promise<Reply> => {
		const qryResult = await this.knex<Department>("departments")
			.where("id", id)
			.update({ department })
			.returning("*");
		return { success: true, outcome: { updated: qryResult } };
	};

	deleteDepartment = async (id: number): Promise<Reply> => {
		const qryResult = await this.knex<Department>("departments")
			.where("id", id)
			.del()
			.returning("*");
		return { success: true, outcome: { deleted: qryResult } };
	};
}

export default AdminService;
