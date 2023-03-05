import { Request, Response } from "express";
import UserService from "./userService";
import "../helpers/session";
import Priv from "../models/priv";
import { LargeNumberLike } from "crypto";

export default class UserController {
	constructor(
		private s: UserService,
		private hashPassword: (a: string) => Promise<string>,
		private errorHandler: (e: any, req: Request, res: Response) => void
	) {}

	login = async (req: Request, res: Response): Promise<void> => {
		try {
			const { username, password } = req.body;
			const hashed_pw = await this.hashPassword(password);
			const json = await this.s.login(username, hashed_pw);
			if (json.success && json.message) {
				res.json(json);
				return;
			}
			req.session = json.outcome;
			return res.redirect(`dashboard.html`);
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
			return res.redirect(`index.html`);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	changePW = async (req: Request, res: Response): Promise<void> => {
		try {
			const staff_id = req.session.staff?.id as number;
			const hashed_pw = await this.hashPassword(req.body.password);
			const json = await this.s.changePW(staff_id, hashed_pw);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	getProfile = async (req: Request, res: Response): Promise<void> => {
		try {
			const staff_id = req.session.staff?.id as number;
			const json = await this.s.getProfile(staff_id);
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

	getNickname = async (req: Request, res: Response) => {
		try {
			const staff_id = req.session.staff?.id as number;
			const json = await this.s.getNickname(staff_id);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};
}
