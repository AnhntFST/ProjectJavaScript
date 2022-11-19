"use strict";
// Khai báo các element
const inputUserNameLg = document.getElementById("input-username");
const inputPassWordLg = document.getElementById("input-password");
const btnLogin = document.getElementById("btn-submit");

// Lấy dữ liệu từ local Storage về
const userArr = localStorage.getItem("array_user")
  ? getFromStorage("array_user")
  : [];

let currentUserName = localStorage.getItem("current_user")
  ? getFromStorage("current_user")
  : [];
// Kiểm tra input
const checkInputLg = function () {
  let check = false;
  if (inputUserNameLg.value === "") alert("Bạn chưa nhập User Name");
  else if (inputPassWordLg.value === "") alert("Bạn chưa nhập PassWord");
  else check = true;
  return check;
};

btnLogin.addEventListener("click", function () {
  if (checkInputLg()) {
    const currentUser = userArr.filter(
      (user) =>
        inputUserNameLg.value === user.userName &&
        inputPassWordLg.value === user.passWord
    );
    console.log(currentUser);
    if (currentUser.length) {
      currentUserName = inputUserNameLg.value;
      saveToStorage("current_user", currentUserName);
      // chuyển sang trang login
      window.location.href = "../index.html";
    } else alert("Kiểm tra lại User và Password");
  }
});
