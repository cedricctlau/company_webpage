import { Request, Response } from "express";
import AnnouncementController from "../../src/routes/announcementController";
import AnnouncementService from "../../src/routes/announcementService";

jest.mock("../../src/routes/announcementService");

describe("testing announcement controller", () => {
	const mKnex = {} as any;
	const e = jest.fn().mockResolvedValue("");
	const s = new AnnouncementService(mKnex);
	const c = new AnnouncementController(s, e);

	it("can get all related announcements", async () => {
		const req = {
			session: { staff: { id: 2 } },
			body: { announcement: "Testing" },
		} as any as Request;
		s.getAnnouncements = jest.fn(
			(staff_id: number) =>
				new Promise((resolve, reject) => {
					resolve({
						success: true,
						outcome: { announcement: ["announcementObj1", "announcementObj2"] },
					});
				})
		);
		const res = { json: jest.fn() } as any as Response;

		await c.getAnnouncements(req, res);
		expect(res.json).toBeCalledWith({
			success: true,
			outcome: { announcement: ["announcementObj1", "announcementObj2"] },
		});
		expect(s.getAnnouncements).toBeCalledWith(2);
	});
});
