import express from "express";
import { adminGuard, hrGuard, loginGuard } from "./helpers/guard";
import "./helpers/session";
import { sessionMiddleware } from "./helpers/session";
import adminRoute from "./routes/adminRoute";
import hrRoute from "./routes/hrRoute";
import staffRoute from "./routes/staffRoute";

const app = express();
app.use(express.urlencoded());
app.use(express.json());

app.use(sessionMiddleware);

app.use("/", staffRoute);
app.use("/", hrGuard, hrRoute);
app.use("/", adminGuard, adminRoute);

app.use(loginGuard, express.static("../protected"));
app.use(hrGuard, express.static("../protected/hr"));
app.use(adminGuard, express.static("../protected/admin"));

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Listening to http://localhost:${PORT}`);
});
