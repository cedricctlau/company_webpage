import { Request, Response } from "express";
import PublicAncmtController from "../../src/routes/publicAncmtController";
import PublicAncmtService from "../../src/routes/publicAncmtService";

jest.mock("../../src/routes/announcementService");

describe("testing announcement controller", () => {
	const mKnex = {} as any;
	const e = jest.fn().mockResolvedValue("");
	const s = new PublicAncmtService(mKnex);
	const c = new PublicAncmtController(s, e);

	it("can get all related announcements", async () => {
		const req = {
			session: { staff: { id: 2 } },
			body: { announcement: "Testing" },
		} as any as Request;
		s.getPublicAncmts = jest.fn(
			(staff_id: number) =>
				new Promise((resolve, reject) => {
					resolve({
						success: true,
						outcome: { announcement: ["announcementObj1", "announcementObj2"] },
					});
				})
		);
		const res = { json: jest.fn() } as any as Response;

		await c.getPublicAncmts(req, res);
		expect(res.json).toBeCalledWith({
			success: true,
			outcome: { announcement: ["announcementObj1", "announcementObj2"] },
		});
		expect(s.getPublicAncmts).toBeCalledWith(2);
	});
});
