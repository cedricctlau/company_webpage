import { Request, Response } from "express";
import errorHandler from "../helpers/errorHandler";
import { hashPassword } from "../helpers/hash";
import UserService from "../services/userService";

class UserController {
  constructor(private s: UserService) {}

  login = async (req: Request, res: Response) => {
    try {
      if (req.session.staff) {
        throw new Error("req.session.staff");
      }
      const { email, password } = req.body;
      const hashedPW = await hashPassword(password);
      const json = await this.s.login(email, hashedPW);
      if (!json.success) {
        throw json.e;
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
}
