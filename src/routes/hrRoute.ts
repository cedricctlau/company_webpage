import { Router } from "express";
import { checkSchema } from "express-validator";
import myKnex from "../helpers/knex";
import schema from "../helpers/schema";
import HRController from "./hrController";
import HRService from "./hrService";

const s = new HRService(myKnex);
const c = new HRController(s);

const hrRoute = Router();

hrRoute.get("/createLocal", c.createLocal);
hrRoute.put("/register", checkSchema(schema["register"]), c.register);

export default hrRoute