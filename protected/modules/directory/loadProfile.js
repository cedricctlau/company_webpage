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
			`<div class="profile" data-id="${staff_id}" data-name="${name}" data-title="${title}">
					<img class="propic" src=${picture}>
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
				</div>`;
	}
}
