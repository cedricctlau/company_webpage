import { Router } from "express";
import { checkSchema } from "express-validator";
import errorHandler from "../helpers/errorHandler";
import { checkPassword } from "../helpers/hash";
import myDB from "../helpers/knex";
import schema from "../helpers/schema";
import StaffController from "./staffController";
import StaffService from "./staffService";

const s = new StaffService(myDB, checkPassword);
const c = new StaffController(s, errorHandler);

const staffRoute = Router();

staffRoute.post("/login", checkSchema(schema["login"]), c.login);
staffRoute.get("/logout", c.logout);
staffRoute.put("/changePW", c.changePW);

export default staffRoute;
