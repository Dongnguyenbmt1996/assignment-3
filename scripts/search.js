"use strict";
const currentUser = getFromStorage("currentUser") || [];
const API_KEY = "97daa8e29fd8417f930e78cfe680ce09";

if (currentUser) {
  const navPageNum = document.getElementById("nav-page-num");
  const inputQuery = document.getElementById("input-query");
  const btnSubmit = document.getElementById("btn-submit");

  const newsContainer = document.getElementById("news-container");
  const btnPrev = document.getElementById("btn-prev");
  const pageNum = document.getElementById("page-num");
  const btnNext = document.getElementById("btn-next");

  let currentPage = 1;
  let totalResults = 0;
  let keywords = "";
  navPageNum.style.display = "none";

  btnSubmit.addEventListener("click", function () {
    currentPage = 1;
    pageNum.textContent = "1";
    newsContainer.innerHTML = "";

    //kiểm tra người dùng nhập keyword chưa
    if (inputQuery.value.trim().length === 0) {
      navPageNum.style.display = "none";
      alert("Vui lòng nhập keyword để tìm kiếm");
    } else {
      keywords = inputQuery.value;
      getDataNewsByKeywords(keywords, 1);
    }
  });

  // hàm lấy dữ liệu từ API
  async function getDataNewsByKeywords(keywords, page) {
    try {
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${keywords}&sortBy=relevancy&pageSize=${currentUser.pageSize}&page=${page}&apiKey=${API_KEY}`
      );
      const data = await res.json();

      // Thông báo lỗi khi không có bài viết
      if (data.totalResults == 0) {
        navPageNum.style.display = "none";
        throw new Error("Không có bài viết");
      }
      navPageNum.style.display = "block";
      //hiển thị news
      displayNewList(data);
    } catch (err) {
      alert(err.message);
    }
  }

  // Hiển thị thông tin lên trang
  function displayNewList(data) {
    const newsContainer = document.getElementById("news-container");
    let html = "";
    data.articles.forEach(function (article) {
      html += `<div class="card flex-row flex-wrap">
    <div class="card mb-3" style="">
        <div class="row no-gutters">
            <div class="col-md-4">
                <img src="${article.urlToImage}"  class="card-img" alt="${article.title}">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${article.title}</h5>
                    <p class="card-text">${article.description}</p>
                    <a href="${article.url}" target="_blank" class="btn btn-primary">View</a>
                </div>
            </div>
        </div>
    </div>
</div>`;
    });
    newsContainer.innerHTML = html;

    totalResults = data.totalResults;
    checkBtnPrev(currentPage);
    checkBtnNext(currentPage);
  }

  // sự kiến nhấn nút next và prev
  btnPrev.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      getDataNewsByKeywords(keywords, currentPage);
    }
  });

  btnNext.addEventListener("click", function () {
    const pageSize = currentUser.pageSize || 10;
    if (currentPage * pageSize < totalResults) {
      currentPage++;
      getDataNewsByKeywords(keywords, currentPage);
    }
  });

  // Kiểm tra điều kiện ấn vào nút previous
  function checkBtnPrev(page) {
    if (page === 1) {
      btnPrev.style.display = "none";
    } else {
      btnPrev.style.display = "block";
    }
  }

  // Kiểm tra điều kiện ấn vào nút next
  function checkBtnNext(page) {
    const pageSize = currentUser.pageSize || 10;
    if (page * pageSize >= totalResults) {
      btnNext.style.display = "none";
    } else {
      btnNext.style.display = "block";
    }
  }
} else {
  alert("Vui lòng đăng nhập");
  window.location.assign("../index.html");
}
