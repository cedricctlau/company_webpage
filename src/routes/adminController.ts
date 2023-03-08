import AdminService from "./adminService";
import { Request, Response } from "express";

class AdminController {
	constructor(
		private s: AdminService,
		private errorHandler: (...others: any[]) => void
	) {}

	createTitle = async (req: Request, res: Response): Promise<void> => {
		try {
			const { title } = req.body;
			const json = await this.s.createTitle(title);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	editTitle = async (req: Request, res: Response): Promise<void> => {
		try {
			const id = parseInt(req.params.id);
			const { title } = req.body;
			const json = await this.s.editTitle(id, title);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	createDept = async (req: Request, res: Response): Promise<void> => {
		try {
			const { dept } = req.body;
			const json = await this.s.createDept(dept);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	editDept = async (req: Request, res: Response): Promise<void> => {
		try {
			const id = parseInt(req.params.id);
			const { dept } = req.body;
			const json = await this.s.editDept(id, dept);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	createTeam = async (req: Request, res: Response): Promise<void> => {
		try {
			const { team } = req.body;
			const json = await this.s.createTeam(team);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	editTeam = async (req: Request, res: Response): Promise<void> => {
		try {
			const id = parseInt(req.params.id);
			const { team } = req.body;
			const json = await this.s.editTeam(id, team);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	getProfileSudo = async (req: Request, res: Response): Promise<void> => {
		try {
			const staff_id = req.body.id;
			const json = await this.s.getProfileSudo(staff_id);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	genAcc = async (req: Request, res: Response): Promise<void> => {
		try {
			const { nickname, first_name, last_name } = req.body;
			const json = await this.s.genAcc(nickname, first_name, last_name);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};
}

export default AdminController;
