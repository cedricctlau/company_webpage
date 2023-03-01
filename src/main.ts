import express from "express";
import {
  adminGuard,
  hrGuard,
  loginGuard,
  redirectMiddleware,
} from "./helpers/guard";
import "./helpers/session";
import { sessionMiddleware } from "./helpers/session";
import adminRoute from "./routes/adminRoute";
import hrRoute from "./routes/hrRoute";
import userRoute from "./routes/userRoute";

const app = express();
app.use(express.urlencoded());
app.use(express.json());

app.use(sessionMiddleware);

app.use("/", userRoute);
app.use("/", hrGuard, hrRoute);
app.use("/", adminGuard, adminRoute);

app.use(redirectMiddleware, express.static("../public"));
app.use(loginGuard, express.static("../protected/s"));
app.use(hrGuard, express.static("../protected/hr"));
app.use(adminGuard, express.static("../protected/admin"));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});
