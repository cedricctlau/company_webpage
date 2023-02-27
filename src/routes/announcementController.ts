import { Request, Response } from "express";
import "../helpers/session";
import AnnouncementService from "./announcementService";

class AnnouncementController {
	constructor(
		private s: AnnouncementService,
		private errorHandler: (e: any, req: Request, res: Response) => void
	) {}

	getAnnouncements = async (req: Request, res: Response): Promise<void> => {
		try {
			if (!req.session.staff) {
				throw new Error(`!req.session.staff`);
			}
			const id = req.session.staff.id;
			const json = await this.s.getAnnouncements(id);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};
}
