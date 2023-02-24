import type { Knex } from "knex";
import Gender from "../models/gender";
import Staff, { StaffProfile } from "../models/staff";

export default class HRService {
  constructor(private database: Knex) {}

  createLocal = async (
    nickname: string,
    first_name: string,
    last_name: string
  ) => {
    try {
      const first_name_words = first_name.split(" ");
      const initials = first_name_words.reduce((initials, word) => {
        return (initials += word.toLowerCase().at(0));
      }, "");
      let local = nickname + "." + initials + "." + last_name;
      const queryResult = await this.database<Staff>("staffs")
        .select("id", "local")
        .whereLike("local", `${local}%`);
      if (queryResult.length !== 0) {
        local = local + `${queryResult.length}`;
      }
      return { success: true, local };
    } catch (error) {
      return { success: false, error };
    }
  };

  register = async (
    local: string,
    hashed_pw: string,
    nickname: string,
    first_name: string,
    last_name: string,
    gender: Gender,
    tel: string,
    is_hr: boolean,
    is_team_head: boolean,
    title_id: number
  ) => {
    try {
      const queryResult = await this.database<Staff>("staffs")
        .insert({
          local,
          hashed_pw,
          nickname,
          first_name,
          last_name,
          gender,
          tel,
          is_hr,
          is_team_head,
          title_id,
        })
        .returning("id");
      return { success: true, id: queryResult };
    } catch (error) {
      return { success: false, error };
    }
  };

  changeProfile = async (id: string, profile: StaffProfile) => {
    try {
      const txn = await this.database.transaction();
      try {
        const {
          nickname,
          first_name,
          last_name,
          gender,
          tel,
          is_hr,
          is_team_head,
          title_id,
        } = profile;
        const staffRows = await this.database("staffs")
          .where("id", id)
          .update({
            nickname,
            first_name,
            last_name,
            gender,
            tel,
            is_hr,
            is_team_head,
            title_id,
          })
          .returning("*");
        if (staffRows.length !== 1) {
          throw `staffRows.length!==1`;
        }
        await txn.commit();
      } catch (e) {
        txn.rollback();
      }

      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };
}
