document.querySelector("#changePW-btn").addEventListener("click", async () => {
	const oldPWDiv = document.querySelector("#oldPW");
	const newPWDiv = document.querySelector("#newPW");
	const newPW2Div = document.querySelector("#newPW2");
	if (newPWDiv.value !== newPW2Div.value) {
		alert(`You entered two different password!`);
		oldPWDiv.value = "";
		newPWDiv.value = "";
		newPW2Div.value = "";
		return;
	}
	const oldPW = oldPWDiv.value;
	const newPW = newPWDiv.value;
	console.log({ oldPW, newPW });
	const res = await fetch("/changePW", {
		method: "PUT",
		headers: { "Content-type": "application/json" },
		body: JSON.stringify({ oldPW, newPW }),
	});
	const json = await res.json();
	if (!json.success) {
		alert("Unexpected error occurred when change password.");
		return;
	}
	if (json.success && json.message === "Wrong PW") {
		alert(`Wrong current password!`);
		oldPWDiv.value = "";
		newPWDiv.value = "";
		newPW2Div.value = "";
		return;
	}
	oldPWDiv.value = "";
	newPWDiv.value = "";
	newPW2Div.value = "";
	alert("Password changed!");
	document.querySelector("#close-modal-btn").click();
});
