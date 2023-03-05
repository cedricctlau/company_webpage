import { Router } from "express";
import myErrorHandler from "./helpers/errorHandler";
import { hashPassword, checkPassword } from "./helpers/hash";
import myKnex from "./helpers/knex";
import AdminController from "./routes/adminController";
import AdminService from "./routes/adminService";
import PublicAncmtController from "./routes/publicAncmtController";
import PublicAncmtService from "./routes/publicAncmtService";
import HRController from "./routes/hrController";
import HRService from "./routes/hrService";
import UserController from "./routes/userController";
import UserService from "./routes/userService";
import DeptAncmtController from "./routes/deptAncmtController";
import DeptAncmtService from "./routes/deptAncmtService";
import TeamAncmtController from "./routes/teamAncmtController";
import TeamAncmtService from "./routes/teamAncmtService";

export const adminRoute = Router();
const s1 = new AdminService(myKnex);
const c1 = new AdminController(s1, myErrorHandler);
adminRoute.post("/createTitle", c1.createTitle);
adminRoute.put("/editTitle/:id", c1.editTitle);
adminRoute.post("/createDept", c1.createDept);
adminRoute.put("/editDept/:id", c1.editDept);
adminRoute.post("/createTeam", c1.createTeam);
adminRoute.put("/editTeam/:id", c1.editTeam);

export const deptAncmtRoute = Router();
const s2 = new DeptAncmtService(myKnex);
const c2 = new DeptAncmtController(s2, myErrorHandler);
deptAncmtRoute.get("/getDeptList",c2.getDeptList)
deptAncmtRoute.get("/getDeptAncmts", c2.getDeptAncmts);
deptAncmtRoute.post("/createDeptAncmt", c2.createDeptAncmt);
deptAncmtRoute.put("/editDeptAncmt/:id", c2.editDeptAncmt);
deptAncmtRoute.delete("/delDeptAncmt/:id", c2.delDeptAncmt);

export const hrRoute = Router();
const s3 = new HRService(myKnex);
const c3 = new HRController(s3, hashPassword, myErrorHandler);
hrRoute.get("/createLocal", c3.createLocal);
hrRoute.put("/register", c3.register);
hrRoute.put("/changeProfile", c3.changeProfile);

export const publicAncmtRoute = Router();
const s4 = new PublicAncmtService(myKnex);
const c4 = new PublicAncmtController(s4, myErrorHandler);
publicAncmtRoute.get("/getPublicAncmts", c4.getPublicAncmts);
publicAncmtRoute.post("/createPublicAncmt", c4.createPublicAncmt);
publicAncmtRoute.put("/editPublicAncmt/:id", c4.editPublicAncmt);
publicAncmtRoute.delete("/delPublicAncmt/:id", c4.delPublicAncmt);

export const teamAncmtRoute = Router();
const s5 = new TeamAncmtService(myKnex);
const c5 = new TeamAncmtController(s5, myErrorHandler);
teamAncmtRoute.get("/getTeamAncmts", c5.getTeamAncmts);
teamAncmtRoute.post("/createTeamAncmt", c5.createTeamAncmt);
teamAncmtRoute.put("/editTeamAncmt/:id", c5.editTeamAncmt);
teamAncmtRoute.delete("/delTeamAncmt/:id", c5.delTeamAncmt);

export const userRoute = Router();
const s6 = new UserService(myKnex, checkPassword);
const c6 = new UserController(s6, hashPassword, myErrorHandler);
userRoute.get("/login", c6.login);
userRoute.get("/logout", c6.logout);
userRoute.put("/changePW", c6.changePW);
userRoute.get("/getProfile", c6.getProfile);
userRoute.get("/getAllProfiles", c6.getAllProfiles);
userRoute.get("/getPriv", c6.getPriv);
