import type { Knex } from "knex";

export default class StaffService {
	constructor(
		private knex: Knex,
		private checkPassword: (a: string, b: string) => Promise<boolean>
	) {}

	login = async (local: string, hashed_pw: string) => {
		try {
			const staffRows = await this.knex("staffs")
				.select("id", "local", "hashed_pw", "nickname", "is_hr", "is_team_head")
				.where("local", local);
			if (staffRows.length != 0) {
				throw new Error("staffRows.length != 0)");
			}
			const staff = staffRows[0];
			if (!(await this.checkPassword(staff.hashed_pw, hashed_pw))) {
				throw new Error("!checkPassword");
			}
			const { id, nickname, is_hr, is_team_head } = staff;
			return { success: true, id, nickname, is_hr, is_team_head };
		} catch (error) {
			return { success: false, error };
		}
	};

	changePW = async (id: number, hashed_pw: string) => {
		try {
			const txn = await this.knex.transaction();
			try {
				const staffRows = await txn("staffs")
					.where("id", id)
					.update("hashed_pw", hashed_pw)
					.returning("*");
				if (staffRows.length !== 1) {
					throw `staffRows.length !== 1`;
				}
				await txn.commit();
			} catch (e) {
				await txn.rollback();
			}
			return { success: true };
		} catch (error) {
			return { success: false, error };
		}
	};
}
