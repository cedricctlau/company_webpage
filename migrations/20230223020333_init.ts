import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable("departments"))) {
    await knex.schema.createTable("departments", (t) => {
      t.increments();
      t.string("department").notNullable().unique();
    });
  }
  if (!(await knex.schema.hasTable("teams"))) {
    await knex.schema.createTable("teams", (t) => {
      t.increments();
      t.string("team").notNullable().unique();
    });
  }
  if (!(await knex.schema.hasTable("titles"))) {
    await knex.schema.createTable("titles", (t) => {
      t.increments();
      t.string("title").notNullable().unique();
    });
  }
  if (!(await knex.schema.hasTable("profiles"))) {
    await knex.schema.createTable("profiles", (t) => {
      t.increments();
      t.string("nickname").notNullable();
      t.string("first_name").notNullable();
      t.string("last_name").notNullable();
      t.string("gender").notNullable();
      t.string("tel").notNullable();
      t.integer("title_id").notNullable().unsigned();
      t.foreign("title_id").references("titles.id");
    });
  }
  if (!(await knex.schema.hasTable("personal-infos"))) {
    await knex.schema.createTable("personal-infos", (t) => {
      t.increments();
      t.string("hkid").notNullable().unique();
	  t.date("date_of_birth").notNullable()
      t.string("address").notNullable();
      t.string("bank_account").notNullable();
      t.decimal("salary").notNullable();
    });
  }
  if (!(await knex.schema.hasTable("staffs"))) {
    await knex.schema.createTable("staffs", (t) => {
      t.increments();
      t.string("username").notNullable().unique();
      t.string("hashed_pw").notNullable();
      t.boolean("active").defaultTo(true);
      t.timestamps(false, true);
      t.integer("profile_id").notNullable().unsigned();
      t.foreign("profile_id").references("profiles.id");
    });
  }
  if (!(await knex.schema.hasTable("department-members"))) {
	await knex.schema.createTable("team-members", (t) => {
	  t.increments();
	  t.integer("staff_id").notNullable().unsigned();
	  t.foreign("staff_id").references("staffs.id");
	  t.integer("department_id").notNullable().unsigned();
	  t.foreign("department_id").references("departments.id");
	  t.boolean("is_department_head").notNullable();
	});
  }

  if (!(await knex.schema.hasTable("team-members"))) {
    await knex.schema.createTable("team-members", (t) => {
      t.increments();
      t.integer("staff_id").notNullable().unsigned();
      t.foreign("staff_id").references("staffs.id");
      t.integer("team_id").notNullable().unsigned();
      t.foreign("team_id").references("teams.id");
      t.boolean("is_team_head").notNullable();
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

  if (!(await knex.schema.hasTable("team-announcement"))) {
    await knex.schema.createTable("team-announcement", (t) => {
      t.increments();
      t.integer("department_id").notNullable().unsigned();
      t.integer("announcement_id").notNullable().unsigned();
      t.foreign("department_id").references("departments.id");
      t.foreign("announcement_id").references("announcements.id");
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  if (await knex.schema.hasTable("department-announcement")) {
    await knex.schema.dropTable("department-announcement");
  }
  if (await knex.schema.hasTable("announcements")) {
    await knex.schema.dropTable("announcements");
  }
  if (await knex.schema.hasTable("team-members")) {
    await knex.schema.dropTable("team-members");
  }
  if (await knex.schema.hasTable("staffs")) {
    await knex.schema.dropTable("staffs");
  }
  if (await knex.schema.hasTable("profiles")) {
    await knex.schema.dropTable("profiles");
  }
  if (await knex.schema.hasTable("accounts")) {
    await knex.schema.dropTable("accounts");
  }
  if (await knex.schema.hasTable("teams")) {
    await knex.schema.dropTable("teams");
  }
  if (await knex.schema.hasTable("titles")) {
    await knex.schema.dropTable("titles");
  }
  if (await knex.schema.hasTable("departments")) {
    await knex.schema.dropTable("departments");
  }
}
