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
			const staff_id = req.session.staff?.id as number;
			const json = await this.s.getAnnouncements(staff_id);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	announceToAll = async (req: Request, res: Response): Promise<void> => {
		try {
			const staff_id = req.session.staff?.id as number;
			const { content } = req.body;
			const json = await this.s.announceToAll(staff_id, content);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	announceToDepartment = async (req: Request, res: Response): Promise<void> => {
		try {
			const staff_id = req.session.staff?.id as number;
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
			const id = parseInt(req.params.id);
			const staff_id = req.session.staff?.id as number;
			const owner_id = req.body.id as number;
			if (staff_id !== owner_id) {
				throw new Error(
					`This hacker tried to del an announcement owned by others`
				);
			}
			const { content } = req.body;
			const json = await this.s.editAnnouncement(id, content, staff_id);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	delAnnouncement = async (req: Request, res: Response): Promise<void> => {
		try {
			const ancmt_id = parseInt(req.params.id);
			const staff_id = req.session.staff?.id as number;
			const owner_id  = req.body.id as number;
			if (staff_id !== owner_id){
				throw new Error (`This hacker tried to del an announcement owned by others`)
			}
			const json = await this.s.delAnnouncement(ancmt_id, staff_id);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};
}

export default AnnouncementController