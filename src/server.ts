import express from "express";
import { join } from "path";
import { DateStringify } from "./helpers/dateStringify";
import { adminGuard, loginGuard, redirectMiddleware } from "./helpers/guard";
import "./helpers/session";
import { sessionMiddleware } from "./helpers/session";
import {
	adminRoute,
	deptAncmtRoute,
	publicAncmtRoute,
	teamAncmtRoute,
	userRoute,
} from "./router";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(sessionMiddleware);

app.use((req, res, next) => {
	let date = new DateStringify();
	console.log(
		`[${date.stringify()}] Request ${req.method} ${req.path} from ${req.ip}`
	);

	next();
});

app.use("/", adminRoute);
app.use("/", deptAncmtRoute);
app.use("/", publicAncmtRoute);
app.use("/", teamAncmtRoute);
app.use("/", userRoute);

const uploadDir = join(__dirname, "../upload");
const publicDir = join(__dirname, "../public");
const protectedDir = join(__dirname, "../protected");
const adminDir = join(__dirname, "../admin");
app.use(express.static(uploadDir));
app.use(express.static(publicDir));
app.use(loginGuard, express.static(protectedDir));
app.use(adminGuard, express.static(adminDir));

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Listening to http://localhost:${PORT}`);
});
