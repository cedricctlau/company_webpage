import { Knex } from "knex";
import { DeptAncmt } from "../models/ancmt";
import Dept, { DeptMember } from "../models/dept";
import Reply from "../models/reply";
import Staff from "../models/staff";

class DeptAncmtService {
	constructor(private knex: Knex) {}

	getDeptList = async (staff_id: number): Promise<Reply> => {
		const deptList = await this.knex<DeptMember>("dept-members as dm")
			.leftJoin<Dept>("depts as d", "dm.dept_id", "d.id")
			.select("dm.dept_id", "d.dept")
			.where("dm.staff_id", staff_id)
			.andWhere("dm.is_dept_head", true);
		return { success: true, outcome: { deptList } };
	};

	getDeptAncmts = async (staff_id: number): Promise<Reply> => {
		const deptQuery = await this.knex<DeptMember>("dept-members")
			.select("dept_id")
			.where("staff_id", staff_id);
		const dept_ids = deptQuery.map((obj) => obj.dept_id);
		const deptAncmtQry = await this.knex<DeptAncmt>("dept-ancmts as da")
			.leftJoin<Staff>("staffs as s", "da.staff_id", "s.id")
			.leftJoin<Dept>("depts as d", "da.dept_id", "d.id")
			.select("da.*", "s.username", "d.dept")
			.whereIn("da.dept_id", dept_ids);
		const deptAncmts = deptAncmtQry.map((row) => {
			const { id, content, created_at, username, dept } = row;
			return {
				id,
				content,
				created_at: created_at.substring(0, 10),
				username,
				dept,
				owned: row.staff_id === staff_id,
			};
		});
		return {
			success: true,
			outcome: { deptAncmts },
		};
	};

	createDeptAncmt = async (
		staff_id: number,
		content: string,
		dept_id: number
	): Promise<Reply> => {
		const checkDeptQry = await this.knex<DeptMember>("dept-members")
			.select("*")
			.where({ staff_id, dept_id });
		if (!checkDeptQry.length) {
			throw new Error(
				`This hacker try to announce to a department without membership.`
			);
		}
		const insertQry = await this.knex<DeptAncmt>("dept-ancmts")
			.insert({ staff_id, content, dept_id })
			.returning("*");
		const newDeptAncmt = insertQry[0];
		return { success: true, outcome: { newDeptAncmt } };
	};

	editDeptAncmt = async (
		id: number,
		content: string,
		staff_id: number
	): Promise<Reply> => {
		const editQry = await this.knex<DeptAncmt>("dept-ancmts")
			.where({ id, staff_id })
			.update({ content, updated_at: this.knex.fn.now() })
			.returning("*");
		const editedEntry = editQry[0];
		return { success: true, outcome: { editedEntry } };
	};

	delDeptAncmt = async (id: number, staff_id: number): Promise<Reply> => {
		const delQry = await this.knex<DeptAncmt>("dept-ancmts")
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

export default DeptAncmtService;
