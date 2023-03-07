import { Request, Response } from "express";
import "../helpers/session";
import ProfileService from "./profileService";

export default class ProfileController {
	constructor(
		private s: ProfileService,
		private errorHandler: (error: any, req: Request, res: Response) => void
	) {}

	getAllProfiles = async (req: Request, res: Response): Promise<void> => {
		try {
			const json = await this.s.getAllProfiles();
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	getAllTitles = async (req: Request, res: Response): Promise<void> => {
		try {
			const json = await this.s.getAllTitles();
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	getMembership = async (req: Request, res: Response): Promise<void> => {
		try {
			const id = req.session.staff?.id as number;
			const json = await this.s.getMembership(id);
			res.json(json)
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};
}
