import { Router } from "express";
import myErrorHandler from "../helpers/errorHandler";
import myDB from "../helpers/knex";
import AdminController from "./adminController";
import AdminService from "./adminService";

const s = new AdminService(myDB);
const c = new AdminController(s, myErrorHandler);

const adminRoute = Router();

adminRoute.put("/createTitle", c.createTitle);
adminRoute.post("/changeTitle/:id", c.changeTitle);
adminRoute.delete("/deleteTitle/:id", c.deleteTitle);

adminRoute.put("/creteDepartment", c.createDepartment);
adminRoute.post("/changeDepartment/:id", c.changeDepartment);
adminRoute.delete("/deleteDepartment/:id", c.deleteDepartment);

export default adminRoute;
