import { loadAncmts } from "./loadAncmts.js";

export async function loadModals() {
	await updateDeptList();
	await updateTeamList();
	regAddAncmtBtns();
	regOpenEditModal();
	regEditBtns();
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

function regAddAncmtBtns() {
	document
		.querySelector("#add-public-ancmt-btn")
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
			document.querySelector("#close-add-public-ancmt-btn").click();
			loadAncmts();
		});

	document
		.querySelector("#add-dept-ancmt-btn")
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
			document.querySelector("#close-add-dept-ancmt-btn").click();
			loadAncmts();
		});

	document
		.querySelector("#add-team-ancmt-btn")
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
			document.querySelector("#close-add-team-ancmt-btn").click();
			loadAncmts();
		});
}

function regOpenEditModal() {
	document.querySelectorAll(".public-ancmt").forEach((node) => {
		node.addEventListener("click", () => {
			const contentNode = document.querySelector("#edit-public-ancmt-content");
			contentNode.innerText = node.dataset.content;
			contentNode.dataset.id = node.dataset.id;
			contentNode.dataset.owner = node.dataset.owner;
		});
	});
	document.querySelectorAll(".dept-ancmt").forEach((node) => {
		node.addEventListener("click", () => {
			const contentNode = document.querySelector("#edit-dept-ancmt-content");
			contentNode.innerText = node.dataset.content;
			contentNode.dataset.id = node.dataset.id;
			contentNode.dataset.owner = node.dataset.owner;
		});
	});
	document.querySelectorAll(".team-ancmt").forEach((node) => {
		node.addEventListener("click", () => {
			const contentNode = document.querySelector("#edit-team-ancmt-content");
			contentNode.innerText = node.dataset.content;
			contentNode.dataset.id = node.dataset.id;
			contentNode.dataset.owner = node.dataset.owner;
		});
	});
}

function regEditBtns() {
	document
		.querySelector("#edit-public-ancmt-btn")
		.addEventListener("click", async (event) => {
			event.preventDefault();
			const contentNode = document.querySelector("#edit-public-ancmt-content");
			const content = contentNode.value;
			const owner_id = contentNode.dataset.owner;
			if (!content) {
				alert(`Please insert announcement content!`);
				return;
			}
			const res = await fetch(`/editPublicAncmt/${contentNode.dataset.id}`, {
				method: "PUT",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({ content, owner_id }),
			});
			const json = await res.json();
			if (!json.success) {
				console.log(json);
				alert(
					`Unexpected error occurred when editing announcement!\nPlease refresh the page and try again!\nContact the IT department if this error persists...`
				);
				return;
			}
			alert("Announcement edited!");
			contentNode.value = "";
			document.querySelector("#close-edit-public-ancmt-btn").click();
			loadAncmts();
		});

	document
		.querySelector("#edit-dept-ancmt-btn")
		.addEventListener("click", async (event) => {
			event.preventDefault();
			const contentNode = document.querySelector("#edit-dept-ancmt-content");
			const content = contentNode.value;
			const owner_id = contentNode.dataset.owner;
			if (!content) {
				alert(`Please insert announcement content!`);
				return;
			}
			const res = await fetch(`/editDeptAncmt/${contentNode.dataset.id}`, {
				method: "PUT",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({ content, owner_id }),
			});
			const json = await res.json();
			if (!json.success) {
				console.log(json);
				alert(
					`Unexpected error occurred when editing announcement!\nPlease refresh the page and try again!\nContact the IT department if this error persists...`
				);
				return;
			}
			alert("Announcement edited!");
			contentNode.value = "";
			document.querySelector("#close-edit-dept-ancmt-btn").click();
			loadAncmts();
		});

	document
		.querySelector("#edit-team-ancmt-btn")
		.addEventListener("click", async (event) => {
			event.preventDefault();
			const contentNode = document.querySelector("#edit-team-ancmt-content");
			const content = contentNode.value;
			const owner_id = contentNode.dataset.owner;
			if (!content) {
				alert(`Please insert announcement content!`);
				return;
			}
			const res = await fetch(`/editTeamAncmt/${contentNode.dataset.id}`, {
				method: "PUT",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({ content, owner_id }),
			});
			const json = await res.json();
			if (!json.success) {
				console.log(json);
				alert(
					`Unexpected error occurred when editing announcement!\nPlease refresh the page and try again!\nContact the IT department if this error persists...`
				);
				return;
			}
			alert("Announcement edited!");
			contentNode.value = "";
			document.querySelector("#close-edit-team-ancmt-btn").click();
			loadAncmts();
		});

	document
		.querySelector("#del-public-ancmt-btn")
		.addEventListener("click", async (event) => {
			event.preventDefault();
			const contentNode = document.querySelector("#edit-public-ancmt-content");
			const owner_id = contentNode.dataset.owner;
			const res = await fetch(`/delPublicAncmt/${contentNode.dataset.id}`, {
				method: "DELETE",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({ owner_id }),
			});
			const json = await res.json();
			if (!json.success) {
				console.log(json);
				alert(
					`Unexpected error occurred when deleting announcement!\nPlease refresh the page and try again!\nContact the IT department if this error persists...`
				);
				return;
			}
			alert("Announcement deleted!");
			document.querySelector("#close-edit-public-ancmt-btn").click();
			loadAncmts();
		});
	document
		.querySelector("#del-dept-ancmt-btn")
		.addEventListener("click", async (event) => {
			event.preventDefault();
			const contentNode = document.querySelector("#edit-dept-ancmt-content");
			const owner_id = contentNode.dataset.owner;
			const res = await fetch(`/delDeptAncmt/${contentNode.dataset.id}`, {
				method: "DELETE",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({ owner_id }),
			});
			const json = await res.json();
			if (!json.success) {
				console.log(json);
				alert(
					`Unexpected error occurred when deleting announcement!\nPlease refresh the page and try again!\nContact the IT department if this error persists...`
				);
				return;
			}
			alert("Announcement deleted!");
			document.querySelector("#close-edit-dept-ancmt-btn").click();
			loadAncmts();
		});
	document
		.querySelector("#del-team-ancmt-btn")
		.addEventListener("click", async (event) => {
			event.preventDefault();
			const contentNode = document.querySelector("#edit-team-ancmt-content");
			const owner_id = contentNode.dataset.owner;
			const res = await fetch(`/delTeamAncmt/${contentNode.dataset.id}`, {
				method: "DELETE",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({ owner_id }),
			});
			const json = await res.json();
			if (!json.success) {
				console.log(json);
				alert(
					`Unexpected error occurred when deleting announcement!\nPlease refresh the page and try again!\nContact the IT department if this error persists...`
				);
				return;
			}
			alert("Announcement deleted!");
			document.querySelector("#close-edit-team-ancmt-btn").click();
			loadAncmts();
		});
}
