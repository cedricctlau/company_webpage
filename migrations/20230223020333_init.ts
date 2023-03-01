import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	if (!(await knex.schema.hasTable("departments"))) {
		await knex.schema.createTable("departments", (t) => {
			t.increments();
			t.string("department").notNullable().unique();
		});

		await knex.schema.createTable("titles", (t) => {
			t.increments();
			t.string("title").notNullable().unique();
			t.integer("department_id").notNullable().unsigned();
			t.foreign("department_id").references("departments.id");
		});

		if (!(await knex.schema.hasTable("staffs"))) {
			await knex.schema.createTable("staffs", (t) => {
				t.increments();
				t.string("local").notNullable().unique();
				t.string("hashed_pw").notNullable();
				t.timestamps(false, true);
				t.boolean("active").notNullable().defaultTo("true");
				t.string("nickname").notNullable();
				t.string("first_name").notNullable();
				t.string("last_name").notNullable();
				t.string("gender").notNullable();
				t.string("tel").notNullable();
				t.boolean("is_hr").notNullable();
				t.boolean("is_team_head").notNullable();
				t.integer("title_id").notNullable().unsigned();
				t.foreign("title_id").references("titles.id");
			});
		}

		if (!(await knex.schema.hasTable("announcements"))) {
			await knex.schema.createTable("announcements", (t) => {
				t.increments();
				t.string("content").notNullable();
				t.boolean("is_public").notNullable();
				t.timestamps(false, true);
				t.integer("staff_id").notNullable().unsigned();
				t.foreign("staff_id").references("staffs.id");
			});
		}

		if (!(await knex.schema.hasTable("department-announcement"))) {
			await knex.schema.createTable("department-announcement", (t) => {
				t.increments();
				t.integer("department_id").notNullable().unsigned();
				t.integer("announcement_id").notNullable().unsigned();
				t.foreign("department_id").references("departments.id");
				t.foreign("announcement_id").references("announcements.id");
			});
		}
	}
}

export async function down(knex: Knex): Promise<void> {
	if (await knex.schema.hasTable("department-announcement")) {
		await knex.schema.dropTable("department-announcement");
	}
	if (await knex.schema.hasTable("announcements")) {
		await knex.schema.dropTable("announcements");
	}
	if (await knex.schema.hasTable("staffs")) {
		await knex.schema.dropTable("staffs");
	}
	if (await knex.schema.hasTable("titles")) {
		await knex.schema.dropTable("titles");
	}
	if (await knex.schema.hasTable("departments")) {
		await knex.schema.dropTable("departments");
	}
}
