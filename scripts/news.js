"use strict";

const currentUser = getFromStorage("currentUser") || [];
const API_KEY = "97daa8e29fd8417f930e78cfe680ce09";
const url = "https://newsapi.org/v2/top-headlines?country=";
const pageSize = currentUser.pageSize || 5;
const category = currentUser.category || "business";
let pageNumber = 1;
let totalResults = 0; // Thêm biến totalResults và đặt giá trị ban đầu là 0
const pageNumberElement = document.getElementById("page-num");
const btnNext = document.getElementById("btn-next");
const btnPrev = document.getElementById("btn-prev");

window.addEventListener("load", () => {
  getDataNews("us", pageNumber);
});

// Lấy dữ liệu từ API
async function getDataNews(country, page) {
  try {
    const res = await fetch(
      `${url}${country}&page=${page}&pageSize=${pageSize}&category=${category}&apiKey=${API_KEY}`
    );
    const data = await res.json();
    console.log(data);
    totalResults = data.totalResults; // Cập nhật giá trị totalResults
    displayNewList(data);
    checkBtnNext(page);
    checkBtnPrev(page);
  } catch (err) {
    alert("Error: " + err.message);
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
}

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
  if (page * Number(pageSize) >= totalResults) {
    btnNext.style.display = "none";
  } else {
    btnNext.style.display = "block";
  }
}

// Bắt sự kiện click vào nút prev
btnPrev.addEventListener("click", function () {
  pageNumber--;
  pageNumberElement.textContent = pageNumber;
  checkBtnPrev(pageNumber);
  checkBtnNext(pageNumber);
  getDataNews("us", pageNumber);
});

// Bắt sự kiện click vào nút next
btnNext.addEventListener("click", function () {
  pageNumber++;
  pageNumberElement.textContent = pageNumber;
  checkBtnPrev(pageNumber);
  checkBtnNext(pageNumber);
  getDataNews("us", pageNumber);
});

// "use strict";

// const currentUser = getFromStorage("currentUser") || {};
// const API_KEY = "97daa8e29fd8417f930e78cfe680ce09";
// const url = "https://newsapi.org/v2/top-headlines?country=";
// const pageNumberElement = document.getElementById("page-num");
// const btnNext = document.getElementById("btn-next");
// const btnPrev = document.getElementById("btn-prev");

// let pageNumber = 1;
// let totalResults = 0;
// let pageSize = currentUser.pageSize || 10; // Sử dụng giá trị mặc định nếu currentUser không có pageSize
// let category = currentUser.category || "general"; // Sử dụng giá trị mặc định nếu currentUser không có category

// window.addEventListener("load", () => {
//   getDataNews("us", pageNumber);
// });

// // Lấy dữ liệu từ API
// async function getDataNews(country, page) {
//   try {
//     const res = await fetch(
//       `${url}${country}&page=${page}&pageSize=${pageSize}&category=${category}&apiKey=${API_KEY}`
//     );
//     const data = await res.json();
//     console.log(data);
//     if (data.status === "ok") {
//       totalResults = data.totalResults;
//       displayNewList(data);
//       checkBtnNext(page);
//       checkBtnPrev(page);
//     } else {
//       throw new Error(data.message);
//     }
//   } catch (err) {
//     alert("Error: " + err.message);
//   }
// }

// // Hiển thị thông tin lên trang
// function displayNewList(data) {
//   const newsContainer = document.getElementById("news-container");
//   let html = "";
//   data.articles.forEach(function (article) {
//     html += `<div class="card flex-row flex-wrap">
//       <div class="card mb-3" style="">
//           <div class="row no-gutters">
//               <div class="col-md-4">
//                   <img src="${article.urlToImage}"  class="card-img" alt="${article.title}">
//               </div>
//               <div class="col-md-8">
//                   <div class="card-body">
//                       <h5 class="card-title">${article.title}</h5>
//                       <p class="card-text">${article.description}</p>
//                       <a href="${article.url}" target="_blank" class="btn btn-primary">View</a>
//                   </div>
//               </div>
//           </div>
//       </div>
//   </div>`;
//   });
//   newsContainer.innerHTML = html;
// }

// // Kiểm tra điều kiện ấn vào nút previous
// function checkBtnPrev(page) {
//   if (page === 1) {
//     btnPrev.style.display = "none";
//   } else {
//     btnPrev.style.display = "block";
//   }
// }

// // Kiểm tra điều kiện ấn vào nút next
// function checkBtnNext(page) {
//   if (page * pageSize >= totalResults) {
//     btnNext.style.display = "none";
//   } else {
//     btnNext.style.display = "block";
//   }
// }

// // Bắt sự kiện click vào nút prev
// btnPrev.addEventListener("click", function () {
//   if (pageNumber > 1) {
//     pageNumber--;
//     pageNumberElement.textContent = pageNumber;
//     checkBtnPrev(pageNumber);
//     checkBtnNext(pageNumber);
//     getDataNews("us", pageNumber);
//   }
// });

// // Bắt sự kiện click vào nút next
// btnNext.addEventListener("click", function () {
//   if (pageNumber * pageSize < totalResults) {
//     pageNumber++;
//     pageNumberElement.textContent = pageNumber;
//     checkBtnPrev(pageNumber);
//     checkBtnNext(pageNumber);
//     getDataNews("us", pageNumber);
//   }
// });
