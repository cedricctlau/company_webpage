export async function hideBtn() {
  const registerBtn = document.querySelector("#register-btn");
  const ANNCtoAllBtn = document.querySelector("#ANNC-to-all-btn");
  const ANNCtoDeptBtn = document.querySelector("#ANNC-to-dept-btn");
  const ANNCtoTeamBtn = document.querySelector("#ANNC-to-DEPT-btn");

  const json = await fetch("/checkPrivilege");
  if (!json.success) {
    alert(
      `Unexpected error occurred when checking privilege!\nPlease refresh the page!\nContact the IT department if this error persists...`
    );
    return;
  }

  const privilege = json.outcome;

  if (!privilege.priv_all) {
    registerBtn.setAttribute("hidden");
    ANNCtoAllBtn.setAttribute("hidden");
  }
  if (!privilege.priv_dept) {
    ANNCtoDeptBtn.setAttribute("hidden");
  }
  if (!privilege.priv_team) {
    ANNCtoTeamBtn.setAttribute("hidden");
  }
}
