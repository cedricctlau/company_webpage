import { Router } from "express";
import { checkSchema } from "express-validator";
import errorHandler from "../helpers/errorHandler";
import { hashPassword } from "../helpers/hash";
import db from "../helpers/knex";
import schema from "../helpers/schema";
import HRController from "./hrController";
import HRService from "./hrService";

const s = new HRService(db);
const c = new HRController(s, hashPassword, errorHandler);

const hrRoute = Router();

hrRoute.get("/createLocal", c.createLocal);
hrRoute.put("/register", checkSchema(schema["register"]), c.register);

export default hrRoute;
