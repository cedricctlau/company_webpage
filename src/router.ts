import { Router } from "express";
import myErrorHandler from "./helpers/errorHandler";
import { hashPassword, checkPassword } from "./helpers/hash";
import myKnex from "./helpers/knex";
import AdminController from "./routes/adminController";
import AdminService from "./routes/adminService";
import PublicAncmtController from "./routes/publicAncmtController";
import PublicAncmtService from "./routes/publicAncmtService";
import UserController from "./routes/userController";
import UserService from "./routes/userService";
import DeptAncmtController from "./routes/deptAncmtController";
import DeptAncmtService from "./routes/deptAncmtService";
import TeamAncmtController from "./routes/teamAncmtController";
import TeamAncmtService from "./routes/teamAncmtService";
import ProfileService from "./routes/profileService";
import ProfileController from "./routes/profileController";

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
deptAncmtRoute.get("/getDeptList", c2.getDeptList);
deptAncmtRoute.get("/getDeptAncmts", c2.getDeptAncmts);
deptAncmtRoute.post("/createDeptAncmt", c2.createDeptAncmt);
deptAncmtRoute.put("/editDeptAncmt/:id", c2.editDeptAncmt);
deptAncmtRoute.delete("/delDeptAncmt/:id", c2.delDeptAncmt);

export const profileRoute = Router();
const s3 = new ProfileService(myKnex);
const c3 = new ProfileController(s3, myErrorHandler);
profileRoute.get("/getAllProfiles", c3.getAllProfiles);
profileRoute.get("/getAllTitles", c3.getAllTitles);
profileRoute.get("/getMembership", c3.getMembership);

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
teamAncmtRoute.get("/getTeamList", c5.getTeamList);
teamAncmtRoute.get("/getTeamAncmts", c5.getTeamAncmts);
teamAncmtRoute.post("/createTeamAncmt", c5.createTeamAncmt);
teamAncmtRoute.put("/editTeamAncmt/:id", c5.editTeamAncmt);
teamAncmtRoute.delete("/delTeamAncmt/:id", c5.delTeamAncmt);

export const userRoute = Router();
const s6 = new UserService(myKnex, hashPassword, checkPassword);
const c6 = new UserController(s6, myErrorHandler);
userRoute.post("/login", c6.login);
userRoute.get("/logout", c6.logout);
userRoute.put("/changePW", c6.changePW);
userRoute.get("/getSelfProfile", c6.getSelfProfile);
userRoute.get("/getPriv", c6.getPriv);
