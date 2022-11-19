"use strict";
// Khai báo Element
const tableBodyEl = document.getElementById("tbody");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const pageNumber = document.getElementById("page-num");

// Khai báo element tìm kiếm
const searchEl = document.getElementById("input-news");
const btnSearch = document.getElementById("btn-search");

// Lấy user
const userActive = getFromStorage("current_user");
// Lấy data setting từ localStorage
const setting = getFromStorage("setting_news");

// const country = "us"; // tin tức của nước united state
// let category = setting.catelo; // Loại tin tức (business, entertainment, general, health,science, sports, technology)
let titleSeach;
let pageSize = setting.pps; // Số tin tức / 1 page
let page; // Số trang dựa trên pageSize
let maxPage; // Số lượng tin tức trên API

// Hàm tạo bảo thông tin
const renderNews = function (arrNews) {
  tableBodyEl.innerHTML = "";
  for (const news of arrNews) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td style="width: 33%"><img id="imgNews"
    src=${news.urlToImage},
    alt=${news.description}
  /></td>
    <td style="width: 67%; padding-left: 10px;" ><strong><span>${news.title}</span></strong> <br>
    <span>${news.description}</span> <br>
    <span)><button onclick="location.href='${news.url}';" type="button" class="btn-view" style="margin-top: 10px">View</button></span>
    </td>
    `;
    tableBodyEl.appendChild(row);
  }
};

// Hàm lấy dữ liệu từ API
const getNews = async function (titleSeach, pageSize, page) {
  try {
    const news = await fetch(
      `https://newsapi.org/v2/top-headlines?q=${titleSeach}&pageSize=${pageSize}&page=${page}&apiKey=b4b20c32d155460585916fd8d2d588ac`
    );
    if (!news.ok) throw new Error("Problem from newsapi 💥💥💥");

    const data = await news.json();
    console.log(data);
    const newsLength = data.totalResults;
    maxPage = newsLength / pageSize;
    // hiển thị news
    renderNews(data.articles);
  } catch (err) {
    console.error(`${err}`);
  }
};
// check input nếu người dùng chưa nhập
const checkInput = function () {
  let check = true;
  if (searchEl.value.trim() === "") {
    alert("Bạn chưa nhập nội dung tìm kiếm");
    check = false;
  } else check = true;
  return check;
};

// Xử lý sự kiện nút Search
btnSearch.addEventListener("click", function (e) {
  e.preventDefault();
  if (checkInput()) {
    titleSeach = searchEl.value;
    getNews(titleSeach, pageSize, currentPage);
  }
  searchEl.value = "";
});

let currentPage = 1;

document.addEventListener("DOMContentLoaded", function (e) {
  e.preventDefault();
  if (userActive) {
    getNews(titleSeach, pageSize, currentPage);
  } else {
    btnNext.classList.remove("hidden");
    btnPrev.classList.remove("hidden");
  }
});

if (currentPage === 1) {
  btnPrev.classList.add("hidden");
}

// Xử lý nút Next
btnNext.addEventListener("click", function (e) {
  e.preventDefault();
  if (currentPage < maxPage) {
    // Ẩn hiện nút preview
    ++currentPage;
    if (currentPage > 1) {
      btnPrev.classList.remove("hidden");
      pageNumber.textContent = currentPage;
    }

    getNews(titleSeach, pageSize, currentPage);
  }
});

// Xử lý nút Preview
btnPrev.addEventListener("click", function (e) {
  btnNext.classList.remove("hidden");
  // Ẩn hiện nút preview
  if (currentPage > 1) {
    currentPage -= 1;
    if (currentPage === 1) {
      btnPrev.classList.add("hidden");
    }
    pageNumber.textContent = currentPage;
    getNews(titleSeach, pageSize, currentPage);
  }
});
