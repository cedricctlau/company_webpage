import { Request, Response } from "express";
import "../helpers/session";
import DeptAncmtService from "./deptAncmtService";

class DeptAncmtController {
	constructor(
		private s: DeptAncmtService,
		private errorHandler: (e: any, req: Request, res: Response) => void
	) {}

	getDeptList = async (req: Request, res: Response): Promise<void> => {
		try {
			const staff_id = req.session.staff?.id as number;
			const json = await this.s.getDeptList(staff_id);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	getDeptAncmts = async (req: Request, res: Response): Promise<void> => {
		try {
			const staff_id = req.session.staff?.id as number;
			const json = await this.s.getDeptAncmts(staff_id);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	createDeptAncmt = async (req: Request, res: Response): Promise<void> => {
		try {
			const staff_id = req.session.staff?.id as number;
			const { dept_id, content } = req.body;
			const json = await this.s.createDeptAncmt(staff_id, content, dept_id);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	editDeptAncmt = async (req: Request, res: Response): Promise<void> => {
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
			const json = await this.s.editDeptAncmt(id, content, staff_id);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	delDeptAncmt = async (req: Request, res: Response): Promise<void> => {
		try {
			const ancmt_id = parseInt(req.params.id);
			const staff_id = req.session.staff?.id as number;
			const owner_id = req.body.id as number;
			if (staff_id !== owner_id) {
				throw new Error(
					`This hacker tried to del an announcement owned by others`
				);
			}
			const json = await this.s.delDeptAncmt(ancmt_id, staff_id);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};
}

export default DeptAncmtController;
