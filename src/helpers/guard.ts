import { Request, Response, NextFunction } from "express";
import errorHandler from "./errorHandler";

export const loginGuard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.session) {
      throw new Error("!req.session");
    }
    next();
  } catch (e) {
    errorHandler(e, req, res);
  }
};

export const hrGuard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.session.isHR) {
      throw new Error("!req.session.isHR");
    }
    next();
  } catch (e) {
    errorHandler(e, req, res);
  }
};
