import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable("announcements"))) {
    await knex.schema.createTable("announcements", (t) => {
      t.increments();
      t.string("announcement").notNullable();
      t.integer("staff_id").notNullable().unsigned();
      t.foreign("staff_id").references("staffs.id");
    });
  }
  if (!(await knex.schema.hasTable("department-announcement"))) {
    await knex.schema.createTable("department-announcement", (t) => {
      t.increments();
      t.boolean("is_public_announcement").notNullable();
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
}
