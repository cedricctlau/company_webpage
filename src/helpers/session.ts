import expressSession from "express-session";
import Priv from "../models/priv";

export const sessionMiddleware = expressSession({
  resave: true,
  saveUninitialized: true,
  secret: "Tecky is excellent!",
});

declare module "express-session" {
  interface SessionData {
    staff_id?: number;
    priv?: Priv;
  }
}
