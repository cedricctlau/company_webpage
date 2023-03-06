import { Request, Response, NextFunction } from "express";
import myErrorHandler from "./errorHandler";

export const loginGuard = (req: Request, res: Response, next: NextFunction) => {
	if (!req.session.staff) {
		res.redirect("/");
		const error = new Error("Login Guard: redirecting to index.html");
		myErrorHandler(error, req, res);
		return;
	}
	next();
};

export const adminGuard = (req: Request, res: Response, next: NextFunction) => {
	if (!req.session.staff?.priv.isAdmin) {
		res.redirect("/dashboard.html");
		const error = new Error("Admin Guard: redirecting to dashboard.html");
		myErrorHandler(error, req, res);
		return;
	}
	next();
};

export const redirectMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.session.staff) {
		res.redirect("/dashboard.html");
		const error = new Error("Login Guard: redirecting to dashboard.html");
		myErrorHandler(error, req, res);
	}
	next();
};
