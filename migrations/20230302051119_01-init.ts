import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable("depts"))) {
    await knex.schema.createTable("depts", (t) => {
      t.increments();
      t.string("dept").notNullable().unique();
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
      t.date("date_of_birth").notNullable();
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
      t.boolean("active").notNullable().defaultTo(true);
      t.boolean("priv_all").notNullable();
      t.boolean("priv_dept").notNullable();
      t.boolean("priv_team").notNullable();
      t.boolean("priv_private").notNullable();
      t.timestamps(false, true);
      t.integer("profile_id").notNullable().unsigned();
      t.foreign("profile_id").references("profiles.id");
      t.integer("personal_info_id").notNullable().unsigned();
      t.foreign("personal_info_id").references("personal-infos.id");
    });
  }
  if (!(await knex.schema.hasTable("dept-members"))) {
    await knex.schema.createTable("dept-members", (t) => {
      t.increments();
      t.integer("staff_id").notNullable().unsigned();
      t.foreign("staff_id").references("staffs.id");
      t.integer("dept_id").notNullable().unsigned();
      t.foreign("dept_id").references("depts.id");
    });
  }
  if (!(await knex.schema.hasTable("team-members"))) {
    await knex.schema.createTable("team-members", (t) => {
      t.increments();
      t.integer("staff_id").notNullable().unsigned();
      t.foreign("staff_id").references("staffs.id");
      t.integer("team_id").notNullable().unsigned();
      t.foreign("team_id").references("teams.id");
    });
  }
  if (!(await knex.schema.hasTable("ancmts"))) {
    await knex.schema.createTable("ancmts", (t) => {
      t.increments();
      t.string("content").notNullable();
      t.timestamps(false, true);
      t.boolean("is_public").notNullable();
      t.integer("staff_id").notNullable().unsigned();
      t.foreign("staff_id").references("staffs.id");
    });
  }
  if (!(await knex.schema.hasTable("dept-ancmts"))) {
    await knex.schema.createTable("dept-ancmts", (t) => {
      t.increments();
      t.integer("dept_id").notNullable().unsigned();
      t.integer("ancmt_id").notNullable().unsigned();
      t.foreign("dept_id").references("depts.id");
      t.foreign("ancmt_id").references("ancmts.id");
    });
  }
  if (!(await knex.schema.hasTable("team-ancmts"))) {
    await knex.schema.createTable("team-ancmts", (t) => {
      t.increments();
      t.integer("team_id").notNullable().unsigned();
      t.integer("ancmt_id").notNullable().unsigned();
      t.foreign("team_id").references("teams.id");
      t.foreign("ancmt_id").references("ancmts.id");
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  if (await knex.schema.hasTable("team-ancmts")) {
    await knex.schema.dropTable("team-ancmts");
  }
  if (await knex.schema.hasTable("dept-ancmts")) {
    await knex.schema.dropTable("dept-ancmts");
  }
  if (await knex.schema.hasTable("ancmts")) {
    await knex.schema.dropTable("ancmts");
  }
  if (await knex.schema.hasTable("team-members")) {
    await knex.schema.dropTable("team-members");
  }
  if (await knex.schema.hasTable("dept-members")) {
    await knex.schema.dropTable("dept-members");
  }
  if (await knex.schema.hasTable("staffs")) {
    await knex.schema.dropTable("staffs");
  }
  if (await knex.schema.hasTable("personal-infos")) {
    await knex.schema.dropTable("personal-infos");
  }
  if (await knex.schema.hasTable("profiles")) {
    await knex.schema.dropTable("profiles");
  }
  if (await knex.schema.hasTable("titles")) {
    await knex.schema.dropTable("titles");
  }
  if (await knex.schema.hasTable("teams")) {
    await knex.schema.dropTable("teams");
  }
  if (await knex.schema.hasTable("depts")) {
    await knex.schema.dropTable("depts");
  }
}
