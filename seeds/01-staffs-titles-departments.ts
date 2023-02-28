import { Knex } from "knex";
import Department from "../src/models/department";
import Staff from "../src/models/staff";
import Title from "../src/models/title";

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex("staffs").del();
	await knex("departments").del();
	await knex("titles").del();

	// Inserts seed entries
	await knex<Department>("departments").insert([
		{ department: "admin" },
		{ department: "Human Resources" },
	]);
	await knex<Title>("titles").insert([
		{ title: "admin", department_id: 1 },
		{ title: "Human Resources Manager", department_id: 2 },
	]);
	await knex<Staff>("staffs").insert([
		{
			local: "admin",
			hashed_pw: "$2y$10$AJvs3POiK91ttvVLNls4C.wxKG0ZxLzOUeyM74YpYLUubCz30WSXC",
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
			hashed_pw: "$2y$10$l3oAgp6GqFeomM0fyOt8Sunx4mXzMHsdm1qGd00p4FEVr15u4NcIa",
			nickname: "Tes",
			first_name: "Ting I",
			last_name: "Ng",
			gender: "M",
			tel: "23800000",
			is_hr: true,
			is_team_head: true,
			title_id: 2,
		},
		{
			local: "testing1",
			hashed_pw: "$2y$10$l3oAgp6GqFeomM0fyOt8Sunx4mXzMHsdm1qGd00p4FEVr15u4NcIa",
			nickname: "T",
			first_name: "E Sang",
			last_name: "Ting",
			gender: "F",
			tel: "23800000",
			is_hr: true,
			is_team_head: true,
			title_id: 2,
		},
	]);
}
