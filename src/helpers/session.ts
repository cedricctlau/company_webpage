import expressSession from "express-session";

export const sessionMiddleware = expressSession({
  resave: true,
  saveUninitialized: true,
  secret: "Tecky is excellent!",
});

declare module "express-session" {
  interface SessionData {
    staff: {
      id: number;
      nickname: string;
    };
    isHR: boolean;
    isTeamHead: boolean
  }
}
