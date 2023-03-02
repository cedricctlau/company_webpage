import { Request, Response, NextFunction } from "express";
import myErrorHandler from "./errorHandler";

export const loginGuard = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.session) {
      res.redirect("/");
      throw new Error("Login Guard: failed");
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
    if (req.session.staff_id && req.session.priv) {
      res.redirect("/dashboard.html");
      return;
    }
    next();
  } catch (error) {
    myErrorHandler(error, req, res);
  }
};
