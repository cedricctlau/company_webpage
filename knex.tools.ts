import Knex from "knex";
const knexConfig = require("./knexfile");
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);
async function migrate(){
    await knex.migrate.rollback();
    console.log('%cMigration Rollback Done!','color:green;border:1px solid black');
    await knex.migrate.latest();
    console.log('%cMigration Latest Done!','color:green;border:1px solid black');
    await knex.seed.run();
    console.log('%cSeed Done!','color:green;border:1px solid black');
    await knex.destroy();
}

migrate();