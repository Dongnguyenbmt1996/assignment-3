"use strict";
const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const welcomeMessage = document.getElementById("welcome-message");
const btnLogout = document.getElementById("btn-logout");
const currentUser = getFromStorage("currentUser") || [];
displayHome();

//Hiển thị nội dung trên trang home
function displayHome() {
  //nếu có người dùng đăng nhập thì ẩn loginModal và hiển thị welcome
  if (userActive) {
    loginModal.style.display = "none";
    mainContent.style.display = "block";
    welcomeMessage.textContent = `Welcome ${currentUser.firstName}`;
    //nếu không có người dùng đăng nhập thì hiển thị lại loginMoal và ẩn mainContent
  } else {
    loginModal.style.display = "block";
    mainContent.style.display = "none";
  }
}

//bắt sự kiện nút logout
btnLogout.addEventListener("click", function () {
  const isLogout = confirm("Bạn muốn Loguot chứ?");
  if (isLogout) {
    userActive = null;
    saveToStorage("currentUser", userActive);
    //hiển thị trang Home ở dạng chưa có user
    displayHome();
  }
});
