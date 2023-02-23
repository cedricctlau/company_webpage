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
  }

  if (!(await knex.schema.hasTable("staffs"))) {
    await knex.schema.createTable("staffs", (t) => {
      t.increments();
      t.string("local").notNullable().unique();
      t.string("hashed_pw").notNullable();
      t.timestamps(false, true);
      t.string("nickname").notNullable();
      t.boolean("active").notNullable().defaultTo("true");
      t.string("first_name").notNullable();
      t.string("last_name").notNullable();
      t.enu("gender", ["M", "F", "other"]).notNullable();
      t.string("tel").notNullable();
      t.boolean("is_hr").notNullable();
      t.boolean("is_team_head").notNullable();
      t.integer("title_id").notNullable().unsigned();
      t.foreign("title_id").references("titles.id");
    });
  }
}

export async function down(knex: Knex): Promise<void> {
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
