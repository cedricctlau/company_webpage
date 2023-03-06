import { Request, Response, NextFunction } from "express";
import myErrorHandler from "./errorHandler";

export const loginGuard = (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!req.session.staff) {
			res.redirect("/");
			throw new Error("Login Guard: redirecting to index.html");
		}
		next();
	} catch (error) {
		myErrorHandler(error, req, res);
	}
};

export const adminGuard = (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!req.session.staff?.priv.isAdmin) {
			res.redirect("/dashboard.html");
			throw new Error("Admin Guard: redirecting to dashboard.html");
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
			res.redirect("/dashboard.html");
			throw new Error("Login Guard: redirecting to dashboard.html");
		}
		next();
	} catch (error) {
		myErrorHandler(error, req, res);
	}
};
