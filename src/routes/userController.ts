import { Request, Response } from "express";
import UserService from "./userService";
import "../helpers/session";
import Priv from "../models/priv";

export default class UserController {
	constructor(
		private s: UserService,
		private errorHandler: (e: any, req: Request, res: Response) => void
	) {}

	login = async (req: Request, res: Response): Promise<void> => {
		const { username, password } = req.body;
		const json = await this.s.login(username, password);
		if (json.success && json.message) {
			res.json(json);
			return;
		}
		const staff = json.outcome.staff;
		req.session.staff = { id: staff.id, priv: staff.priv };
		console.log(req.session);
		res.redirect("dashboard.html");
	};

	logout = async (req: Request, res: Response): Promise<void> => {
		try {
			req.session.destroy((error) => {
				throw error;
			});
			res.json({ success: true });
			return res.redirect(`/index.html`);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	changePW = async (req: Request, res: Response): Promise<void> => {
		try {
			const staff_id = req.session.staff?.id as number;
			const { oldPW, newPW } = req.body;
			const json = await this.s.changePW(staff_id, oldPW, newPW);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	getSelfProfile = async (req: Request, res: Response): Promise<void> => {
		try {
			const staff_id = req.session.staff?.id as number;
			const json = await this.s.getSelfProfile(staff_id);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	getAllProfiles = async (req: Request, res: Response): Promise<void> => {
		try {
			const json = await this.s.getAllProfiles();
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	getPriv = async (req: Request, res: Response): Promise<void> => {
		try {
			const priv = req.session.staff?.priv as Priv;
			const json = { success: true, outcome: { priv } };
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};
}
