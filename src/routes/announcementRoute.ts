import { Router } from "express";
import myErrorHandler from "../helpers/errorHandler";
import myKnex from "../helpers/knex";
import AnnouncementController from "./announcementController";
import AnnouncementService from "./announcementService";

const announcementRoute = Router();

const s = new AnnouncementService(myKnex);
const c = new AnnouncementController(s, myErrorHandler);

announcementRoute.get("/getAnnouncements", c.getAnnouncements);
announcementRoute.post("/announceToAll", c.announceToAll);
announcementRoute.post("/announceToDepartment", c.announceToDepartment);
announcementRoute.put("/editAnnouncement/:id", c.editAnnouncement);
announcementRoute.delete("/delAnnouncement/:id", c.delAnnouncement);

export default announcementRoute;
