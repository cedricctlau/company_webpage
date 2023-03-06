import { loadNavBar } from "./navbar";


window.onload(async () => {
	await loadNavBar();
	showProfiles(allProfiles);
});

const allProfiles = await getAllProfiles();

function showProfiles(profiles) {
	const container = document.querySelector("#directory-container");
	container.innerHTML("");
	for (const profile of profiles) {
		const { staff_id, name, gender, title, email, tel, picture } = profile;
		container.innerHTML +=
			/*html*/
			`<div class="directory" data-id="${staff_id}">
					<img class="propic" src=${uploadDir + picture}>
					<div class="directory-body">
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

async function getAllProfiles() {
	const res = await fetch("/getAllProfiles");
	const json = await res.json();
	return json.outcome.profiles;
}
