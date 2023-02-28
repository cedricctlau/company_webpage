import { Router } from "express";
import { checkSchema } from "express-validator";
import myErrorHandler from "../helpers/errorHandler";
import { loginGuard } from "../helpers/guard";
import { checkPassword, hashPassword } from "../helpers/hash";
import myKnex from "../helpers/knex";
import schema from "../helpers/schema";
import StaffController from "./staffController";
import StaffService from "./staffService";

const staffRoute = Router();

const s = new StaffService(myKnex, checkPassword);
const c = new StaffController(s, hashPassword, myErrorHandler);

staffRoute.post("/login", checkSchema(schema["login"]), c.login);
staffRoute.get("/logout", loginGuard, c.logout);
staffRoute.put(
	"/changePW",
	loginGuard,
	checkSchema(schema["register"]["password"]),
	c.changePW
);
staffRoute.get("getProfile", c.getProfile);

export default staffRoute;
