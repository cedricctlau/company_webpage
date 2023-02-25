import { Request, Response } from "express";

interface ErrorLog {
	success: boolean;
	error: { statusCode: number | undefined; message: string; route: string };
}

export default function myErrorHandler(e: any, req: Request, res: Response) {
	if (!(e instanceof Error)) {
		console.log(
			`!!!!!!!! myErrorHandler: error is not received as an Error !!!!!!!!`
		);
		console.log({ route: req.route.path, e });
		res.json({
			success: false,
			error: `See backend log => myErrorHandler failed`,
			route: req.route.path,
		});
		return;
	}
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
