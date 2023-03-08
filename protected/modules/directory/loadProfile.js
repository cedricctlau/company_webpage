export async function loadProfiles() {
	const container = document.querySelector("#profile-container");
	container.innerHTML = "";
	const res = await fetch("/getAllProfiles", {
		method: "GET",
		headers: { "Content-type": "application/json" },
	});
	const json = await res.json();
	const profiles = json.outcome.profiles;
	for (const profile of profiles) {
		const { staff_id, name, gender, title, email, tel, picture } = profile;
		container.innerHTML +=
			/*html*/
			`<div class="box">
				<div class="profile" data-name="${name}" data-title="${title}">
					<div>
						<img class="propic" src=${picture}>
						<button class="admin-only btn btn-outline-danger" data-id="${staff_id}" data-bs-toggle="modal" data-bs-target="#confProfileModal" hidden>View Detail</button>
					</div>
					<div class="profile-body">
						<div class="label">Name</div>
						<div class="content">${name}</div>
						<div class="label">Gender</div>
						<div class="content">${gender}</div>
						<div class="label">Title</div>
						<div class="content">${title}</div>
						<div class="label">Tel</div>
						<div class="content">${tel}</div>
						<div class="label">Email</div>
						<div class="content">${email}</div>
					</div>
				</div>
			</div>`;
	}
}
