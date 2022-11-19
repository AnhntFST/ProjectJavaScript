"use strict";
//khai báo Element
const nameTask = document.getElementById("input-task");
const ulEl = document.getElementById("todo-list");
const btnAdd = document.getElementById("btn-add");
const closeEl = document.querySelectorAll("close");

// Gán owner = current_user để quản lý
const owner = getFromStorage("current_user");

// Mảng todoArr lưu trữ todo list của user
const todoArr = localStorage.getItem(`${owner}_task`)
  ? getFromStorage(`${owner}_task`)
  : [];

// Class task
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}

// Hàm render task

const renderTodo = function (arr) {
  ulEl.innerHTML = "";
  for (const [index, todo] of arr.entries()) {
    const list = document.createElement("li");
    list.innerHTML = `
      <li class="task ${todo.isDone === true ? "checked" : ""}"
    id ="${index}" >${todo.task}<span class="close" id ="${index}">×</span></li>
    `;
    ulEl.appendChild(list);
  }
};

// Hàm reset input
const resetInput = function () {
  nameTask.value = "";
};
// Check input
const checkTask = function () {
  let check = true;
  if (nameTask.value === "") {
    alert("Bạn chưa nhập task mới");
    check = false;
  }
  return check;
};

// xử lý sự kiện nut Add task
btnAdd.addEventListener("click", function () {
  const inputTask = nameTask.value.trim();
  const isDone = false;

  if (checkTask()) {
    const newTask = new Task(inputTask, owner, isDone);
    todoArr.push(newTask); // lưu trữ vào mảng todo list
    saveToStorage(`${owner}_task`, todoArr); // Lưu mảng vào local
    renderTodo(todoArr); // Render task vừa nhập
    resetInput();
  }
});

// Hiển thị todo list của user
document.addEventListener("DOMContentLoaded", function (e) {
  e.preventDefault();
  renderTodo(todoArr);
});

// Xử lý sự kiện click vào để đánh dấu đã hoàn thành hay chưa
ulEl.addEventListener("click", function (e) {
  const checkTask = e.target.closest(".task"); // Chọn element có class ="task"
  if (!checkTask) return; // Nếu không chọn được element thì return, ko báo lỗi.
  let taskClick = +checkTask.getAttribute("id"); // Lấy index của task trong mảng todoArr

  checkTask.classList.toggle("checked"); // Thay đổi style cho task = class "checked"

  checkTask.classList.contains("checked")
    ? (todoArr[taskClick].isDone = true)
    : (todoArr[taskClick].isDone = false);

  saveToStorage(`${owner}_task`, todoArr);
  renderTodo(todoArr);
});

////// Xử lý sự kiện delete task
ulEl.addEventListener("click", function (e) {
  const deleteEL = e.target.closest(".close");
  if (!deleteEL) return;
  let answer = confirm("Are You Sure?");

  if (answer) {
    let deleteTask = +deleteEL.getAttribute("id");
    todoArr.splice(deleteTask, 1);
    saveToStorage(`${owner}_task`, todoArr);
    renderTodo(todoArr);
  }
});
