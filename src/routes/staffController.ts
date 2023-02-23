import { Request, Response } from "express";
import errorHandler from "../helpers/errorHandler";
import { hashPassword } from "../helpers/hash";
import StaffService from "./staffService";
import "../helpers/session";

export default class StaffController {
  constructor(private s: StaffService) {}

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
        // Overwrite session
        req.session.staff = {
          id: json.staff.id,
          nickname: json.staff.nickname,
        };
        req.session.isHR = json.staff.is_hr;
        req.session.isTeamHead = json.staff.is_team_head;
      }
      res.json(json);
    } catch (e) {
      errorHandler(e, req, res);
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
      errorHandler(e, req, res);
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
      errorHandler(e, req, res);
    }
  };
}
