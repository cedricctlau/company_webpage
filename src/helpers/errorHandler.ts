import { Request, Response } from "express";

interface ErrorLog {
	success: boolean;
	error: { method:string,path: string; statusCode: number | undefined; message: string };
}

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
			path: req.body.path,
			statusCode: req.statusCode,
			message: e.message,
		},
	};
	console.log(errorLog);
	if (!res.headersSent) {
		res.json(errorLog);
	}
}
