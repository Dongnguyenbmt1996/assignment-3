"use strict";

const currentUser = getFromStorage("currentUser");

if (currentUser) {
  const inputPageSize = document.getElementById("input-page-size");
  const inputCategory = document.getElementById("input-category");
  const btnSubmit = document.getElementById("btn-submit");

  // Sự kiện nhấn vào nút submit
  btnSubmit.addEventListener("click", function () {
    if (validate()) {
      // Cập nhật lại currentUser
      currentUser.pageSize = Number.parseInt(inputPageSize.value);
      currentUser.category = inputCategory.value;
      saveToStorage("currentUser", currentUser);

      // Cập nhật cài đặt và hiển thị trên trang
      updateSettings();
      displaySettings();

      // Reset lại form
      alert("Cài đặt thành công");
      inputPageSize.value = "";
      inputCategory.value = "General";
    }
  });

  // Hàm validate dữ liệu
  function validate() {
    let isValidate = true;

    // Kiểm tra inputPageSize
    if (Number.isNaN(Number.parseInt(inputPageSize.value))) {
      alert("Số lượng tin không hợp lệ");
      isValidate = false;
    }

    // Kiểm tra inputCategory
    if (inputCategory.value === "") {
      alert("Vui lòng chọn thể loại");
      isValidate = false;
    }

    return isValidate;
  }

  // Hàm cập nhật cài đặt
  function updateSettings() {
    const settings = getFromStorage("settings");

    if (settings) {
      settings.newsPerPage = currentUser.pageSize;
      settings.newsCategory = currentUser.category;
      saveToStorage("settings", settings);
    }
  }

  // Hàm hiển thị cài đặt
  function displaySettings() {
    const settings = getFromStorage("settings");

    if (settings) {
      inputPageSize.value = settings.newsPerPage;
      inputCategory.value = settings.newsCategory;
    }
  }

  // Gọi hàm hiển thị cài đặt ban đầu
  displaySettings();
} else {
  alert("Vui lòng đăng nhập");
  window.location.assign("../index.html");
}
