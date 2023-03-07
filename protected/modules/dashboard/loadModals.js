import { loadAncmts } from "./loadAncmts.js";

export async function loadModals() {
	await updateDeptList();
	await updateTeamList();
	regLxnrs();
}

async function updateDeptList() {
	const res = await fetch("/getDeptList", {
		method: "GET",
		headers: { "Content-type": "application/json" },
	});
	const json = await res.json();
	if (!json.success) {
		alert(
			`Unexpected error occurred when fetching department list!\nPlease refresh the page!\nContact the IT department if this error persists...`
		);
	}

	const select = document.querySelector("#dept-select");
	select.innerHTML = /*html*/ `<option value="">== Target department ==</option>`;
	for (const item of json.outcome.deptList) {
		select.innerHTML += /*html*/ `<option value="${item.dept_id}">${item.dept}</option>`;
	}
}

async function updateTeamList() {
	const res = await fetch("/getTeamList", {
		method: "GET",
		headers: { "Content-type": "application/json" },
	});
	const json = await res.json();
	if (!json.success) {
		alert(
			`Unexpected error occurred when fetching team list!\nPlease refresh the page!\nContact the IT department if this error persists...`
		);
	}

	const select = document.querySelector("#team-select");
	select.innerHTML = /*html*/ `<option value="">== Target team ==</option>`;
	for (const item of json.outcome.teamList) {
		select.innerHTML += /*html*/ `<option value="${item.team_id}">${item.team}</option>`;
	}
}

function regLxnrs() {
	document
		.querySelector("#public-ancmt-submit-btn")
		.addEventListener("click", async (event) => {
			event.preventDefault();
			const content = document.querySelector("#public-ancmt-content").value;
			if (!content) {
				alert(`Please insert announcement content!`);
				return;
			}
			const res = await fetch(`/createPublicAncmt`, {
				method: "POST",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({ content }),
			});
			const json = await res.json();
			if (!json.success) {
				alert(
					`Unexpected error occurred when creating announcement!\nPlease refresh the page and try again!\nContact the IT department if this error persists...`
				);
				return;
			}
			alert("Announcement created!");
			document.querySelector("#public-ancmt-content").value = "";
			loadAncmts();
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

			const res = await fetch("/createDeptAncmt", {
				method: "POST",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({ dept_id, content }),
			});
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
			loadAncmts();
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
				method: "POST",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({ team_id, content }),
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
			loadAncmts();
		});
}
