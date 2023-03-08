document
	.querySelector("#login-btn")
	.addEventListener("click", async (event) => {
		event.preventDefault();
		const username = document.querySelector("#username").value;
		const password = document.querySelector("#password").value;
		const res = await fetch("/login", {
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify({ username, password }),
		});
		const json = await res.json();
		if (!json.success) {
			alert("Unexpected error when logging in!");
			return
		}
		if (json.success && json.message) {
			document.querySelector(".warning").removeAttribute("hidden");
			return;
		}
		window.location.assign("/dashboard.html");
	});
