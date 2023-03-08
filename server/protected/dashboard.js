import { loadNavBar } from "./modules/loadNavbar.js";
import { hideBtn } from "./modules/dashboard/hideBtn.js";
import { loadAncmts} from "./modules/dashboard/loadAncmts.js";
import { loadModals } from "./modules/dashboard/loadModals.js";

window.onload = async () => {
	await loadNavBar();
	await hideBtn();
	await loadAncmts();
	await loadModals();
};
