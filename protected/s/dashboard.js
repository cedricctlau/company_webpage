window.onload(async () => {
  await checkPrivilege();
  await loadAnc();
});

let currentPrivilege = { is_team_head: false, is_hr: false };

async function checkPrivilege() {
  const json = await fetch("/checkPrivilege");
  if (!json.success) {
    alert(
      `Unexpected error occurred when checking privilege!\nPlease refresh the page!\nContact the IT department if this error persists...`
    );
    return;
  }
  currentPrivilege.is_team_head = json.outcome.is_team_head;
  currentPrivilege.is_hr = json.outcome.is_hr;
}

async function showOrHideBtn(privilege) {}

async function loadAnc() {
  const json = await fetch("/getAnnouncement");
  if (!json.success) {
    alert(
      `Unexpected error occurred when fetching announcements!\nPlease refresh the page!\nContact the IT department if this error persists...`
    );
    return;
  }
  const holder = document.querySelector(`#anc-holder`);
  holder.innerHTML = "";
  const ancs = json.outcome.announcements;
  for (const anc of ancs) {
    const { content, creater, modified_at } = anc;
    holder.innerHTML += buildAncDiv(content, creater, modified_at);
  }
}

function buildAncDiv(content, creater, modified_at) {
  return /*html*/ `<div class="anc">
  <div class="content">${content}</div>
  <div class="note">created by ${creater} on ${modified_at}</div>
</div>`;
}
