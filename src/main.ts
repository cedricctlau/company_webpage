import express from "express";
import { hrGuard, loginGuard } from "./helpers/guard";
import "./helpers/session";
import { sessionMiddleware } from "./helpers/session";
import hrRoute from "./routes/hrRoute";
import staffRoute from "./routes/staffRoute";

const app = express();
app.use(express.urlencoded());
app.use(express.json());

app.use(sessionMiddleware);

app.use("/staff", staffRoute);
app.use("/HR", hrGuard, hrRoute);

app.use(loginGuard, express.static("../protected"));
app.use(hrGuard, express.static("../protected/hr"));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});
