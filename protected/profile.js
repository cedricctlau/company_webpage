import { loadNavBar } from "./navbar";
import { resolve } from "path";

window.onload(async () => {
	await loadNavBar(uploadDir);
	await loadPage();
});

const uploadDir = resolve(__dirname + "/" + "../uploads");

async function loadPage() {
	const res = await fetch("/getSelfProfile");
	const json = await res.json();
	const {
		staff_id,
		nickname,
		first_name,
		last_name,
		gender,
		title,
		tel,
		picture,
		username,
		hkid,
		date_of_birth,
		address,
		bank_account,
		monthly_salary,
	} = json.outcome.profile;
	document.querySelector("#profile-container").innerHTML =
		/*html*/
		`<section id="front">
						<div class="profile" data-id="${staff_id}">
							<img class="propic" src="${uploadDir + "/" + picture}" />
							<div class="directory-body">
								<div class="label">Familiar Name</div>
								<div class="content">${nickname}</div>
								<div class="label">First Name</div>
								<div class="content">${first_name}</div>
								<div class="label">Last Name</div>
								<div class="content">${last_name}</div>
								<div class="label">Gender</div>
								<div class="content">${gender}</div>
								<div class="label">Title</div>
								<div class="content">${title}</div>
								<div class="label">Tel</div>
								<div class="content">${tel}</div>
								<div class="label">Email</div>
								<div class="content">${username}</div>
							</div>
						</div>
					</section>
					<section id="back">
						<div id="personal-info">
							<div class="disclaimer">
								&lt;This confidential section is only accessible by HR
								Department&gt;
							</div>
							<div class="label">HKID</div>
							<div class="content">${hkid}</div>
							<div class="label">Date of Birth</div>
							<div class="content">${date_of_birth}</div>
							<div class="label">Address</div>
							<div class="content">
								${address}
							</div>
							<div class="label">Bank Account</div>
							<div class="content">${bank_account}</div>
							<div class="label">Monthly Salary</div>
							<div class="content">${monthly_salary}</div>
						</div>
					</section>`;
}

document.querySelector("#changePW-btn").addEventListener("click", async () => {
	const originalPWDiv = document.querySelector("#originalPW");
	const newPWDiv = document.querySelector("#newPW");
	const newPW2Div = document.querySelector("#newPW2");
	if (newPWDiv !== newPW2Div) {
		alert(`You entered two different password!`);
		originalPWDiv.value = "";
		newPWDiv.value = "";
		newPW2Div.value = "";
		return;
	}
	const oldPW = originalPWDiv.value;
	const newPW = newPWDiv.value;
	const res = await fetch("/changePW", {
		method: "POST",
		headers: { "Content-type": "application/json" },
		body: JSON.stringify({ oldPW, newPW }),
	});
	const json = await res.json();
	if (json.success && json.message === "Wrong PW") {
		alert(`Wrong password!`);
		originalPWDiv.value = "";
		newPWDiv.value = "";
		newPW2Div.value = "";
		return;
	}
	originalPWDiv.value = "";
	newPWDiv.value = "";
	newPW2Div.value = "";
	alert("Password changed!");
});
