import { Request, Response } from "express";
import UserService from "./userService";
import "../helpers/session";

export default class UserController {
  constructor(
    private s: UserService,
    private hashPassword: (a: string) => Promise<string>,
    private errorHandler: (e: any, req: Request, res: Response) => void
  ) {}

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      if (req.session.staff_id && req.session.priv) {
        res.redirect(`dashboard.html`);
        return;
      }
      const { username, password } = req.body;
      const hashed_pw = await this.hashPassword(password);
      const json = await this.s.login(username, hashed_pw);
      if (!json.success) {
        res.json(json);
        return;
      }
      req.session = json.outcome;
      res.redirect(`dashboard.html`);
      res.json(json);
    } catch (error) {
      this.errorHandler(error, req, res);
    }
  };

  logout = async (req: Request, res: Response): Promise<void> => {
    try {
      req.session.destroy((error) => {
        throw error;
      });
      res.json({ success: true });
      res.redirect(`index.html`);
    } catch (error) {
      this.errorHandler(error, req, res);
    }
  };

  changePW = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.session.staff_id || !req.session.priv) {
        res.redirect(`index.html`);
        return;
      }
      const staff_id = req.session.staff_id;
      const hashed_pw = await this.hashPassword(req.body.password);
      const json = await this.s.changePW(staff_id, hashed_pw);
      res.json(json);
    } catch (error) {
      this.errorHandler(error, req, res);
    }
  };

  // getProfile = async (req: Request, res: Response): Promise<void> => {
  //   try {
  //     if (!req.session.staff) {
  //       throw new Error(`!req.session.staff`);
  //     }
  //     const id = req.session.staff.id;
  //     const json = await this.s.getAllProfiles(id);
  //     res.json(json);
  //   } catch (error) {
  //     this.errorHandler(error, req, res);
  //   }
  // };

  getNickname = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.session.staff_id || !req.session.priv) {
        throw new Error(`!req.session.staff_id || !req.session.priv`);
      }
      const staff_id = req.session.staff_id;
      const json = await this.s.getNickname(staff_id);
      res.json(json);
    } catch (error) {
      this.errorHandler(error, req, res);
    }
  };

  checkPrivilege = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.session.staff_id || !req.session.priv) {
        throw new Error(`!req.session.staff_id || !req.session.priv`);
      }
      const priv = req.session.priv;
      const json = { success: true, outcome: { priv } };
      res.json(json);
    } catch (error) {
      this.errorHandler(error, req, res);
    }
  };
}
