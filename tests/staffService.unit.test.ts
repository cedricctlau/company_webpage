import StaffService from "../src/routes/staffService";

describe("Testing login", () => {
	const local = "test";
	const correctPW = {
		original: "aSpecificPassword@ff20!",
		hashedInDB: "$2y$10$AEZ6GaMCWKrAnSrR5l6sTeaykXdn7dfu.dvs9plgqwChfem3WHZh2",
		hashedForTesting:
			"$2y$10$K9NUFcZLzRY4nsCB/uxooe0uo8v7R6Bi95pYs21gu6oruy2D7lE4O",
	};
	const wrongPW = "anotherPassword@^3^@";

	const queryBuilders_Successful = {
		select: jest.fn().mockReturnThis(),
		where: jest.fn().mockReturnValue([
			{
				id: 1,
				nickname: "testBot",
				is_hr: false,
				is_team_head: true,
				some_other_results: "Some Other Results",
			},
		]),
	};

	const queryBuilders_NoResult = {
		select: jest.fn().mockReturnThis(),
		where: jest.fn().mockReturnValue([]),
	};

	it("should check login data with database and then pass session details to the controller", async () => {
		const mKnex = jest.fn().mockReturnValue(queryBuilders_Successful);
		const mCheckPassword = jest.fn().mockResolvedValue(true);
		const mSVC = new StaffService(mKnex as any, mCheckPassword);
		const json = await mSVC.login(local, correctPW.original);
		expect(json.outcome).toEqual({
			id: 1,
			nickname: "testBot",
			is_hr: false,
			is_team_head: true,
		});
	});

	it("should check whether the username exists", async () => {
		const nKnex = jest.fn().mockReturnValue(queryBuilders_NoResult);
		const mCheckPassword = jest.fn();
		const mSVC = new StaffService(nKnex as any, mCheckPassword);
		const json = await mSVC.login(local, wrongPW);
		expect(json.success).toBeFalsy();
		expect(json.message).toBe("No such username");
		expect(mCheckPassword).not.toHaveBeenCalled();
	});

	it("should check whether the password is correct", async () => {
		const mKnex = jest.fn().mockReturnValue(queryBuilders_Successful);
		const mCheckPassword = jest.fn().mockResolvedValue(false);
		const mSVC = new StaffService(mKnex as any, mCheckPassword);
		const json = await mSVC.login(local, wrongPW);
		expect(json.success).toBeFalsy();
		expect(json.message).toBe("Incorrect password");
		expect(mCheckPassword).toHaveBeenCalled();
	});
});
