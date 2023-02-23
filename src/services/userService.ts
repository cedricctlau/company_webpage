import type { Knex } from "knex";
import { checkPassword } from "../helpers/hash";

export default class UserService {
  constructor(private knex: Knex) {}

  login = async (email: string, hashedPW: string) => {
    try {
      const staffRows = await this.knex("staffs")
        .select("id", "email", "hashed_pw", "nickname", "is_hr", "is_team_head")
        .where("email", email);
      if (staffRows.length != 0) {
        throw new Error("staffRows.length != 0)");
      }
      const staff = staffRows[0];
      if (!(await checkPassword(staff.hashed_pw, hashedPW))) {
        throw new Error("!checkPassword");
      }
      return { success: true, staff };
    } catch (e) {
      return { success: false, e };
    }
  };


}
