document.querySelector("#login-btn").addEventListener(async (event) => {
  event.preventDefault();
  const username = event.target.username.value;
  const password = event.target.password.value;
  const res = await fetch("/login", {
    method: "POST",
    body: { username, password },
  });
  const json = res.json();
  if (json.success && !json.message) {
    return;
  }
  if (json.success && json.message) {
    event.target.username.value = "";
    event.target.password.value = "";
    return;
  }
});
