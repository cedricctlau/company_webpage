export async function viewDetailBtn() {
	const res = await fetch("/getPriv", {
		method: "GET",
		headers: { "Content-type": "application/json" },
	});
	const json = await res.json();
	if (!json.success) {
		alert("Unexpected error!");
		return;
	}
	if (json.outcome.priv.is_admin) return;

	document.querySelectorAll(".btn.admin-only").forEach((btn) => {
		btn.removeAttribute("hidden");
		btn.addEventListener("click", async () => {
			const id = parseInt(btn.dataset.id);
			const res = await fetch("/getProfileSudo", {
				method: "POST",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({ id }),
			});
			const json = await res.json();
			if (!json.success) {
				alert("Unexpected error!");
				return;
			}
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
			document.querySelector("#conf-profile-container").innerHTML =
				/*html*/
				`<section class="box">
						<div class="profile" data-id="${staff_id}">
							<img class="propic" src="${picture}" />
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
					<section class="box">
						<div id="personal-info">
							<div class="disclaimer">
								&lt;This section is confidential&gt;
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
		});
	});
}
