import { Knex } from "knex";
import db from "./src/helpers/knex";

async function select(knex: Knex, local: string) {
  const result = await knex("staffs")
    .select("id", "local", "hashed_pw", "nickname", "is_hr", "is_team_head")
    .where("local", local);
  console.log(result);
  return;
}

select(db, "admin");
