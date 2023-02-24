import { checkPassword } from "../src/helpers/hash";
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

  const fakeQuerySuccessful = jest.fn((...others: any[]) => {
    return {
      select: (...others: any[]) => {
        return {
          where: (...others: any[]) => {
            return [
              {
                id: 1,
                local,
                hashed_pw: correctPW.hashedInDB,
                nickname: "testBot",
                is_hr: false,
                is_team_head: true,
              },
            ];
          },
        };
      },
    };
  });

  const fakeQueryNone = jest.fn((...others: any[]) => {
    return {
      select: (...others: any[]) => {
        return {
          where: (...others: any[]) => {
            return [];
          },
        };
      },
    };
  });

  test("Login properly", async () => {
    const checkPasswordSpy = jest.fn(checkPassword).mockResolvedValue(true);
    const staffService = new StaffService(
      fakeQuerySuccessful as any,
      checkPasswordSpy
    );
    const json = await staffService.login(local, correctPW.original);
    expect(json).toEqual({
      success: true,
      id: 1,
      nickname: "testBot",
      is_hr: false,
      is_team_head: true,
    });
  });

  test("Wrong username", async () => {
    const checkPasswordSpy = jest.fn(checkPassword).mockResolvedValue(false);
    const staffService = new StaffService(
      fakeQuerySuccessful as any,
      checkPasswordSpy
    );
    const json = await staffService.login(local, wrongPW);
    expect(json.success).toBeFalsy();
    expect(json.error).toBeDefined();
    expect(checkPasswordSpy).toBeCalled();
  });

  test("Wrong password", async () => {
    const checkPasswordSpy = jest.fn(checkPassword).mockResolvedValue(false);
    const staffService = new StaffService(
      fakeQueryNone as any,
      checkPasswordSpy
    );
    const json = await staffService.login(local, wrongPW);
    expect(json.success).toBeFalsy();
    expect(json.error).toBeDefined();
    expect(checkPasswordSpy).not.toBeCalled();
  });
});

// describe("Testing changePW", () => {
//   const staffService = new StaffService(
//     fakeQueryNone as any,
//     checkPasswordSpy
//   );
//   const checkPasswordSpy = jest.fn(checkPassword).mockResolvedValue(true);
// });
