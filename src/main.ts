import express from "express";
import { resolve } from "path";
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

app.use("/", adminRoute);
app.use("/", deptAncmtRoute);
app.use("/", publicAncmtRoute);
app.use("/", teamAncmtRoute);
app.use("/", userRoute);

const publicPath = resolve(__dirname + "/" + "../public");
const protectedPath = resolve(__dirname + "/" + "../protected/main ");
const adminPath = resolve(__dirname + "/" + "../protected/admin ");
app.use(redirectMiddleware, express.static(publicPath));
app.use(loginGuard, express.static(protectedPath));
app.use(adminGuard, express.static(adminPath));

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Listening to http://localhost:${PORT}`);
});
