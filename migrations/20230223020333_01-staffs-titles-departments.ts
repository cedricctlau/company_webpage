import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable("departments"))) {
    await knex.schema.createTable("departments", (t) => {
      t.increments();
      t.string("department", 20).notNullable().unique();
    });

    await knex.schema.createTable("titles", (t) => {
      t.increments();
      t.string("title", 20).notNullable().unique();
      t.integer("department_id").notNullable().unsigned();
      t.foreign("department_id").references("departments.id");
    });
  }

  if (!(await knex.schema.hasTable("staffs"))) {
    await knex.schema.createTable("staffs", (t) => {
      t.increments();
      t.string("local", 30).notNullable().unique();
      t.string("hashed_pw", 100).notNullable();
      t.timestamps(false, true);
      t.string("nickname", 20).notNullable();
      t.string("first_name", 20).notNullable();
      t.string("last_name", 20).notNullable();
      t.enu("gender", ["M", "F", "other"]).notNullable();
      t.string("tel", 15).notNullable();
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
