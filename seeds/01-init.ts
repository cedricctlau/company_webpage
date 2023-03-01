import { type Knex } from "knex";
import Announcement from "../src/models/announcement";
import Department from "../src/models/department";
import DepartmentAnnouncement from "../src/models/departmentAnnouncement";
import Staff from "../src/models/staff";
import Title from "../src/models/title";

export async function seed(knex: Knex): Promise<void> {
	const txn = await knex.transaction();
	try {
		// Deletes ALL existing entries
		await knex("department-announcement").del();
		await knex("announcements").del();
		await knex("staffs").del();
		await knex("titles").del();
		await knex("departments").del();

		// Inserts seed entries
		await knex<Department>("departments").insert([
			{ department: "IT" },
			{ department: "Human Resources" },
			{ department: "Production" },
		]);
		await knex<Title>("titles").insert([
			{ title: "IT Manager", department_id: 1 },
			{ title: "Junior Developer", department_id: 1 },
			{ title: "Human Resources Manager", department_id: 2 },
		]);
		await knex<Staff>("staffs").insert([
			{
				local: "admin",
				hashed_pw:
					"$2y$10$AJvs3POiK91ttvVLNls4C.wxKG0ZxLzOUeyM74YpYLUubCz30WSXC",
				nickname: "admin",
				first_name: "admin",
				last_name: "admin",
				gender: "Other",
				tel: "23800000",
				is_hr: true,
				is_team_head: true,
				title_id: 1,
			},
			{
				local: "testing",
				hashed_pw:
					"$2y$10$l3oAgp6GqFeomM0fyOt8Sunx4mXzMHsdm1qGd00p4FEVr15u4NcIa",
				nickname: "Tes",
				first_name: "Ting I",
				last_name: "Ng",
				gender: "M",
				tel: "23800000",
				is_hr: false,
				is_team_head: false,
				title_id: 2,
			},
			{
				local: "testing1",
				hashed_pw:
					"$2y$10$l3oAgp6GqFeomM0fyOt8Sunx4mXzMHsdm1qGd00p4FEVr15u4NcIa",
				nickname: "T",
				first_name: "E Sang",
				last_name: "Ting",
				gender: "F",
				tel: "23800000",
				is_hr: true,
				is_team_head: true,
				title_id: 3,
			},
		]);
		await knex<Announcement>("announcements").insert([
			{
				content: "Welcome to Candy!",
				staff_id: 1,
				is_public: true,
			},
			{
				content: "Testing announcement",
				staff_id: 1,
				is_public: false,
			},
		]);
		await knex<DepartmentAnnouncement>("department-announcement").insert([
			{ announcement_id: 2, department_id: 1 },
		]);
		await txn.commit();
	} catch (error) {
		await txn.rollback();
	}
}
