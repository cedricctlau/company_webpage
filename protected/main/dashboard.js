import { hideBtn } from "../navbar";

window.onload(async () => {
	await hideBtn();
	await loadPublicAncmt();
	await loadDeptAncmt();
	await loadTeamAncmt();
	await updateDeptList();
	await updateTeamList();
});

//TODO: AJAX submission

async function hideBtn() {
	const res = await fetch("/getPriv");
	const json = res.json();
	if (!json.success) {
		alert(
			`Unexpected error occurred when fetching privilege!\nPlease refresh the page!\nContact the IT department if this error persists...`
		);
		return;
	}
	const priv = json.outcome.priv;

	if (!priv.priv_all) {
		document.querySelector("#public-modal-btn").setAttribute("hidden");
	}
	if (!priv.priv_dept) {
		document.querySelector("#dept-modal-btn").setAttribute("hidden");
	}
	if (!priv.priv_team) {
		document.querySelector("#team-modal-btn").setAttribute("hidden");
	}
}

async function loadPublicAncmt() {
	const json = await fetch("/getPublicAncmt");
	if (!json.success) {
		alert(
			`Unexpected error occurred when fetching announcements!\nPlease refresh the page!\nContact the IT department if this error persists...`
		);
		return;
	}
	const holder = document.querySelector(`#public-ancmt-holder`);
	holder.innerHTML = "";
	const ancmts = json.outcome.publicAncmts;
	for (const ancmt of ancmts) {
		const { id, content, created_at, owned } = ancmt;
		const creator = username.substring(0, username.search("@"));
		const style = owned === "owned" ? "btn-danger" : "btn-outline-danger";
		holder.innerHTML += /*html*/ `<div class="public-ancmt ${owned} btn ${style}" data-id="${id}" ><div class="content">${content}</div><div class="note">created by ${creator} on ${created_at}</div></div>`;
	}

	const ownedAncmts = document.querySelectorAll(".public-ancmts", ".owned");
	for (const ownedAncmt of ownedAncmts) {
		ownedAncmt.setAttribute("data-bs-toggle", "modal");
		ownedAncmt.setAttribute("data-bs-target", "edit-public-ancmt-modal");
		ownedAncmt.addEventListener("click", (event) => {
			const id = event.target.dataset.id;
			document
				.querySelector("#edit-public-ancmt-btn")
				.setAttribute("data-id", id);
			document
				.querySelector("#del-public-ancmt-btn")
				.setAttribute("data-id", id);
		});
	}
}

async function loadDeptAncmt() {
	const json = await fetch("/getDeptAncmt");
	if (!json.success) {
		alert(
			`Unexpected error occurred when fetching announcements!\nPlease refresh the page!\nContact the IT department if this error persists...`
		);
		return;
	}
	const holder = document.querySelector(`#dept-ancmt-holder`);
	holder.innerHTML = "";
	const ancmts = json.outcome.deptAncmts;
	for (const ancmt of ancmts) {
		const { id, content, created_at, owned, dept } = ancmt;
		const creator = username.substring(0, username.search("@"));
		const style = owned === "owned" ? "btn-info" : "btn-outline-info";
		holder.innerHTML += /*html*/ `<div class="dept-ancmt ${owned} btn ${style}" data-id="${id}" ><div class="note">(${dept})</div><div class="content">${content}</div><div class="note">created by ${creator} on ${created_at}</div></div>`;
	}

	const ownedAncmts = document.querySelectorAll(".dept-ancmts", ".owned");
	for (const ownedAncmt of ownedAncmts) {
		ownedAncmt.setAttribute("data-bs-toggle", "modal");
		ownedAncmt.setAttribute("data-bs-target", "edit-dept-ancmt-modal");
		ownedAncmt.addEventListener("click", (event) => {
			const id = event.target.dataset.id;
			document
				.querySelector("#edit-dept-ancmt-btn")
				.setAttribute("data-id", id);
			document.querySelector("#del-dept-ancmt-btn").setAttribute("data-id", id);
		});
	}
}

async function loadTeamAncmt() {
	const json = await fetch("/getTeamAncmt");
	if (!json.success) {
		alert(
			`Unexpected error occurred when fetching announcements!\nPlease refresh the page!\nContact the IT department if this error persists...`
		);
		return;
	}
	const holder = document.querySelector(`#team-ancmt-holder`);
	holder.innerHTML = "";
	const ancmts = json.outcome.teamAncmts;
	for (const ancmt of ancmts) {
		const { id, content, created_at, owned, team } = ancmt;
		const creator = username.substring(0, username.search("@"));
		const style = owned === "owned" ? "btn-success" : "btn-outline-success";
		holder.innerHTML += /*html*/ `<div class="team-ancmt ${owned} btn ${style}" data-id="${id}" ><div class="note">(${team})</div><div class="content">${content}</div><div class="note">created by ${creator} on ${created_at}</div></div>`;
	}

	const ownedAncmts = document.querySelectorAll(".team-ancmts", ".owned");
	for (const ownedAncmt of ownedAncmts) {
		ownedAncmt.setAttribute("data-bs-toggle", "modal");
		ownedAncmt.setAttribute("data-bs-target", "edit-team-ancmt-modal");
		ownedAncmt.addEventListener("click", (event) => {
			const id = event.target.dataset.id;
			document
				.querySelector("#edit-team-ancmt-btn")
				.setAttribute("data-id", id);
			document.querySelector("#del-team-ancmt-btn").setAttribute("data-id", id);
		});
	}
}

async function updateDeptList() {
	const res = await fetch("/getDeptList");
	const json = res.json();
	if (!json.success) {
		alert(
			`Unexpected error occurred when fetching department list!\nPlease refresh the page!\nContact the IT department if this error persists...`
		);
	}

	const select = document.querySelector("#dept-select");
	select.innerHTML = ``;
	for (const item of json.outcome.deptList) {
		select.innerHTML += /*html*/ `<option value="${item.dept_id}">${item.dept}</option>`;
	}
}

async function updateTeamList() {
	const res = await fetch("/getTeamList");
	const json = res.json();
	if (!json.success) {
		alert(
			`Unexpected error occurred when fetching team list!\nPlease refresh the page!\nContact the IT department if this error persists...`
		);
	}

	const select = document.querySelector("#team-select");
	select.innerHTML = ``;
	for (const item of json.outcome.teamList) {
		select.innerHTML += /*html*/ `<option value="${item.team_id}">${item.team}</option>`;
	}
}
