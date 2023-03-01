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
			const staff_id = req.session.staff.id;
			const json = await this.s.getAnnouncements(staff_id);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	announceToAll = async (req: Request, res: Response): Promise<void> => {
		try {
			if (!req.session.staff) {
				throw new Error(`!req.session.staff`);
			}
			const staff_id = req.session.staff.id;
			const { content } = req.body;
			const json = await this.s.announceToAll(staff_id, content);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	announceToDepartment = async (req: Request, res: Response): Promise<void> => {
		try {
			if (!req.session.staff) {
				throw new Error(`!req.session.staff`);
			}
			const staff_id = req.session.staff.id;
			const { department_id, content } = req.body;
			const json = await this.s.announceToDepartment(
				staff_id,
				content,
				department_id
			);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	editAnnouncement = async (req: Request, res: Response): Promise<void> => {
		try {
			if (!req.session.staff) {
				throw new Error(`!req.session.staff`);
			}
			const id = parseInt(req.params.id);
			const staff_id = req.session.staff.id;
			const { content } = req.body;
			const json = await this.s.editAnnouncement(id, content, staff_id);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	delAnnouncement = async (req: Request, res: Response): Promise<void> => {
		try {
			if (!req.session.staff) {
				throw new Error(`!req.session.staff`);
			}
			const id = parseInt(req.params.id);
			const staff_id = req.session.staff.id;
			const is_admin = req.session.staff.id === 1;
			const json = await this.s.delAnnouncement(id, staff_id, is_admin);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};
}

export default AnnouncementController