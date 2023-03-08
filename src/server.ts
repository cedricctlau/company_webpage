import express from "express";
import { join } from "path";
import { logger } from "./helpers/logger";
import { adminGuard, loginGuard } from "./helpers/guard";
import "./helpers/session";
import { sessionMiddleware } from "./helpers/session";
import {
	adminRoute,
	deptAncmtRoute,
	profileRoute,
	publicAncmtRoute,
	teamAncmtRoute,
	userRoute,
} from "./router";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(sessionMiddleware);

app.use(logger);

app.use("/", adminRoute);
app.use("/", deptAncmtRoute);
app.use("/", profileRoute);
app.use("/", publicAncmtRoute);
app.use("/", teamAncmtRoute);
app.use("/", userRoute);

const publicDir = join(__dirname, "../public");
const uploadDir = join(__dirname, "../uploads");
const protectedDir = join(__dirname, "../protected");
const adminDir = join(__dirname, "../protected/admin");
app.use(express.static(publicDir));
app.use(express.static(uploadDir));
app.use(loginGuard, express.static(protectedDir));
app.use(adminGuard, express.static(adminDir));

app.post("/abbr", async (req: express.Request, res: express.Response) => {
	const { nickname, first_name, last_name, password } = req.body;

	console.log({ nickname, first_name, last_name, password });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Listening to http://localhost:${PORT}`);
});
