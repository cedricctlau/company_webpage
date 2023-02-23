import { Request, Response } from "express";

interface ErrorLog {
  success: boolean;
  error: { statusCode: number | undefined; message: string; route: string };
}

export default function errorHandler(e: any, req: Request, res: Response) {
  const errorLog: ErrorLog = {
    success: false,
    error: {
      statusCode: req.statusCode,
      message: e.message,
      route: req.route.path,
    },
  };
  console.error(e);
  res.json(errorLog);
}
