import { Request, Response, NextFunction } from "express";

export function logger(req: Request, res: Response, next: NextFunction) {
	let date = new DateStringify();
	console.log(
		`[${date.stringify()}] Request ${req.method} ${req.path} from ${req.ip}`
	);

	next();
}

class DateStringify extends Date {
	constructor() {
		super();
	}
	stringify(): string {
		return `${this.getFullYear()}-${this.getMonthStr()}-${this.getDateStr()} ${this.getHoursStr()}:${this.getMinutesStr()}:${this.getSecondsStr()}`;
	}
	fillZero(n: number): string {
		return n < 10 ? `0${n}` : `${n}`;
	}
	getDateStr(): string {
		return this.fillZero(super.getDate());
	}
	getMonthStr(): string {
		return this.fillZero(super.getMonth() + 1);
	}
	getHoursStr(): string {
		return this.fillZero(super.getHours());
	}
	getMinutesStr(): string {
		return this.fillZero(super.getMinutes());
	}
	getSecondsStr(): string {
		return this.fillZero(super.getSeconds());
	}
}
