import { Knex } from "knex";
import Announcement from "../src/models/announcement";
import DepartmentAnnouncement from "../src/models/departmentAnnouncement";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("department-announcement").del();
  await knex("announcements").del();

  // Inserts seed entries
  await knex<Announcement>("announcements").insert([
		{
			announcement: "V2VsY29tZSB0byB0aGUgY29tcGFueSE=",
			staff_id: 1,
			is_public: true,
		},
		{
			announcement: "V2VsY29tZSB0byB0aGUgSHVtYW4gUmVzb3VyY2VzIERlcGFydG1lbnQh",
			staff_id: 2,
			is_public: false,
		},
	]);

  await knex<DepartmentAnnouncement>("department-announcement").insert([
    { announcement_id: 2, department_id: 2 },
  ]);
}
