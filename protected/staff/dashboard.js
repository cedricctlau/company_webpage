import { hideBtn } from "../navbar";

window.onload(async () => {
	await hideBtn();
	await loadAnc();
});

async function loadAnc() {
	const json = await fetch("/getAnnouncement");
	if (!json.success) {
		alert(
			`Unexpected error occurred when fetching announcements!\nPlease refresh the page!\nContact the IT department if this error persists...`
		);
		return;
	}
	const holder = document.querySelector(`#annc-holder`);
	holder.innerHTML = "";
	const ANNCs = json.outcome.announcements;
	for (const ANNC of ANNCs) {
		const { content, creator, is_public, updated_at } = ANNC;
		const style = is_public ? `btn-outline-success` : `btn-outline-dark`;
		holder.innerHTML += /*html*/ `<div class="annc btn ${style}"><div class="content">${content}</div><div class="note">created by ${creator} on ${updated_at}</div></div>`;
	}
}
