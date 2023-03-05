import { Knex } from "knex";
import { PublicAncmt } from "../models/ancmt";
import Reply from "../models/reply";
import Staff from "../models/staff";

class PublicAncmtService {
	constructor(private knex: Knex) {}

	getPublicAncmts = async (staff_id: number): Promise<Reply> => {
		const publicAncmtQry = await this.knex<PublicAncmt>("public-ancmts as p")
			.leftJoin<Staff>("staffs as s", "p.staff_id", "s.id")
			.select("p.*", "s.username");
		const publicAncmts = publicAncmtQry.map((row) => {
			const { id, content, created_at, username } = row;
			return {
				id,
				content,
				created_at: created_at.substring(0, 10),
				username,
				owned: row.staff_id === staff_id ? "owned" : "",
			};
		});
		return {
			success: true,
			outcome: { publicAncmts },
		};
	};

	createPublicAncmt = async (
		staff_id: number,
		content: string
	): Promise<Reply> => {
		const insertQry = await this.knex<PublicAncmt>("public-ancmts")
			.insert({ staff_id, content })
			.returning("*");
		const newPublicAncmt = insertQry[0];
		return { success: true, outcome: { newPublicAncmt } };
	};

	editPublicAncmt = async (
		id: number,
		content: string,
		staff_id: number
	): Promise<Reply> => {
		const editQry = await this.knex<PublicAncmt>("public-ancmts")
			.where({ id, staff_id })
			.update({ content, updated_at: this.knex.fn.now() })
			.returning("*");
		const editedEntry = editQry[0];
		return { success: true, outcome: { editedEntry } };
	};

	delPublicAncmt = async (id: number, staff_id: number): Promise<Reply> => {
		const delQry = await this.knex<PublicAncmt>("public-ancmts")
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

export default PublicAncmtService;
