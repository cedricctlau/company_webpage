import { Request, Response } from "express";
import StaffService from "./staffService";
import "../helpers/session";

export default class StaffController {
	constructor(
		private s: StaffService,
		private hashPassword: (a: string) => Promise<string>,
		private errorHandler: (e: any, req: Request, res: Response) => void
	) {}

	login = async (req: Request, res: Response): Promise<void> => {
		try {
			if (req.session.staff) {
				res.json({ success: false, message: `req.session.staff` });
				return;
			}
			const { username, password } = req.body;
			const local = username.substring(0, username.search("@"));
			const hashed_pw = await this.hashPassword(password);
			const json = await this.s.login(local, hashed_pw);
			if (json.success) {
				const { id, nickname, is_hr, is_team_head } = json.outcome;
				req.session.staff = { id, nickname, is_hr, is_team_head };
			}
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	logout = async (req: Request, res: Response): Promise<void> => {
		try {
			req.session.destroy((error) => {
				throw error;
			});
			res.json({ success: true });
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	changePW = async (req: Request, res: Response): Promise<void> => {
		try {
			if (!req.session.staff) {
				throw new Error(`!req.session.staff`);
			}
			const id = req.session.staff.id;
			const hashed_pw = await this.hashPassword(req.body.password);
			const json = await this.s.changePW(id, hashed_pw);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	getProfile = async (req: Request, res: Response): Promise<void> => {
		try {
			if (!req.session.staff) {
				throw new Error(`!req.session.staff`);
			}
			const id = req.session.staff.id;
			const json = await this.s.getProfile(id);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};
}
