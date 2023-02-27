import { Router } from "express";
import { checkSchema } from "express-validator";
import myErrorHandler from "../helpers/errorHandler";
import { hashPassword } from "../helpers/hash";
import myKnex from "../helpers/knex";
import schema from "../helpers/schema";
import HRController from "./hrController";
import HRService from "./hrService";

const svc = new HRService(myKnex);
const ctr = new HRController(svc, hashPassword, myErrorHandler);

const hrRoute = Router();

hrRoute.get("/createLocal", ctr.createLocal);
hrRoute.put("/register", checkSchema(schema["register"]), ctr.register);
hrRoute.put("/changeProfile", ctr.changeProfile);

export default hrRoute;
