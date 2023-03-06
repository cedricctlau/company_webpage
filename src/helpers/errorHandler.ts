import { Request, Response } from "express";

interface ErrorLog {
	success: boolean;
	error: { statusCode: number | undefined; message: string };
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
			statusCode: req.statusCode,
			message: e.message,
		},
	};
	console.error(e);
	if (!res.headersSent) {
		res.json(errorLog);
	}
}
