import { Request, Response, NextFunction } from "express";
import myErrorHandler from "./errorHandler";

export const loginGuard = (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!req.session) {
			throw new Error("Login Guard: failed");
		}
		next();
	} catch (error) {
		myErrorHandler(error, req, res);
	}
};

export const teamHeadGuard = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		if (!req.session.staff?.is_team_head) {
			throw new Error(`Team Head Guard: failed`);
		}
		next();
	} catch (error) {
		myErrorHandler(error, req, res);
	}
};

export const hrGuard = (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!req.session.staff?.is_hr) {
			throw new Error("HR Guard: failed");
		}
		next();
	} catch (error) {
		myErrorHandler(error, req, res);
	}
};

export const adminGuard = (req: Request, res: Response, next: NextFunction) => {
	try {
		if (req.session.staff?.id !== 1) {
			throw new Error("Admin Guard: failed");
		}
		next();
	} catch (error) {
		myErrorHandler(error, req, res);
	}
};
