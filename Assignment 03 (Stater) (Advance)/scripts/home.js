"use strict";
// Khai báo elelment
const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const welcomeMessage = document.getElementById("welcome-message");
const btnLogOut = document.getElementById("btn-logout");

const currentUserName = localStorage.getItem("current_user")
  ? getFromStorage("current_user")
  : [];

// Nếu login thì loginModal ẩn và mainConten hiện
if (currentUserName.length) {
  loginModal.classList.add("hidden");
  welcomeMessage.textContent = `Welcome ${currentUserName}`;
} else {
  loginModal.classList.remove("hidden");
  mainContent.classList.add("hidden");
}

// Xử lý sự kiện nut LogOut
btnLogOut.addEventListener("click", function () {
  removeFromStorage("current_user");
  // chuyển sang trang login
  window.location.href = "../pages/login.html";
});
