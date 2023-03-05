export default async function loadNavBar(uploadDir) {
	await loadWelcome(uploadDir);
	await loadWeather();
	regLogoutBtn();
	adminPortal();
}

async function loadWelcome(uploadDir) {
	const res = await fetch("/getProfile");
	const json = res.json();
	if (!json.success) {
		alert(
			`Unexpected error occurred when fetching profile!\nPlease refresh the page and try again!\nContact the IT department if this error persists...`
		);
		return;
	}
	const { username, nickname, picture } = json.outcome.profile;
	document.querySelector(
		"#welcome"
	).innerHTML = /*html*/ `<div><img id="icon" src="${uploadDir}/${picture}" /></div><div id="mini-profile">${nickname} (${username})</div>`;
}

async function loadWeather() {
	const res = await fetch(
		"https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en"
	);
	const json = await res.json();

	const temperature =
		json.temperature.data.filter(
			(d) => d.place === "Tsuen Wan Shing Mun Valley"
		)[0].value + "°C";
	const humidity = json.humidity.data[0].value + "%";
	const rainfall =
		json.rainfall.data.filter((d) => d.place === "Tsuen Wan")[0].max + "mm";
	const messages = json.warningMessage;

	const td_temperature = /*html*/ `<td><tr>Temperature:</tr><tr>${temperature}</tr></td>`;
	const td_humidity = /*html*/ `<td><tr>Humidity:</tr><tr>${humidity}</tr></td>`;
	const td_rainfall = /*html*/ `<td><tr>Rainfall:</tr><tr>${rainfall}</tr></td>`;

	let td_warningMessage = "";
	if (!messages) {
		td_warningMessage = /*html*/ `<tr><td>Warning Message:</td><td>none</td></tr>`;
	} else {
		td_warningMessage += /*html*/ `<tr><td colspan="2">Warning Message:</td></tr><tr><td colspan="2"><ul>`;
		for (const message of messages) {
			td_warningMessage += /*html*/ `<li>${message}</li>`;
		}
		td_warningMessage += /*html*/ `</ul></td></tr>`;
	}

	document.querySelector("#weather-dropdown").innerHTML =
		td_temperature + td_humidity + td_rainfall + td_warningMessage;
}

function regLogoutBtn() {
	document.querySelector("#logout-btn").addEventListener("click", async () => {
		alert(`Logout successful!`);
		await fetch("/logout");
	});
}

async function adminPortal() {
	const res = await fetch("/getPriv");
	const json = await res.json();
	const check = json.outcome.priv.priv_all;
	if (!check) {
		document
			.querySelectorAll(".admin")
			.forEach((element) => element.classList.add("disabled"));
	}
}
