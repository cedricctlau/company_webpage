export async function loadMembership() {
	const res = await fetch("/getMembership", {
		method: "GET",
		headers: { "Content-type": "application/json" },
	});
	const json = await res.json();
	if (!json.success) {
		alert("Unexpected error when fetching membership!");
	}
	const depts = json.outcome.depts;
	const deptTable = document.querySelector("#deptMembership");
	deptTable.innerHTML = "";
	depts.forEach((obj) => {
		const dept = obj.dept;
		const icon = obj.is_dept_head
			? '<i class="fa-solid fa-check"></i>'
			: '<i class="fa-solid fa-xmark"></i>';
		deptTable.innerHTML += /*html*/ `<tr><td>${dept}</td><td>${icon}</td></tr>`;
	});

	const teams = json.outcome.teams;
	const teamTable = document.querySelector("#teamMembership");
	teamTable.innerHTML = "";
	teams.forEach((obj) => {
		const team = obj.team;
		const icon = obj.is_team_head
			? '<i class="fa-solid fa-check"></i>'
			: '<i class="fa-solid fa-xmark"></i>';
		teamTable.innerHTML += /*html*/ `<tr><td>${team}</td><td>${icon}</td></tr>`;
	});
}
