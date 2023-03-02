export async function loadAncmt() {
	const json = await fetch("/getAnnouncement");
	if (!json.success) {
		alert(
			`Unexpected error occurred when fetching announcements!\nPlease refresh the page!\nContact the IT department if this error persists...`
		);
		return;
	}
	const holder = document.querySelector(`#ancmt-holder`);
	holder.innerHTML = "";
	const ancmts = json.outcome.ancmts;
	for (const ancmt of ancmts) {
		const {
			id,
			content,
			creator,
			updated_at,
			is_public,
			dept_id,
			team_id,
			owned,
		} = ancmt;
		let style;
		if (is_public) {
			style = `btn-outline-danger`;
		} else if (dept_id) {
			style = `btn-outline-success`;
		} else if (team_id) {
			style = `btn-outline-secondary`;
		}
		holder.innerHTML += /*html*/ `<div class="ancmt btn ${style}" data-id="${id}" data-owned="${owned}"><div class="content">${content}</div><div class="note">created by ${creator} on ${updated_at}</div></div>`;
	}
}
