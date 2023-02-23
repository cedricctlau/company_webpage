import type { Knex } from "knex";
import { checkPassword } from "../helpers/hash";

export default class StaffService {
  constructor(private knex: Knex) {}

  login = async (local: string, hashed_pw: string) => {
    try {
      const staffRows = await this.knex("staffs")
        .select("id", "local", "hashed_pw", "nickname", "is_hr", "is_team_head")
        .where("local", local);
      if (staffRows.length != 0) {
        throw new Error("staffRows.length != 0)");
      }
      const staff = staffRows[0];
      if (!(await checkPassword(staff.hashed_pw, hashed_pw))) {
        throw new Error("!checkPassword");
      }
      return { success: true, staff };
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
