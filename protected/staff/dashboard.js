import { hideBtn } from "../navbar";

window.onload(async () => {
  await hideBtn();
  await loadAnc();
});

async function loadAnc() {
  const json = await fetch("/getAnnouncement");
  if (!json.success) {
    alert(
      `Unexpected error occurred when fetching announcements!\nPlease refresh the page!\nContact the IT department if this error persists...`
    );
    return;
  }
  const holder = document.querySelector(`#ancmt-holder`);
  holder.innerHTML = "";
  const ANNCs = json.outcome.announcements;
  for (const ANNC of ANNCs) {
    const {
      id,
      content,
      creator,
      updated_at,
      is_public,
      dept_ancmt,
      team_ancmt,
      owned,
    } = ANNC;
    let style;
    if (is_public) {
      style = `btn-outline-danger`;
    } else if (dept_ancmt) {
      style = `btn-outline-success`;
    } else if (team_ancmt) {
      style = `btn-outline-secondary`;
    }
    holder.innerHTML += /*html*/ `<div class="ancmt btn ${style}" data-id="${id}" data-owned="${owned}"><div class="content">${content}</div><div class="note">created by ${creator} on ${updated_at}</div></div>`;
  }
}
