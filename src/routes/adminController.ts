import AdminService from "./adminService";
import { Request, Response } from "express";

class AdminController {
	constructor(
		private s: AdminService,
		private errorHandler: (...others: any[]) => void
	) {}

	createTitle = async (req: Request, res: Response): Promise<void> => {
		try {
			const { title, department_id } = req.body;
			const json = await this.s.createTitle(title, department_id);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	changeTitle = async (req: Request, res: Response): Promise<void> => {
		try {
			const id = parseInt(req.params.id);
			const { title, department_id } = req.body;
			const json = await this.s.changeTitle(id, title, department_id);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	deleteTitle = async (req: Request, res: Response): Promise<void> => {
		try {
			const id = parseInt(req.params.id);
			const json = await this.s.deleteTitle(id);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	createDepartment = async (req: Request, res: Response): Promise<void> => {
		try {
			const { department } = req.body;
			const json = await this.s.createDepartment(department);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	changeDepartment = async (req: Request, res: Response): Promise<void> => {
		try {
			const id = parseInt(req.params.id);
			const { department } = req.body;
			const json = await this.s.changeDepartment(id, department);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	deleteDepartment = async (req: Request, res: Response): Promise<void> => {
		try {
			const id = parseInt(req.params.id);
			const json = await this.s.deleteDepartment(id);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};
}

export default AdminController;
