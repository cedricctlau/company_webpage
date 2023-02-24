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

	test("Login properly", async () => {
		const mockedKnex = jest.fn().mockReturnValue(queryBuilders_Successful);
		const mockedCheckPassword = jest.fn().mockResolvedValue(true);
		const staffService = new StaffService(
			mockedKnex as any,
			mockedCheckPassword
		);
		const json = await staffService.login(local, correctPW.original);
		expect(json.outcome).toEqual({
			id: 1,
			nickname: "testBot",
			is_hr: false,
			is_team_head: true,
		});
	});

	test("No such username", async () => {
		const mockedKnex = jest.fn().mockReturnValue(queryBuilders_NoResult);
		const mockedCheckPassword = jest.fn();
		const staffService = new StaffService(
			mockedKnex as any,
			mockedCheckPassword
		);
		const json = await staffService.login(local, wrongPW);
		expect(json.success).toBeFalsy();
		expect(json.message).toBe("No such username");
		expect(mockedCheckPassword).not.toBeCalled();
	});

	test("Incorrect password", async () => {
		const mockedKnex = jest.fn().mockReturnValue(queryBuilders_Successful);
		const mockedCheckPassword = jest.fn().mockResolvedValue(false);
		const staffService = new StaffService(
			mockedKnex as any,
			mockedCheckPassword
		);
		const json = await staffService.login(local, wrongPW);
		expect(json.success).toBeFalsy();
		expect(json.message).toBe("Incorrect password");
		expect(mockedCheckPassword).toBeCalled();
	});
});
