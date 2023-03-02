import { Router } from "express";
import myErrorHandler from "./helpers/errorHandler";
import { hashPassword, checkPassword } from "./helpers/hash";
import myKnex from "./helpers/knex";
import AdminController from "./routes/adminController";
import AdminService from "./routes/adminService";
import AnnouncementController from "./routes/announcementController";
import AnnouncementService from "./routes/announcementService";
import HRController from "./routes/hrController";
import HRService from "./routes/hrService";
import UserController from "./routes/userController";
import UserService from "./routes/userService";

export const adminRoute = Router();
const s1 = new AdminService(myKnex);
const c1 = new AdminController(s1, myErrorHandler);
adminRoute.post("/createTitle", c1.createTitle);
adminRoute.put("/editTitle/:id", c1.editTitle);
adminRoute.post("/createDept", c1.createDept);
adminRoute.put("/editDept/:id", c1.editDept);
adminRoute.post("/createTeam", c1.createTeam);
adminRoute.put("/editTeam/:id", c1.editTeam);

export const announcementRoute = Router();
const s2 = new AnnouncementService(myKnex);
const c2 = new AnnouncementController(s2, myErrorHandler);
announcementRoute.get("/getAnnouncements", c2.getAnnouncements);
announcementRoute.post("/announceToAll", c2.announceToAll);
announcementRoute.post("/announceToDepartment", c2.announceToDepartment);
announcementRoute.put("/editAnnouncement/:id", c2.editAnnouncement);
announcementRoute.delete("/delAnnouncement/:id", c2.delAnnouncement);

export const hrRoute = Router();
const s3 = new HRService(myKnex);
const c3 = new HRController(s3, hashPassword, myErrorHandler);
hrRoute.get("/createLocal", c3.createLocal);
hrRoute.put("/register", c3.register);
hrRoute.put("/changeProfile", c3.changeProfile);

export const userRoute = Router();
const s4 = new UserService(myKnex, checkPassword);
const c4 = new UserController(s4, hashPassword, myErrorHandler);
userRoute.get("/login", c4.login);
userRoute.get("/logout", c4.logout);
userRoute.put("/changePW", c4.changePW);
userRoute.get("/getProfile", c4.getProfile);
userRoute.get("/getAllProfiles", c4.getAllProfiles);
userRoute.get("/getPriv", c4.getPriv);
