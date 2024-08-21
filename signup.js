document
  .getElementById("signup-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;

    if (username && password) {
      let users = JSON.parse(localStorage.getItem("users")) || [];

      const userExists = users.some((user) => user.username === username);

      if (userExists) {
        alert("Username already taken. Please choose a different username.");
      } else {
        users.push({ username, password });
        localStorage.setItem("users", JSON.stringify(users));
        alert("Sign up successful! Please log in.");
        document.getElementById("signup-form").reset();
        window.location.href = "form.html";
      }
    } else {
      alert("Please fill in both fields.");
    }
  });
