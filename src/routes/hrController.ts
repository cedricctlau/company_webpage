import { Request, Response } from "express";
import HRService from "./hrService";

export default class HRController {
  constructor(
    private s: HRService,
    private hashPassword: (pw: string) => Promise<string>,
    private errorHandler: (e: any, req: Request, res: Response) => void
  ) {}

  createLocal = async (req: Request, res: Response) => {
    try {
      const { nickname, first_name, last_name } = req.body;
      const json = await this.s.createLocal(nickname, first_name, last_name);
      if (!json.success) {
        throw json.error;
      }
      res.json(json);
    } catch (e) {
      this.errorHandler(e, req, res);
    }
  };

  register = async (req: Request, res: Response) => {
    try {
      const {
        email,
        password,
        nickname,
        first_name,
        last_name,
        gender,
        tel,
        is_hr,
        is_team_head,
        title_id,
      } = req.body;
      const local = email.substring(0, email.search("@"));
      const hashed_pw = await this.hashPassword(password);
      const json = await this.s.register(
        local,
        hashed_pw,
        nickname,
        first_name,
        last_name,
        gender,
        tel,
        is_hr,
        is_team_head,
        title_id
      );
      if (!json.success) {
        throw json.error;
      }
      res.json(json);
    } catch (e) {
      this.errorHandler(e, req, res);
    }
  };

  changeProfile = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const {
        nickname,
        first_name,
        last_name,
        gender,
        tel,
        is_hr,
        is_team_head,
        title_id,
      } = req.body;
      const profile = {
        nickname,
        first_name,
        last_name,
        gender,
        tel,
        is_hr,
        is_team_head,
        title_id,
      };
      const json = await this.s.changeProfile(id, profile);
      if (!json.success) {
        throw json.error;
      }
      res.json(json);
    } catch (e) {
      this.errorHandler(e, req, res);
    }
  };
}
