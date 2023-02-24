import HRService from "../src/routes/hrService";

describe("testing createLocal", () => {
	it("should create proper local", async () => {
		const nickname = "Tes";
		const first_name = "Test Ing";
		const last_name = "Ng";
		const mQryResult: any[] = [];
		const qryBldrs = {
			select: jest.fn().mockReturnThis(),
			whereLike: jest.fn().mockReturnValue(mQryResult),
		};
		const mKnex = jest.fn().mockReturnValue(qryBldrs);
		const mSVC = new HRService(mKnex as any);
		const json = await mSVC.createLocal(nickname, first_name, last_name);
		expect(json.success).toBeTruthy();
		expect(json.outcome.local).toBe("testing");
	});

	it("should create unique local by adding number at the end when conflict", async () => {
		const nickname = "Tes";
		const first_name = "Test Ing";
		const last_name = "Ng";
		const mQryResult = [
			{ id: 3, local: "testing" },
			{ id: 6, local: "testing1" },
		];
		const qryBldrs = {
			select: jest.fn().mockReturnThis(),
			whereLike: jest.fn().mockReturnValue(mQryResult),
		};
		const mKnex = jest.fn().mockReturnValue(qryBldrs);
		const mSVC = new HRService(mKnex as any);
		const json = await mSVC.createLocal(nickname, first_name, last_name);
		expect(json.success).toBeTruthy();
		expect(json.outcome.local).toBe("testing2");
	});
});
