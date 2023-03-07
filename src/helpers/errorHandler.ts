import { Request, Response } from "express";
import { ErrorLog } from "../models/reply";


export default function myErrorHandler(e: any, req: Request, res: Response) {
	if (!(e instanceof Error)) {
		console.log(
			`!!!!!!!! myErrorHandler: error is not received as an Error !!!!!!!!`
		);
		console.log({ e });
		return;
	}
	const errorLog: ErrorLog = {
		success: false,
		error: {
			method: req.method,
			url: req.url,
			statusCode: req.statusCode,
			message: e.message,
		},
	};
	console.log(errorLog);
	res.json(errorLog)
}
