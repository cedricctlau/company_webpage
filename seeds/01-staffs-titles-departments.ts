import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("staffs").del();
  await knex("departments").del();
  await knex("titles").del()

  // Inserts seed entries
  await knex("departments").insert([
    { department: "admin" },
    { department: "Human Resources" },
  ]);
  await knex("titles").insert([
    { title: "admin", department_id: 1 },
    { title: "Human Resources Manager", department_id: 2 },
  ]);
  await knex("staffs").insert([
    {
      local: "admin",
      hashed_pw: "$2y$10$AJvs3POiK91ttvVLNls4C.wxKG0ZxLzOUeyM74YpYLUubCz30WSXC",
      nickname: "admin",
      first_name: "admin",
      last_name: "admin",
      gender: "other",
      tel: "23800000",
      is_hr: true,
      is_team_head: true,
      title_id: 1,
    },
    {
      local: "cedric.ct.lau",
      hashed_pw: "$2y$10$l3oAgp6GqFeomM0fyOt8Sunx4mXzMHsdm1qGd00p4FEVr15u4NcIa",
      nickname: "Cedric",
      first_name: "Chiu Tung",
      last_name: "Lau",
      gender: "M",
      tel: "23800000",
      is_hr: true,
      is_team_head: true,
      title_id: 2,
    },
  ]);
}
