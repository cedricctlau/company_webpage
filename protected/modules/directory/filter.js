document.querySelector("#filter-by-name").addEventListener("keyup", filter);

document.querySelector("#filter-by-title").addEventListener("change", filter);

function filter() {
	const nameFilter = document
		.querySelector("#filter-by-name")
		.value.toLowerCase();
	const titleFilter = document
		.querySelector("#filter-by-title")
		.value.toLowerCase();
	const profileNodes = document.querySelectorAll(".profile");

	for (const node of profileNodes) {
		const name = node.dataset.name.toLowerCase();
		const title = node.dataset.title.toLowerCase();
		const checkName = nameFilter ? name.includes(nameFilter) : true;
		const checkTitle = titleFilter ? title.includes(titleFilter) : true;
		if (checkName && checkTitle) {
			node.style.display = "";
		} else {
			node.style.display = "none";
		}
	}
}

export async function regTitleSelect() {
	const res = await fetch("/getAllTitles", {
		method: "GET",
		headers: { "Content-type": "application/json" },
	});
	const json = await res.json();
	if (!json.success) {
		alert(`Error`);
		return;
	}
	const titles = json.outcome.titles;

	const select = document.querySelector("#filter-by-title");
	select.innerHTML = /*html*/ `<option value="" disabled selected hidden>Search with Staff Title</option><option value="">All Titles</option>`;
	titles.forEach((title) => {
		select.innerHTML += /*html*/ `<option value="${title}">${title}</option>`;
	});
}
