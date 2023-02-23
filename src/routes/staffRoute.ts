import { Router } from "express";
import { checkSchema } from "express-validator";
import myKnex from "../helpers/knex";
import schema from "../helpers/schema";
import StaffController from "./staffController";
import StaffService from "./staffService";

const s = new StaffService(myKnex);
const c = new StaffController(s);

const staffRoute = Router();

staffRoute.post("/login", checkSchema(schema["login"]), c.login);
staffRoute.get("/logout", c.logout);
staffRoute.put("/changePW", c.changePW);

export default staffRoute