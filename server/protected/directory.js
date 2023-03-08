import { loadNavBar } from "./modules/loadNavbar.js";
import { loadProfiles } from "./modules/directory/loadProfile.js";
import { regTitleSelect } from "./modules/directory/filter.js";
import { viewDetailBtn } from "./modules/directory/viewDetail.js";

window.onload = async () => {
	await loadNavBar();
	await loadProfiles();
	await regTitleSelect();
	await viewDetailBtn();
};
