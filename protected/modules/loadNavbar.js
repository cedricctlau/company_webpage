export async function loadNavBar() {
	await loadWelcome();
	regLogoutBtn();
	showAdminPortal();
}

async function loadWelcome() {
	const res = await fetch("/getSelfProfile", {
		method: "GET",
		headers: { "Content-type": "application/json" },
	});
	const json = await res.json();
	if (!json.success) {
		alert(
			`Unexpected error occurred when fetching profile!\nPlease refresh the page and try again!\nContact the IT department if this error persists...`
		);
		return;
	}
	const { username, nickname, picture } = json.outcome.profile;
	document.querySelector(
		"#welcome"
	).innerHTML = /*html*/ `<div><img id="icon" src="${picture}" /></div><div id="mini-profile">${nickname} (${username})</div>`;
}

function regLogoutBtn() {
	document.querySelector("#logout-btn").addEventListener("click", async () => {
		const res = await fetch("/logout", {
			method: "GET",
			headers: { "Content-type": "application/json" },
		});
		const json = await res.json();
		if (!json.success) {
			return;
		}
		alert(`Logout successful!`);
		window.location.href = "/";
	});
}

async function showAdminPortal() {
	const res = await fetch("/getPriv", {
		method: "GET",
		headers: { "Content-type": "application/json" },
	});
	const json = await res.json();
	const check = json.outcome.priv.isAdmin;
	if (!check) {
		return;
	}
	document
		.querySelectorAll(".admin-only")
		.forEach((node) => node.removeAttribute("hidden"));
}
