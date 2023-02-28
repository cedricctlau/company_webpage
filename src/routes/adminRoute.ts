import { Router } from "express";
import myErrorHandler from "../helpers/errorHandler";
import myKnex from "../helpers/knex";
import AdminController from "./adminController";
import AdminService from "./adminService";

const adminRoute = Router();

const s = new AdminService(myKnex);
const c = new AdminController(s, myErrorHandler);

adminRoute.put("/createTitle", c.createTitle);
adminRoute.post("/changeTitle/:id", c.editTitle);

adminRoute.put("/creteDepartment", c.createDepartment);
adminRoute.post("/changeDepartment/:id", c.editDepartment);

export default adminRoute;
