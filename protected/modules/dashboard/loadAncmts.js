export async function loadAncmts() {
	await loadPublicAncmt();
	await loadDeptAncmt();
	await loadTeamAncmt();
	// regLxnPublicOwned();
	// regLxnrDeptOwned();
	// regLxnrTeamOwned();
}

async function loadPublicAncmt() {
	const res = await fetch("/getPublicAncmts", {
		method: "GET",
		headers: { "Content-type": "application/json" },
	});
	const json = await res.json();
	if (!json.success) {
		alert(
			`Unexpected error occurred when fetching public announcements!\nPlease refresh the page!\nContact the IT department if this error persists...`
		);
		return;
	}
	const holder = document.querySelector(`#public-ancmt-holder`);
	holder.innerHTML = "";
	const ancmts = json.outcome.publicAncmts;
	for (const ancmt of ancmts) {
		const { id, content, created_at, owned, username } = ancmt;
		const creator = username.substring(0, username.search("@"));
		const style = owned ? "btn-secondary" : "btn-outline-secondary";

		holder.innerHTML += /*html*/ `<div class="public-ancmt ${owned} btn ${style}" data-id="${id}" data-content=${content}><div class="content">${content}</div><div class="note">created by ${creator} on ${created_at}</div></div>`;
	}
}

async function loadDeptAncmt() {
	const res = await fetch("/getDeptAncmts", {
		method: "GET",
		headers: { "Content-type": "application/json" },
	});
	const json = await res.json();
	if (!json.success) {
		alert(
			`Unexpected error occurred when fetching department announcements!\nPlease refresh the page!\nContact the IT department if this error persists...`
		);
		return;
	}
	const holder = document.querySelector(`#dept-ancmt-holder`);
	holder.innerHTML = "";
	const ancmts = json.outcome.deptAncmts;
	for (const ancmt of ancmts) {
		const { id, content, created_at, owned, dept, username } = ancmt;
		const creator = username.substring(0, username.search("@"));
		const style = owned ? "btn-danger" : "btn-outline-danger";
		holder.innerHTML += /*html*/ `<div class="dept-ancmt ${owned} btn ${style}" data-id="${id}" data-content=${content} ><div class="note">(${dept})</div><div class="content">${content}</div><div class="note">created by ${creator} on ${created_at}</div></div>`;
	}
}

async function loadTeamAncmt() {
	const res = await fetch("/getTeamAncmts", {
		method: "GET",
		headers: { "Content-type": "application/json" },
	});
	const json = await res.json();
	if (!json.success) {
		alert(
			`Unexpected error occurred when fetching team announcements!\nPlease refresh the page!\nContact the IT department if this error persists...`
		);
		return;
	}
	const holder = document.querySelector(`#team-ancmt-holder`);
	holder.innerHTML = "";
	const ancmts = json.outcome.teamAncmts;
	for (const ancmt of ancmts) {
		const { id, content, created_at, owned, team, username } = ancmt;
		const creator = username.substring(0, username.search("@"));
		const style = owned ? "btn-info" : "btn-outline-info";
		holder.innerHTML += /*html*/ `<div class="team-ancmt ${owned} btn ${style} data-content=${content}" data-id="${id}" ><div class="note">(${team})</div><div class="content">${content}</div><div class="note">created by ${creator} on ${created_at}</div></div>`;
	}
}

// function regLxnPublicOwned() {
// 	const ownedAncmts = document.querySelectorAll(".public-ancmt.owned");
// 	for (const ownedAncmt of ownedAncmts) {
// 		ownedAncmt.addEventListener("click", () => {
// 			document
// 				.querySelector("#edit-public-ancmt-btn")
// 				.onclick(async (event) => {
// 					event.preventDefault();
// 					const id = parseInt(ownedAncmt.dataset.id);
// 					const content = document.querySelector(
// 						"#edit-public-ancmt-content"
// 					).value;
// 					if (!content) {
// 						alert(`Please insert announcement content!`);
// 						return;
// 					}
// 					const res = await fetch(`/editPublicAncmt/${id}`, {
// 						method: "PUT",
// 						headers: { "Content-type": "application/json" },
// 						body: JSON.stringify({ content }),
// 					});
// 					const json = await res.json();
// 					if (!json.success) {
// 						alert(
// 							`Unexpected error occurred when editing announcement!\nPlease refresh the page and try again!\nContact the IT department if this error persists...`
// 						);
// 						return;
// 					}
// 					alert("Announcement edited!");
// 					document.querySelector("#edit-public-ancmt-content").value = "";
// 					await loadPublicAncmt();
// 				});
// 			document.querySelector("#del-public-ancmt-btn").onclick(async (event) => {
// 				event.preventDefault();
// 				const id = parseInt(ownedAncmt.dataset.id);
// 				const res = await fetch(`/delPublicAncmt/${id}`, {
// 					method: "DELETE",
// 					headers: { "Content-type": "application/json" },
// 					body: JSON.stringify({ content }),
// 				});
// 				const json = await res.json();
// 				if (!json.success) {
// 					alert(
// 						`Unexpected error occurred when deleting announcement!\nPlease refresh the page and try again!\nContact the IT department if this error persists...`
// 					);
// 					return;
// 				}
// 				alert("Announcement deleted!");
// 				await loadPublicAncmt();
// 			});
// 		});
// 	}
// }

// function regLxnrDeptOwned() {
// 	const ownedAncmts = document.querySelectorAll(".dept-ancmts.owned");
// 	for (const ownedAncmt of ownedAncmts) {
// 		ownedAncmt.setAttribute("data-bs-toggle", "modal");
// 		ownedAncmt.setAttribute("data-bs-target", "edit-dept-ancmt-modal");

// 		ownedAncmt.addEventListener("click", () => {
// 			document.querySelector("#edit-dept-ancmt-btn").onclick(async (event) => {
// 				event.preventDefault();
// 				const id = parseInt(ownedAncmt.dataset.id);
// 				const content = document.querySelector(
// 					"#edit-dept-ancmt-content"
// 				).value;
// 				if (!content) {
// 					alert(`Please insert announcement content!`);
// 					return;
// 				}

// 				const res = await fetch(`/editDeptAncmt/${id}`, {
// 					method: "PUT",
// 					headers: { "Content-type": "application/json" },
// 					body: JSON.stringify({ content }),
// 				});
// 				const json = await res.json();
// 				if (!json.success) {
// 					alert(
// 						`Unexpected error occurred when editing announcement!\nPlease refresh the page and try again!\nContact the IT department if this error persists...`
// 					);
// 					return;
// 				}
// 				alert("Announcement edited!");
// 				document.querySelector("#edit-dept-ancmt-content").value = "";
// 				await loadDeptAncmt();
// 			});

// 			document.querySelector("#del-dept-ancmt-btn").onclick(async (event) => {
// 				event.preventDefault();
// 				const id = parseInt(ownedAncmt.dataset.id);
// 				const res = await fetch(`/delDeptAncmt/${id}`, {
// 					method: "DELETE",
// 					headers: { "Content-type": "application/json" },
// 					body: JSON.stringify({ content }),
// 				});
// 				const json = await res.json();
// 				if (!json.success) {
// 					alert(
// 						`Unexpected error occurred when deleting announcement!\nPlease refresh the page and try again!\nContact the IT department if this error persists...`
// 					);
// 					return;
// 				}
// 				alert("Announcement deleted!");
// 				await loadDeptAncmt();
// 			});
// 		});
// 	}
// }

// function regLxnrTeamOwned() {
// 	const ownedAncmts = document.querySelectorAll(".team-ancmts.owned");
// 	for (const ownedAncmt of ownedAncmts) {
// 		ownedAncmt.setAttribute("data-bs-toggle", "modal");
// 		ownedAncmt.setAttribute("data-bs-target", "edit-team-ancmt-modal");
// 		ownedAncmt.addEventListener("click", () => {
// 			document.querySelector("#edit-team-ancmt-btn").onclick(async (event) => {
// 				event.preventDefault();
// 				const id = parseInt(ownedAncmt.dataset.id);
// 				const content = document.querySelector(
// 					"#edit-team-ancmt-content"
// 				).value;
// 				if (!content) {
// 					alert(`Please insert announcement content!`);
// 					return;
// 				}
// 				const res = await fetch(`/editTeamAncmt/${id}`, {
// 					method: "PUT",
// 					headers: { "Content-type": "application/json" },
// 					body: JSON.stringify({ content }),
// 				});
// 				const json = await res.json();
// 				if (!json.success) {
// 					alert(
// 						`Unexpected error occurred when editing announcement!\nPlease refresh the page and try again!\nContact the IT department if this error persists...`
// 					);
// 					return;
// 				}
// 				alert("Announcement edited!");
// 				document.querySelector("#edit-team-ancmt-content").value = "";
// 				await loadTeamAncmt();
// 			});

// 			document.querySelector("#del-team-ancmt-btn").onclick(async (event) => {
// 				event.preventDefault();
// 				const id = parseInt(ownedAncmt.dataset.id);
// 				const res = await fetch(`/delTeamAncmt/${id}`, {
// 					method: "DELETE",
// 					headers: { "Content-type": "application/json" },
// 					body: JSON.stringify({ content }),
// 				});
// 				const json = await res.json();
// 				if (!json.success) {
// 					alert(
// 						`Unexpected error occurred when deleting announcement!\nPlease refresh the page and try again!\nContact the IT department if this error persists...`
// 					);
// 					return;
// 				}
// 				alert("Announcement deleted!");
// 				await loadTeamAncmt();
// 			});
// 		});
// 	}
// }
