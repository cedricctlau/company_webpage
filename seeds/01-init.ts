import { type Knex } from "knex";
import Ancmt, { DeptAncmt, TeamAncmt } from "../src/models/ancmt";
import Dept, { DeptMember } from "../src/models/dept";
import PersonalInfo from "../src/models/personalInfo";
import Profile from "../src/models/profile";
import Staff from "../src/models/staff";
import Team, { TeamMember } from "../src/models/team";
import Title from "../src/models/title";

export async function seed(knex: Knex): Promise<void> {
  const txn = await knex.transaction();
  try {
    // Deletes ALL existing entries
    await txn("team-members").del();
    await txn("dept-members").del();
    await txn("team-ancmts").del();
    await txn("dept-ancmts").del();
    await txn("ancmts").del();
    await txn("staffs").del();
    await txn("personal-infos").del();
    await txn("profiles").del();
    await txn("titles").del();
    await txn("teams").del();
    await txn("depts").del();

    // Inserts seed entries
    await txn<Dept>("depts").insert([
      { dept: "IT" },
      { dept: "Human Resources" },
      { dept: "Production" },
    ]);
    await txn<Team>("teams").insert([
      { team: "Team Ho Wan" },
      { team: "Team Hea" },
    ]);
    await txn<Title>("titles").insert([
      { title: "IT Manager" },
      { title: "Junior Developer" },
      { title: "Human Resources Manager" },
    ]);
    await txn<Profile>("profiles").insert([
      {
        nickname: "test",
        first_name: "test",
        last_name: "test",
        gender: "Others",
        tel: "23800000",
        title_id: 1,
      },
    ]);
    await txn<PersonalInfo>("personal-infos").insert([
      {
        hkid: "A123456(7)",
        date_of_birth: "2023-03-02",
        address: "Candy Int. Ltd., 20B, TML Tower, 3 Hoi Shing Rd, Tsuen Wan",
        bank_account: "000000000000000",
        salary: 109700,
      },
    ]);
    await txn<Staff>("staffs").insert([
      {
        username: "admin@candy.io",
        hashed_pw:
          "$2y$10$OsE9Hql5fum.CyneRLSWGuiFLbzQ77qm4ez/GE3p/vA4/h2i67BgK",
        priv_all: true,
        priv_dept: true,
        priv_team: true,
        priv_private: true,
        profile_id: 1,
        personal_info_id: 1,
      },
      {
        username: "hr@candy.io",
        hashed_pw:
          "$2y$10$OsE9Hql5fum.CyneRLSWGuiFLbzQ77qm4ez/GE3p/vA4/h2i67BgK",
        priv_all: true,
        priv_dept: true,
        priv_team: true,
        priv_private: true,
        profile_id: 1,
        personal_info_id: 1,
      },
    ]);
    await txn<Ancmt>("ancmts").insert([
      {
        content: "Welcome to Candy Int. Ltd.!",
        staff_id: 1,
        is_public: true,
      },
      {
        content: "Announce to IT department!",
        staff_id: 1,
        is_public: false,
      },
      {
        content: "Announce to Team Ho Wan!",
        staff_id: 1,
        is_public: false,
      },
    ]);
    await txn<DeptAncmt>("dept-ancmts").insert([{ ancmt_id: 2, dept_id: 1 }]);
    await txn<TeamAncmt>("team-ancmts").insert([{ ancmt_id: 3, team_id: 1 }]);
    await txn<DeptMember>("dept-members").insert([
      { staff_id: 1, dept_id: 1 },
      { staff_id: 2, dept_id: 2 },
    ]);
    await txn<TeamMember>("team-members").insert([
      { staff_id: 1, team_id: 1 },
      { staff_id: 2, team_id: 2 },
    ]);
    await txn.commit();
  } catch (error) {
    console.log(`=====Insuccessful transaction! Rollback!=====`);
    console.error(error);
    await txn.rollback();
  }
}
