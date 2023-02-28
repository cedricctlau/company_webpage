import { Request, Response } from "express";
import AdminController from "../../src/routes/adminController";
import AdminService from "../../src/routes/adminService";

jest.mock("../../src/routes/adminService");

describe("testing admin controller", () => {
	const mKnex = {} as any;
	const e = jest.fn().mockResolvedValue("");
	const s = new AdminService(mKnex);
	const c = new AdminController(s, e);

	it("can create title", async () => {
		const req = {
			body: { title: "title", department_id: 3 },
		} as any as Request;
		const res = { json: jest.fn() } as any as Response;
		s.createTitle = jest.fn(
			(title: string, department_id: number) =>
				new Promise((resolve, reject) => {
					resolve({
						success: true,
						outcome: { created: { title, department_id } },
					});
				})
		);

		await c.createTitle(req, res);
		expect(res.json).toBeCalledWith({
			success: true,
			outcome: { created: { title: "title", department_id: 3 } },
		});
	});

	it("can edit title", async () => {
		const req = {
			params: { id: "5" },
			body: { title: "title", department_id: 3 },
		} as any as Request;
		const res = { json: jest.fn() } as any as Response;
		s.editTitle = jest.fn(
			(id: number, title: string, department_id: number) =>
				new Promise((resolve, reject) => {
					resolve({
						success: true,
						outcome: { updated: { id, title, department_id } },
					});
				})
		);

		await c.editTitle(req, res);
		expect(res.json).toBeCalledWith({
			success: true,
			outcome: { updated: { id: 5, title: "title", department_id: 3 } },
		});
	});

	it("can create department", async () => {
		const req = {
			body: { department: "department" },
		} as any as Request;
		const res = { json: jest.fn() } as any as Response;
		s.createDepartment = jest.fn(
			(department: string) =>
				new Promise((resolve, reject) => {
					resolve({
						success: true,
						outcome: { created: { department } },
					});
				})
		);

		await c.createDepartment(req, res);
		expect(res.json).toBeCalledWith({
			success: true,
			outcome: { created: { department: "department" } },
		});
	});

	it("can edit department", async () => {
		const req = {
			params: { id: "5" },
			body: { department: "department" },
		} as any as Request;
		const res = { json: jest.fn() } as any as Response;
		s.editDepartment = jest.fn(
			(id: number, department: string) =>
				new Promise((resolve, reject) => {
					resolve({
						success: true,
						outcome: { updated: { id, department } },
					});
				})
		);

		await c.editDepartment(req, res);
		expect(res.json).toBeCalledWith({
			success: true,
			outcome: { updated: { id: 5, department: "department" } },
		});
	});
});
