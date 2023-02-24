import { Request, Response } from "express";
import { hashPassword } from "../helpers/hash";
import StaffService from "./staffService";
import "../helpers/session";

export default class StaffController {
  constructor(
    private s: StaffService,
    private errorHandler: (e: any, req: Request, res: Response) => void
  ) {}

  login = async (req: Request, res: Response) => {
    try {
      if (req.session.staff) {
        throw new Error("req.session.staff");
      }
      const { email, password } = req.body;
      const local = email.substring(0, email.search("@"));
      const hashed_pw = await hashPassword(password);
      const json = await this.s.login(local, hashed_pw);
      if (!json.success) {
        throw json.error;
      }
      {
        const { id, nickname, is_hr, is_team_head } = json;
        // Overwrite session
        req.session.staff = { id, nickname, is_hr, is_team_head };
      }
      res.json(json);
    } catch (e) {
      this.errorHandler(e, req, res);
    }
  };

  logout = async (req: Request, res: Response) => {
    try {
      if (!req.session.staff) {
        throw new Error("!req.session.staff");
      }
      req.session.destroy((e) => {
        throw e;
      });
      res.json({ success: true });
    } catch (e) {
      this.errorHandler(e, req, res);
    }
  };

  changePW = async (req: Request, res: Response) => {
    try {
      if (!req.session.staff) {
        throw new Error(`!req.session.staff`);
      }
      const id = req.session.staff.id;
      const hashed_pw = await hashPassword(req.body.password);
      const json = await this.s.changePW(id, hashed_pw);
      if (!json.success) {
        throw json.error;
      }
      res.json(json);
    } catch (e) {
      this.errorHandler(e, req, res);
    }
  };
}
