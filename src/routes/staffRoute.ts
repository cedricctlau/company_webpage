import { Router } from "express";
import { checkSchema } from "express-validator";
import myErrorHandler from "../helpers/errorHandler";
import { loginGuard } from "../helpers/guard";
import { checkPassword, hashPassword } from "../helpers/hash";
import myDB from "../helpers/knex";
import schema from "../helpers/schema";
import StaffController from "./staffController";
import StaffService from "./staffService";

const svc = new StaffService(myDB, checkPassword);
const ctr = new StaffController(svc, hashPassword, myErrorHandler);

const staffRoute = Router();

staffRoute.post("/login", checkSchema(schema["login"]), ctr.login);
staffRoute.get("/logout", loginGuard, ctr.logout);
staffRoute.put(
	"/changePW",
	loginGuard,
	checkSchema(schema["register"]["password"]),
	ctr.changePW
);

export default staffRoute;
