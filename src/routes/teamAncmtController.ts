import { Request, Response } from "express";
import "../helpers/session";
import TeamAncmtService from "./teamAncmtService";

class TeamAncmtController {
	constructor(
		private s: TeamAncmtService,
		private errorHandler: (e: any, req: Request, res: Response) => void
	) {}

	getTeamList = async (req: Request, res: Response): Promise<void> => {
		try {
			const staff_id = req.session.staff?.id as number;
			const json = await this.s.getTeamList(staff_id);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	getTeamAncmts = async (req: Request, res: Response): Promise<void> => {
		try {
			const staff_id = req.session.staff?.id as number;
			const json = await this.s.getTeamAncmts(staff_id);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	createTeamAncmt = async (req: Request, res: Response): Promise<void> => {
		try {
			const staff_id = req.session.staff?.id as number;
			const { team_id, content } = req.body;
			const json = await this.s.createTeamAncmt(staff_id, content, team_id);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	editTeamAncmt = async (req: Request, res: Response): Promise<void> => {
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
			const json = await this.s.editTeamAncmt(id, content, staff_id);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	delTeamAncmt = async (req: Request, res: Response): Promise<void> => {
		try {
			const ancmt_id = parseInt(req.params.id);
			const staff_id = req.session.staff?.id as number;
			const owner_id = req.body.id as number;
			if (staff_id !== owner_id) {
				throw new Error(
					`This hacker tried to del an announcement owned by others`
				);
			}
			const json = await this.s.delTeamAncmt(ancmt_id, staff_id);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};
}

export default TeamAncmtController;
