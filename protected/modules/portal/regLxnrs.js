export function regLxnrs() {
	document
		.querySelector("#register")
		.addEventListener("submit", async (event) => {
			event.preventDefault();

			const formData = new FormData(event.target);

			const nickname = formData.get("nickname");
			const first_name = formData.get("first_name");
			const last_name = formData.get("last_name");
			const res1 = await fetch("/genAcc", {
				method: "POST",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({ nickname, first_name, last_name }),
			});
			const json1 = await res1.json();
			if (!json1.success) {
				alert("Unexpected error!");
				return;
			}

			const email = json1.outcome.email;
			const password = json1.outcome.password;
			formData.append("username", email);
			formData.append("password", password);
			const res2 = await fetch("/abbr", { method: "POST", body: formData });
			const json2 = await res2.json();
			console.log(json2);
		});
}
