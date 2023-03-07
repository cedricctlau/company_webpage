export async function hideBtn() {
	const res = await fetch("/getPriv", {
		method: "GET",
		headers: { "Content-type": "application/json" },
	});
	const json = await res.json();
	if (!json.success) {
		alert(
			`Unexpected error occurred when fetching privilege!\nPlease refresh the page!\nContact the IT department if this error persists...`
		);
		return;
	}
	const priv = json.outcome.priv;

	if (priv.isAdmin || priv.isDeptHead || priv.isTeamHead) {
		document.querySelector("#add-ancmt-modals-btn").removeAttribute("hidden");
	}

	if (priv.isAdmin) {
		document.querySelector("#public-modal-btn").removeAttribute("hidden");
	}
	if (priv.isDeptHead) {
		document.querySelector("#dept-modal-btn").removeAttribute("hidden");
	}
	if (priv.isTeamHead) {
		document.querySelector("#team-modal-btn").removeAttribute("hidden");
	}
}
