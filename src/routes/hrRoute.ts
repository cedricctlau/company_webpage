import { Router } from "express";
import { checkSchema } from "express-validator";
import myErrorHandler from "../helpers/errorHandler";
import { hashPassword } from "../helpers/hash";
import myKnex from "../helpers/knex";
import schema from "../helpers/schema";
import HRController from "./hrController";
import HRService from "./hrService";

const hrRoute = Router();

const s = new HRService(myKnex);
const c = new HRController(s, hashPassword, myErrorHandler);

hrRoute.get("/createLocal", c.createLocal);
hrRoute.put("/register", checkSchema(schema["register"]), c.register);
hrRoute.put("/changeProfile", c.changeProfile);

export default hrRoute;
