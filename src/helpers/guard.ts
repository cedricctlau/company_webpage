import { Request, Response, NextFunction } from "express";
import myErrorHandler from "./errorHandler";

export const loginGuard = (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!req.session.staff) {
			res.redirect("/");
			throw new Error("Login Guard: failed");
		}
		next();
	} catch (error) {
		myErrorHandler(error, req, res);
	}
};

export const adminGuard = (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!req.session.staff?.priv.priv_all) {
			res.redirect("/");
			throw new Error("Admin Guard: failed");
		}
		next();
	} catch (error) {
		myErrorHandler(error, req, res);
	}
};

export const redirectMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		if (req.session.staff) {
			return res.redirect("/dashboard.html");
		}
		next();
	} catch (error) {
		myErrorHandler(error, req, res);
	}
};
