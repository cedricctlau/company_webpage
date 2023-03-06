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
			console.log("Backend problem");
		}
		if (json.success && json.message) {
			document.querySelector(".warning").removeAttribute("hidden");
			return;
		}
		console.log(json.outcome.staff);
		window.location("dashboard.html");
	});
