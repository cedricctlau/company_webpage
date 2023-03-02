import express from "express";
import { resolve } from "path";
import { loginGuard, redirectMiddleware } from "./helpers/guard";
import "./helpers/session";
import { sessionMiddleware } from "./helpers/session";
import { userRoute } from "./router";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(sessionMiddleware);

app.use("/", userRoute);

const publicPath = resolve(__dirname + "/" + "../public");
const protectedPath = resolve(__dirname + "/" + "../protected/main ");
app.use(redirectMiddleware, express.static(publicPath));
app.use(loginGuard, express.static(protectedPath));
// app.use(hrGuard, express.static("../protected/hr"));
// app.use(adminGuard, express.static("../protected/admin"));

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Listening to http://localhost:${PORT}`);
});
