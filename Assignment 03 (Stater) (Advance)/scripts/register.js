"use strict";
// Tạo class User
class User {
  constructor(fistName, lastName, userName, passWord) {
    this.fistName = fistName;
    this.lastName = lastName;
    this.userName = userName;
    this.passWord = passWord;
  }
}

const userArr = localStorage.getItem("array_user")
  ? getFromStorage("array_user")
  : [];

// Khai báo element nhận dữ liệu input
const inputFirstNameEl = document.getElementById("input-firstname");
const inputLastNameEl = document.getElementById("input-lastname");
const inputUserNameEl = document.getElementById("input-username");
const inputPassWordEl = document.getElementById("input-password");
const inputPassConfirmEl = document.getElementById("input-password-confirm");
const btnRegister = document.getElementById("btn-submit");

// Check dữ liệu nhập vào
const checkInput = function () {
  let check = false;
  if (inputFirstNameEl.value === "") alert("Chưa nhập first name");
  else if (inputLastNameEl.value === "") alert("Chưa nhập last name");
  else if (inputUserNameEl.value === "") alert("Chưa nhập User name");
  else if (inputPassWordEl.value === "" || inputPassWordEl.value.length < 8)
    alert("Password phải nhiều hơn 8 ký tự");
  else if (inputPassConfirmEl.value !== inputPassWordEl.value)
    alert("PassWord Confirm phải trùng với password bên trên");
  else check = true;
  return check;
};
// Kiểm tra ID trùng nhau:
const checkID = function (arr) {
  const userCheck = true;
  for (const user of arr) {
    if (user.userName === inputUserNameEl.value) {
      alert("User đã tồn tại");
      userCheck = false;
      break;
    }
  }
  return userCheck;
};

////////// Tạo sự kiện trên nút Register
btnRegister.addEventListener("click", function () {
  // Lấy dữ liệu nhập vào từ form
  const firstName = inputFirstNameEl.value;
  const lastName = inputLastNameEl.value;
  const userName = inputUserNameEl.value;
  const passWord = inputPassWordEl.value;

  // validate input
  const validate = checkInput() && checkID(userArr);
  if (validate) {
    const user = new User(firstName, lastName, userName, passWord);
    userArr.push(user);
    saveToStorage("array_user", userArr);
  }
  // chuyển sang trang login
  window.location.href = "../pages/login.html";
});
