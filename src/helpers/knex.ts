import Knex from "knex";

const knexConfigs = require("../../knexfile");
const configMode = process.env.NODE_ENV || "development";
const knexConfig = knexConfigs[configMode];
const db = Knex(knexConfig);

export default db;
