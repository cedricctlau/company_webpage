import Knex from "knex";

const knexConfigs = require("../../knexfile");
const configMode = process.env.NODE_ENV || "development";
const knexConfig = knexConfigs[configMode];
const myKnex = Knex(knexConfig);

export default myKnex;
