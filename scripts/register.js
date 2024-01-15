"use strict";
const inputFirstName = document.getElementById("input-firstname");
const inputLastName = document.getElementById("input-lastname");
const inputUserName = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const inputConfirmPassword = document.getElementById("input-password-confirm");
const btnSubmit = document.getElementById("btn-submit");

///lấy dữ liệu từ localstorage
// const key = "USER_ARRAY";
const userArr = getFromStorage("userArr") || [];

/////sự kiện nhấn vào nút register
btnSubmit.addEventListener("click", function () {
  //lấy dữ liệu người dùng
  const user = new User(
    inputFirstName.value,
    inputLastName.value,
    inputUserName.value,
    inputPassword.value
  );
  //check validate
  const isValidate = validate(user);
  if (isValidate) {
    //thêm user vào mảng userArr
    userArr.push(user);
    //lưu dữ liệu xuống localStorage
    localStorage.setItem("userArr", JSON.stringify(userArr));

    saveToStorage("userArr", userArr);
    alert("Đăng ký thành công!");
    //điều hứng sang trang login
    window.location.href = "../pages/login.html";
  }
});

//hàm validate thông tin đăng ký của người dùng
function validate(user) {
  let isValidate = true;
  //1. không có trường nào bị bỏ trống
  if (user.firstName === "") {
    alert("Không để trống First Name nhé!");
    isValidate = false;
  }

  if (user.lastName === "") {
    alert("Không để trống Last Name nhé!");
    isValidate = false;
  }

  if (user.userName === "") {
    alert("Không để trống User Name nhé!");
    isValidate = false;
  }

  if (user.password === "") {
    alert("Vui lòng nhập Password!");
    isValidate = false;
  }

  if (inputConfirmPassword.value === "") {
    alert("Vui lòng nhập Confirm Password!");
    isValidate = false;
  }

  //2. username không được trùng lặp
  for (let i = 0; i < userArr.length; i++) {
    if (userArr[i].userName === user.userName) {
      alert("User Name đã tồn tại!");
      isValidate = false;
    }
  }

  //3. confirm password phải giống password
  if (user.password !== inputConfirmPassword.value) {
    alert("Password và Confrim Password phải giống nhau!");
    isValidate = false;
  }

  //4. Password phải có ít nhất 8 ký tự
  if (user.password.length <= 8) {
    alert("Password phải có ít nhất 8 ký tự!");
    isValidate = false;
  }
  return isValidate;
}
