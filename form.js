
document.getElementById("login-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    localStorage.setItem("loggedInUser", username);
    window.location.href = "index.html";
  } else {
    alert("Incorrect username or password");
  }
});
