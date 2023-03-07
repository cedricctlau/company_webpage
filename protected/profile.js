import { loadNavBar } from "./modules/loadNavbar.js";
import { loadPage } from "./modules/profile/loadConfProfile.js";
import "./modules/profile/changePW.js";
import { loadMembership } from "./modules/profile/membership.js";

window.onload = async () => {
	await loadNavBar();
	await loadPage();
	await loadMembership()
};
