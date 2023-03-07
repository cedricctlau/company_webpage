export interface ErrorLog extends Reply {
	error: {
		method: string;
		url: string;
		statusCode: number | undefined;
		message: string;
	};
}

interface Reply {
	success: boolean;
	message?: string;
	outcome?: any;
	error?: any;
}

export default Reply;
