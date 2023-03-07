import { Request, Response } from "express";
import UserService from "./userService";
import "../helpers/session";
import Priv from "../models/priv";

export default class UserController {
	constructor(
		private s: UserService,
		private errorHandler: (error: any, req: Request, res: Response) => void
	) {}

	login = async (req: Request, res: Response): Promise<void> => {
		try {
			const { username, password } = req.body;
			const json = await this.s.login(username, password);
			if (json.success && json.message) {
				res.json(json);
				return;
			}
			const staff = json.outcome.staff;
			req.session.staff = { id: staff.id, priv: staff.priv };
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	logout = async (req: Request, res: Response): Promise<void> => {
		try {
			delete req.session.staff;
			res.json({ success: true });
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
