import { Router } from "express";
import { checkSchema } from "express-validator";
import errorHandler from "../helpers/errorHandler";
import { hashPassword } from "../helpers/hash";
import myDB from "../helpers/knex";
import schema from "../helpers/schema";
import HRController from "./hrController";
import HRService from "./hrService";

const svc = new HRService(myDB);
const ctr = new HRController(svc, hashPassword, errorHandler);

const hrRoute = Router();

hrRoute.get("/createLocal", ctr.createLocal);
hrRoute.put("/register", checkSchema(schema["register"]), ctr.register);
hrRoute.put("/changeProfile", ctr.changeProfile);

export default hrRoute;
