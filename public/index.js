document
	.querySelector("#login-btn")
	.addEventListener("click", async (event) => {
		event.preventDefault();
		const username = document.querySelector("#username").value;
		const password = document.querySelector("#password").value;
		const res = await fetch("/login", {
			method: "POST",
			body: { username, password },
		});
		const json = res.json();
		if (json.success && !json.message) {
			console.log("wrong!!!");
			return;
		}
		if (json.success && json.message) {
			document.querySelector("#username").value = "";
			document.querySelector("#password").value = "";
			return;
		}
	});
