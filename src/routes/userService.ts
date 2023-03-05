import type { Knex } from "knex";
import PersonalInfo from "../models/personalInfo";
import Priv from "../models/priv";
import Profile from "../models/profile";
import Reply from "../models/reply";
import Staff from "../models/staff";
import Title from "../models/title";

export default class UserService {
  constructor(
    private knex: Knex,
    private checkPassword: (a: string, b: string) => Promise<boolean>
  ) {}

  login = async (username: string, hashed_pw: string): Promise<Reply> => {
    const queryResult = await this.knex<Staff>("staffs")
      .select(
        "id",
        "username",
        "hashed_pw",
        "priv_all",
        "priv_dept",
        "priv_team",
        "priv_private"
      )
      .where("username", username);
    if (!queryResult.length) {
      return { success: true, message: "Incorrect username" };
    }
    const staff = queryResult[0];
    const checkPassword = await this.checkPassword(staff.hashed_pw, hashed_pw);
    if (!checkPassword) {
      return { success: true, message: "Incorrect password" };
    }
    const { id, priv_all, priv_dept, priv_team, priv_private } = staff;
    const priv: Priv = { priv_all, priv_dept, priv_team, priv_private };
    return { success: true, outcome: { staff: { id, priv } } };
  };

  changePW = async (
    staff_id: number,
    hashed_pw: string,
    hashed_old_pw: string
  ): Promise<Reply> => {
    const pwQry = await this.knex<Staff>("staffs")
      .select("hashed_pw")
      .where("id", staff_id);
    const check = await this.checkPassword(pwQry[0].hashed_pw, hashed_old_pw);
    if (!check) {
      return { success: true, message: "Wrong PW" };
    }
    await this.knex<Staff>("staffs")
      .where("id", staff_id)
      .update({ hashed_pw })
      .returning("id");
    return { success: true };
  };

  getSelfProfile = async (staff_id: number): Promise<Reply> => {
    const queryResult = await this.knex<Staff>("staffs as s")
      .leftJoin<Profile>("profiles as p", "s.profile_id", "p.id")
      .leftJoin<Title>("titles as t", "p.title_id", "t.id")
      .leftJoin<PersonalInfo>(
        "personal_infos as pi",
        "s.personal_info_id",
        "pi.id"
      )
      .select("s.id as staff_id", "s.username", "p.*", "t.title", "pi.*")
      .where("s.id", staff_id);
    const profile = queryResult[0];
    return { success: true, outcome: { profile } };
  };

  getAllProfiles = async (): Promise<Reply> => {
    const queryResult = await this.knex<Staff>("staffs as s")
      .leftJoin<Profile>("profiles as p", "s.profile_id", "p.id")
      .leftJoin<Title>("titles as t", "p.title_id", "t.id")
      .select("s.id as staff_id", "s.username", "p.*", "t.title")
      .where("active", true)
      .orderBy([
        { column: "p.first_name" },
        { column: "p.last_name" },
        { column: "t.title" },
      ]);
    const profiles = queryResult.map((row) => {
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
}
