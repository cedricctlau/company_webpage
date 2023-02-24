import { checkPassword } from "../src/helpers/hash";
import StaffService from "../src/routes/staffService";

// import Knex from "knex";
// const knexConfigs = require("../../knexfile");
// const knexConfig = knexConfigs["test"];
// const testKnex = Knex(knexConfig);

describe("Testing login", () => {
  const local = "test";
  const correctPW = {
    original: "aSpecificPassword@ff20!",
    hashedInDB: "$2y$10$AEZ6GaMCWKrAnSrR5l6sTeaykXdn7dfu.dvs9plgqwChfem3WHZh2",
    hashedForTesting:
      "$2y$10$K9NUFcZLzRY4nsCB/uxooe0uo8v7R6Bi95pYs21gu6oruy2D7lE4O",
  };

  test("Login properly", async () => {
    const fakeDB = {} as any;
    fakeDB.raw = jest.fn(() => {
      return {
        rows: [
          {
            id: 1,
            local,
            hashed_pw: correctPW.hashedInDB,
            nickname: "testBot",
            is_hr: false,
            is_team_head: true,
          },
        ],
      };
    }) as any;
    const checkPasswordSpy = jest.fn(checkPassword).mockResolvedValue(true);
    const staffService = new StaffService(fakeDB, checkPasswordSpy);
    const result = await staffService.login(local, correctPW.original);
    expect(result).toEqual({
      success: true,
      id: 1,
      nickname: "testBot",
      is_hr: false,
      is_team_head: true,
    });
  });
});
