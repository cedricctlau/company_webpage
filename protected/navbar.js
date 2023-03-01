export async function hideBtn() {
	const registerBtn = document.querySelector("#register-btn");
	const ANNCtoAllBtn = document.querySelector("#ANNC-to-all-btn");
	const ANNCtoDEPTBtn = document.querySelector("#ANNC-to-DEPT-btn");

	const json = await fetch("/checkPrivilege");
	if (!json.success) {
		alert(
			`Unexpected error occurred when checking privilege!\nPlease refresh the page!\nContact the IT department if this error persists...`
		);
		return;
	}

	const privilege = json.outcome;

	if (!privilege.is_hr) {
		registerBtn.setAttribute("hidden");
		ANNCtoAllBtn.setAttribute("hidden");
	}
	if (!privilege.is_team_head) {
		ANNCtoDEPTBtn.setAttribute("hidden");
	}
}
