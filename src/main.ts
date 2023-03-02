import express from "express";
import { resolve } from "path";
import { loginGuard, redirectMiddleware } from "./helpers/guard";
import "./helpers/session";
import { sessionMiddleware } from "./helpers/session";
import adminRoute from "./routes/adminRoute";
import hrRoute from "./routes/hrRoute";
import userRoute from "./routes/userRoute";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(sessionMiddleware);

app.use("/", userRoute);
// app.use("/", hrGuard, hrRoute);
// app.use("/", adminGuard, adminRoute);

app.use(express.static(resolve("../public")));
app.use(loginGuard, express.static(resolve("../protected/")));
// app.use(hrGuard, express.static("../protected/hr"));
// app.use(adminGuard, express.static("../protected/admin"));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});
