import { loadNavBar } from "./navbar";
import { resolve } from "path";

window.onload(async () => {
	await loadNavBar(uploadDir);
});

const uploadDir = resolve(__dirname + "/" + "../uploads");
