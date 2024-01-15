"use strict";
const inputUserName = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const btnSubmit = document.getElementById("btn-submit");

const userArr = getFromStorage("userArr") || [];
console.log(userArr);
//const userArr = JSON.parse(localStorage.getItem("userArr") || []);
//let currentUser = parseUser(getFromStorage("currentUser"), "{}");

// //bắt sự kiện nhấn vào nút submit
btnSubmit.addEventListener("click", function () {
  const isvalidate = validate();

  if (isvalidate) {
    //tìm kiếm user trong userArr
    const user = userArr.find(
      (item) =>
        item.userName === inputUserName.value &&
        item.password === inputPassword.value
    );

    if (user) {
      alert("Đăng nhập thành công!");
      //Lưu thông tin user hiện tại đang đăng nhập trên trang
      saveToStorage("currentUser", user);

      //Chuyển hướng trang chủ
      window.location.assign("../index.html");
    } else {
      alert("Thông tin đăng nhập không đúng!");
    }
  }
});

// //validate dữ liệu nhập vào của người dùng
function validate() {
  let isValidate = true;

  if (inputUserName.value === "") {
    alert("Vui lòng nhập User Name!");
    isValidate = false;
  }
  if (inputPassword.value === "") {
    alert("Vui lòng nhập Password!");
    isValidate = false;
  }

  return isValidate;
}

/////////////////////////////////
