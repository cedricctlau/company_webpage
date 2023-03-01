import { Request, Response } from "express";
import { StaffProfile } from "../../src/models/staff";
import HRController from "../../src/routes/hrController";
import HRService from "../../src/routes/hrService";

jest.mock("../../src/routes/hrService");

describe("Testing HR controller", () => {
  const mKnex = {} as any;
  const h = jest.fn().mockResolvedValue("aHashedPassword");
  const e = jest.fn().mockResolvedValue("");
  const s = new HRService(mKnex);
  const c = new HRController(s, h, e);

  it("can create local", async () => {
    const req = {
      body: {
        nickname: "Tes",
        first_name: "Test Ing",
        last_name: "Ng",
      },
    } as any as Request;
    s.createLocal = jest.fn(
      (nickname: string, first_name: string, last_name: string) =>
        new Promise((resolve, reject) =>
          resolve({ success: true, outcome: { local: "testing" } })
        )
    );
    const res = { json: jest.fn() } as any as Response;

    await c.createLocal(req, res);
    expect(res.json).toBeCalledWith({
      success: true,
      outcome: { local: "testing" },
    });
  });

  it.only("can register", async () => {
    const req = {
      body: {
        username: "testing@tecky.io",
        password: "aRawPasswordThatIsNotHashed",
        nickname: "Tes",
        first_name: "Test Ing",
        last_name: "Ng",
        gender: "M",
        tel: "23800000",
        is_hr: false,
        is_team_head: false,
        title_id: 3,
      },
    } as any as Request;
    s.register = jest.fn(
      (local: string, hashed_pw: string, profile: StaffProfile) =>
        new Promise((resolve, reject) =>
          resolve({ success: true, outcome: { createdUserID: 5 } })
        )
    );
    const res = { json: jest.fn() } as any as Response;
    await c.register(req, res);
    expect(res.json).toBeCalledWith({
      success: true,
      outcome: { createdUserID: 5 },
    });
  });

  it("can change profile", () => {
    const req = {
      params: { id: 5 },
      body: {
        nickname: "Tes",
        first_name: "Test Ing",
        last_name: "Ng",
        gender: "M",
        tel: "23800000",
        is_hr: false,
        is_team_head: false,
        title_id: 3,
      },
    };
    s.changeProfile = jest.fn(
      (id: string, profile: StaffProfile) =>
        new Promise((resolve, reject) => resolve({ success: true }))
    );
    const res = { json: jest.fn() };
    expect(res.json).toBeCalledWith({
      success: true,
    });
  });
});
