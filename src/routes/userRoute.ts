import { Router } from "express";
import { checkSchema } from "express-validator";
import myErrorHandler from "../helpers/errorHandler";
import { loginGuard } from "../helpers/guard";
import { checkPassword, hashPassword } from "../helpers/hash";
import myKnex from "../helpers/knex";
import schema from "../helpers/schema";
import UserController from "./userController";
import UserService from "./userService";

const userRoute = Router();

const s = new UserService(myKnex, checkPassword);
const c = new UserController(s, hashPassword, myErrorHandler);

userRoute.post("/login", c.login);
userRoute.get("/logout", loginGuard, c.logout);
userRoute.put(
  "/changePW",
  loginGuard,
  checkSchema(schema["register"]["password"]),
  c.changePW
);
// userRoute.get("/getProfile", c.getProfile);
userRoute.get("/getNickname", c.getNickname);
userRoute.get("/checkPrivilege", c.checkPrivilege);

export default userRoute;
