export async function loadWelcome() {
	const res = await fetch("/getNickname");
	const json = res.json();
	if (!json.success) {
		alert(
			`Unexpected error occurred when fetching profile!\nPlease refresh the page and try again!\nContact the IT department if this error persists...`
		);
		return;
	}
	const nickname = json.outcome.nickname;
	document.querySelector("#welcome").innerText = `${nickname}`;
}

document.querySelector("#logout-btn").addEventListener("click", async () => {
	alert(`Logout successful!`);
	await fetch("/logout");
});
