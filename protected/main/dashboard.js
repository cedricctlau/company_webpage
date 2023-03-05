import { hideBtn, loadWelcome } from "../navbar";
import { loadWelcome } from "../navbar";
import "../navbar";

window.onload(async () => {
	await loadWelcome();
	await hideBtn();
	await loadPublicAncmt();
	await loadDeptAncmt();
	await loadTeamAncmt();
	await updateDeptList();
	await updateTeamList();
});

document
	.querySelector("#public-ancmt-submit-btn")
	.addEventListener("click", async (event) => {
		event.preventDefault();
		const content = document.querySelector("#public-ancmt-content").value;
		if (!content) {
			alert(`Please insert announcement content!`);
			return;
		}
		const res = await fetch(`/createPublicAncmt`, { body: { content } });
		const json = await res.json();
		if (!json.success) {
			alert(
				`Unexpected error occurred when creating announcement!\nPlease refresh the page and try again!\nContact the IT department if this error persists...`
			);
			return;
		}
		alert("Announcement created!");
		document.querySelector("#public-ancmt-content").value = "";
	});

document
	.querySelector("#dept-ancmt-submit-btn")
	.addEventListener("click", async (event) => {
		event.preventDefault();
		const dept_id = parseInt(document.querySelector("#dept-select").value);
		const content = document.querySelector("#dept-ancmt-content").value;
		if (!dept_id) {
			alert(`Please choose a target department!`);
			return;
		}
		if (!content) {
			alert(`Please insert announcement content!`);
			return;
		}
		const res = await fetch(`/createDeptAncmt`, { body: { dept_id, content } });
		const json = await res.json();
		if (!json.success) {
			alert(
				`Unexpected error occurred when creating announcement!\nPlease refresh the page and try again!\nContact the IT department if this error persists...`
			);
			return;
		}
		alert(`Announcement created!`);
		document.querySelector("#dept-select").value = "";
		document.querySelector("#dept-ancmt-content").value = "";
	});

document
	.querySelector("#team-ancmt-submit-btn")
	.addEventListener("click", async (event) => {
		event.preventDefault();
		const team_id = parseInt(document.querySelector("#team-select").value);
		const content = document.querySelector("#team-ancmt-content").value;
		if (!team_id) {
			alert(`Please choose a target team!`);
			return;
		}
		if (!content) {
			alert(`Please insert announcement content!`);
			return;
		}
		const res = await fetch(`/createTeamAncmt`, {
			body: { team_id, content },
		});
		const json = await res.json();
		if (!json.success) {
			alert(
				`Unexpected error occurred when creating announcement!\nPlease refresh the page and try again!\nContact the IT department if this error persists...`
			);
			return;
		}
		alert(`Announcement created!`);
		document.querySelector("#team-select").value = "";
		document.querySelector("#team-ancmt-content").value = "";
	});

document
	.querySelector("#edit-public-ancmt-btn")
	.addEventListener("click", async (event) => {
		event.preventDefault();
		const content = document.querySelector("#edit-public-ancmt-content").value;
		if (!content) {
			alert(`Please insert announcement content!`);
			return;
		}
		const id = document.querySelector("#edit-public-ancmt-content").dataset.id;
		const res = await fetch(`/editPublicAncmt/${id}`, { body: { content } });
		const json = await res.json();
		if (!json.success) {
			alert(
				`Unexpected error occurred when editing announcement!\nPlease refresh the page and try again!\nContact the IT department if this error persists...`
			);
			return;
		}
		alert("Announcement edited!");
		document.querySelector("#edit-public-ancmt-content").value = "";
		await loadPublicAncmt();
	});

document
	.querySelector("#edit-dept-ancmt-btn")
	.addEventListener("click", async (event) => {
		event.preventDefault();
		const content = document.querySelector("#edit-dept-ancmt-content").value;
		if (!content) {
			alert(`Please insert announcement content!`);
			return;
		}
		const id = document.querySelector("#edit-dept-ancmt-content").dataset.id;
		const res = await fetch(`/editDeptAncmt/${id}`, { body: { content } });
		const json = await res.json();
		if (!json.success) {
			alert(
				`Unexpected error occurred when editing announcement!\nPlease refresh the page and try again!\nContact the IT department if this error persists...`
			);
			return;
		}
		alert("Announcement edited!");
		document.querySelector("#edit-dept-ancmt-content").value = "";
		await loadDeptAncmt();
	});

document
	.querySelector("#edit-team-ancmt-btn")
	.addEventListener("click", async (event) => {
		event.preventDefault();
		const content = document.querySelector("#edit-team-ancmt-content").value;
		if (!content) {
			alert(`Please insert announcement content!`);
			return;
		}
		const id = document.querySelector("#edit-team-ancmt-content").dataset.id;
		const res = await fetch(`/editTeamAncmt/${id}`, {
			body: { content },
		});
		const json = await res.json();
		if (!json.success) {
			alert(
				`Unexpected error occurred when editing announcement!\nPlease refresh the page and try again!\nContact the IT department if this error persists...`
			);
			return;
		}
		alert("Announcement edited!");
		document.querySelector("#edit-team-ancmt-content").value = "";
		await loadTeamAncmt();
	});

document
	.querySelector("#del-public-ancmt-btn")
	.addEventListener("click", async (event) => {
		event.preventDefault();
		const id = document.querySelector("#del-public-ancmt-content").dataset.id;
		const res = await fetch(`/delPublicAncmt/${id}`, { body: { content } });
		const json = await res.json();
		if (!json.success) {
			alert(
				`Unexpected error occurred when deleting announcement!\nPlease refresh the page and try again!\nContact the IT department if this error persists...`
			);
			return;
		}
		alert("Announcement deleted!");
		await loadPublicAncmt();
	});

document
	.querySelector("#del-dept-ancmt-btn")
	.addEventListener("click", async (event) => {
		event.preventDefault();
		const id = document.querySelector("#del-dept-ancmt-content").dataset.id;
		const res = await fetch(`/delDeptAncmt/${id}`, { body: { content } });
		const json = await res.json();
		if (!json.success) {
			alert(
				`Unexpected error occurred when deleting announcement!\nPlease refresh the page and try again!\nContact the IT department if this error persists...`
			);
			return;
		}
		alert("Announcement deleted!");
		await loadDeptAncmt();
	});

document
	.querySelector("#del-team-ancmt-btn")
	.addEventListener("click", async (event) => {
		event.preventDefault();
		const id = document.querySelector("#del-team-ancmt-content").dataset.id;
		const res = await fetch(`/delTeamAncmt/${id}`, { body: { content } });
		const json = await res.json();
		if (!json.success) {
			alert(
				`Unexpected error occurred when deleting announcement!\nPlease refresh the page and try again!\nContact the IT department if this error persists...`
			);
			return;
		}
		alert("Announcement deleted!");
		await loadTeamAncmt();
	});

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
		holder.innerHTML += /*html*/ `<div class="public-ancmt ${owned} btn ${style}" data-id="${id}" data-content=${content} ><div class="content">${content}</div><div class="note">created by ${creator} on ${created_at}</div></div>`;
	}

	const ownedAncmts = document.querySelectorAll(".public-ancmts", ".owned");
	for (const ownedAncmt of ownedAncmts) {
		ownedAncmt.setAttribute("data-bs-toggle", "modal");
		ownedAncmt.setAttribute("data-bs-target", "edit-public-ancmt-modal");
		ownedAncmt.addEventListener("click", (event) => {
			const id = event.target.dataset.id;
			document.querySelector("#edit-public-ancmt-content").innerText =
				event.target.dataset.content;
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
		holder.innerHTML += /*html*/ `<div class="dept-ancmt ${owned} btn ${style}" data-id="${id}" data-content=${content} ><div class="note">(${dept})</div><div class="content">${content}</div><div class="note">created by ${creator} on ${created_at}</div></div>`;
	}

	const ownedAncmts = document.querySelectorAll(".dept-ancmts", ".owned");
	for (const ownedAncmt of ownedAncmts) {
		ownedAncmt.setAttribute("data-bs-toggle", "modal");
		ownedAncmt.setAttribute("data-bs-target", "edit-dept-ancmt-modal");
		ownedAncmt.addEventListener("click", (event) => {
			const id = event.target.dataset.id;
			document.querySelector("#edit-dept-ancmt-content").innerText =
				event.target.dataset.content;
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
		holder.innerHTML += /*html*/ `<div class="team-ancmt ${owned} btn ${style} data-content=${content}" data-id="${id}" ><div class="note">(${team})</div><div class="content">${content}</div><div class="note">created by ${creator} on ${created_at}</div></div>`;
	}

	const ownedAncmts = document.querySelectorAll(".team-ancmts", ".owned");
	for (const ownedAncmt of ownedAncmts) {
		ownedAncmt.setAttribute("data-bs-toggle", "modal");
		ownedAncmt.setAttribute("data-bs-target", "edit-team-ancmt-modal");
		ownedAncmt.addEventListener("click", (event) => {
			const id = event.target.dataset.id;
			document.querySelector("#edit-team-ancmt-content").innerText =
				event.target.dataset.content;
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
	select.innerHTML = /*html*/ `<option value="">=== Please choose the target department ===</option>`;
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
	select.innerHTML = /*html*/ `<option value="">=== Please choose the target team ===</option>`;
	for (const item of json.outcome.teamList) {
		select.innerHTML += /*html*/ `<option value="${item.team_id}">${item.team}</option>`;
	}
}
