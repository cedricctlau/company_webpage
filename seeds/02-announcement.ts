import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("department-announcement").del();
  await knex("announcements").del();

  // Inserts seed entries
  await knex("announcements").insert([
    { announcement: "V2VsY29tZSB0byB0aGUgY29tcGFueSE=", staff_id: 1 },
    {
      announcement: "V2VsY29tZSB0byB0aGUgSHVtYW4gUmVzb3VyY2VzIERlcGFydG1lbnQh",
      staff_id: 2,
    },
  ]);

  await knex("department-announcement").insert([
    { announcement_id: 2, department_id: 2 },
  ]);
}
