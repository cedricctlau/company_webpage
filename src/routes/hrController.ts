import { Request, Response } from "express";
import HRService from "./hrService";

export default class HRController {
	constructor(
		private s: HRService,
		private hashPassword: (pw: string) => Promise<string>,
		private errorHandler: (e: any, req: Request, res: Response) => void
	) {}

	createLocal = async (req: Request, res: Response): Promise<void> => {
		try {
			const { nickname, first_name, last_name } = req.body;
			const json = await this.s.createLocal(nickname, first_name, last_name);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	register = async (req: Request, res: Response): Promise<void> => {
		try {
			const {
				username,
				password,
				nickname,
				first_name,
				last_name,
				gender,
				tel,
				is_hr,
				is_team_head,
				title_id,
			} = req.body;
			const local = username.substring(0, username.search("@"));
			const hashed_pw = await this.hashPassword(password);
			const profile = {
				nickname,
				first_name,
				last_name,
				gender,
				tel,
				is_hr,
				is_team_head,
				title_id,
			};
			const json = await this.s.register(local, hashed_pw, profile);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	changeProfile = async (req: Request, res: Response): Promise<void> => {
		try {
			const id = req.params.id;
			const {
				nickname,
				first_name,
				last_name,
				gender,
				tel,
				is_hr,
				is_team_head,
				title_id,
			} = req.body;
			const profile = {
				nickname,
				first_name,
				last_name,
				gender,
				tel,
				is_hr,
				is_team_head,
				title_id,
			};
			const json = await this.s.changeProfile(id, profile);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};
}
