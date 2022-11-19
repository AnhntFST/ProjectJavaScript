"use strict";

// Khai báo element
const inputPageSizeEl = document.getElementById("input-page-size");
const inputCategoryEl = document.getElementById("input-category");
const btnSubmit = document.getElementById("btn-submit");

// const settingArr = [];

// check input
const checkInput = function () {
  let check = false;
  if (
    inputPageSizeEl.value === "" ||
    inputPageSizeEl.value > 100 ||
    inputPageSizeEl.value < 0
  ) {
    alert("Nhập giá trị News Per Page từ 1 - 100 ");
  } else check = true;

  return check;
};

// Sự kiện trên nút Save Setting
btnSubmit.addEventListener("click", function () {
  const setting = {
    pps: +inputPageSizeEl.value,
    catelo: inputCategoryEl.value.toLowerCase(),
  };

  if (checkInput()) {
    // settingArr.push(setting);
    saveToStorage("setting_news", setting);
  }
});
