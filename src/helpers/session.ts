import expressSession from "express-session";
import Staff from "../models/staff";

export const sessionMiddleware = expressSession({
  resave: true,
  saveUninitialized: true,
  secret: "Tecky is excellent!",
});

declare module "express-session" {
  interface SessionData {
    staff?: Pick<Staff, "id" | "nickname" | "is_hr" | "is_team_head">;
  }
}
