import { Request, Response } from "express";
import "../helpers/session";
import PublicAncmtService from "./publicAncmtService";

class PublicAncmtController {
	constructor(
		private s: PublicAncmtService,
		private errorHandler: (e: any, req: Request, res: Response) => void
	) {}

	getPublicAncmts = async (req: Request, res: Response): Promise<void> => {
		try {
			const staff_id = req.session.staff?.id as number;
			const json = await this.s.getPublicAncmts(staff_id);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	createPublicAncmt = async (req: Request, res: Response): Promise<void> => {
		try {
			const staff_id = req.session.staff?.id as number;
			const { content } = req.body;
			const json = await this.s.createPublicAncmt(staff_id, content);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	editPublicAncmt = async (req: Request, res: Response): Promise<void> => {
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
			const json = await this.s.editPublicAncmt(id, content, staff_id);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	delPublicAncmt = async (req: Request, res: Response): Promise<void> => {
		try {
			const id = parseInt(req.params.id);
			const staff_id = req.session.staff?.id as number;
			const owner_id = req.body.id as number;
			if (staff_id !== owner_id) {
				throw new Error(
					`This hacker tried to del an announcement owned by others`
				);
			}
			const json = await this.s.delPublicAncmt(id, staff_id);
			res.json(json);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};
}

export default PublicAncmtController;
