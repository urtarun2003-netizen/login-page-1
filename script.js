const password = document.getElementById("password");
const showPassword = document.getElementById("showPassword");
const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

showPassword.addEventListener("click", function () {
  if (password.type === "password") {
    password.type = "text";
    showPassword.textContent = "Hide";
  } else {
    password.type = "password";
    showPassword.textContent = "Show";
  }
});

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  message.textContent = "Login button clicked successfully.";
  message.style.color = "green";
});
