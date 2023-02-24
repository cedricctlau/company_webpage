import type { Knex } from "knex";
import Json from "../models/json";
import Staff from "../models/staff";

export default class StaffService {
  constructor(
    private database: Knex,
    private checkPassword: (a: string, b: string) => Promise<boolean>
  ) {}

  login = async (local: string, hashed_pw: string): Promise<Json> => {
    const queryResult = await this.database<Staff>("staffs")
      .select("id", "local", "hashed_pw", "nickname", "is_hr", "is_team_head")
      .where("local", local);
    if (queryResult.length !== 1) {
      return { success: false, message: "queryResult.length !== 1" };
    }
    const staff = queryResult[0];
    const checkPassword = await this.checkPassword(staff.hashed_pw, hashed_pw);
    if (!checkPassword) {
      return { success: false, message: "!checkPassword" };
    }
    const { id, nickname, is_hr, is_team_head } = staff;
    return { success: true, result: { id, nickname, is_hr, is_team_head } };
  };

  changePW = async (id: number, hashed_pw: string) => {
    try {
      const queryResult = await this.database("staffs")
        .where("id", id)
        .update("hashed_pw", hashed_pw)
        .returning("*");
      return { success: true, queryResult };
    } catch (error) {
      return { success: false, error };
    }
  };
}
