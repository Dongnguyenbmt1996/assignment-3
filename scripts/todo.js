"use strict";

// Select các Element
const todoList = document.getElementById("todo-list");
const inputTask = document.getElementById("input-task");
const btnAdd = document.getElementById("btn-add");
const todoArr = getFromStorage("todoArr", "[]");
const currentUser = getFromStorage("currentUser") || [];

if (currentUser) {
  displayTodoList();

  //hiển thị thông tin todo list
  function displayTodoList() {
    let html = "";
    todoList.innerHTML = "";
    todoArr
      .filter((todo) => todo.owner === currentUser.userName)
      .forEach(function (todo, index) {
        const listItem = document.createElement("li");
        listItem.className = todo.isDone ? "checked" : "";
        listItem.textContent = todo.task;
        listItem.addEventListener("click", function () {
          listItem.classList.toggle("checked");
          todo.isDone = !todo.isDone;
          saveToStorage("todoArr", todoArr);
        });

        const closeBtn = document.createElement("span");
        closeBtn.className = "close";
        closeBtn.textContent = "×";
        closeBtn.addEventListener("click", function (event) {
          event.stopPropagation();
          deleteTask(index);
        });

        listItem.appendChild(closeBtn);
        todoList.appendChild(listItem);
      });
  }

  //bắt sự kiện add thêm task
  btnAdd.addEventListener("click", function () {
    //kiểm tra nội dung nhập
    if (inputTask.value.trim().length === 0) {
      alert("Vui lòng nhập Task!");
    } else {
      const todo = new Task(inputTask.value, currentUser.userName, false);
      //thêm task mới vào mảng todoArr
      todoArr.push(todo);
      //lưu dữ liệu xuống localStorage
      saveToStorage("todoArr", todoArr);
      // hiển thị lại list nhiệm vụ
      displayTodoList();
      //reset dữ liệu form nhập
      inputTask.value = "";
    }
  });

  // Xóa task
  function deleteTask(index) {
    if (confirm("Bạn có chắc chắn muốn xoá Task này?")) {
      todoArr.splice(index, 1);
    }
    saveToStorage("todoArr", todoArr);
    displayTodoList();
  }
} else {
  alert("Vui lòng đăng nhập");
  window.location.assign("../index.html");
}

////////////////////////// chi tiết

// if (currentUser) {
//   displayTodoList();

//   // Hiển thị thông tin todo list
//   function displayTodoList() {
//     let html = "";
//     todoList.innerHTML = "";
//     todoArr
//       .filter((todo) => todo.owner === currentUser.username)
//       .forEach(function (todo, index) {
//         const listItem = createListItem(todo);
//         todoList.appendChild(listItem);
//       });
//   }

//   // Tạo một phần tử li cho mỗi task
//   function createListItem(todo) {
//     const listItem = document.createElement("li");
//     listItem.className = todo.isDone ? "checked" : "";
//     listItem.textContent = todo.task;
//     listItem.addEventListener("click", function () {
//       toggleTaskStatus(listItem, todo);
//       saveToStorage("todoArr", todoArr);
//     });

//     const closeBtn = createCloseButton(index);
//     listItem.appendChild(closeBtn);

//     return listItem;
//   }

//   // Tạo một nút đóng cho mỗi task
//   function createCloseButton(index) {
//     const closeBtn = document.createElement("span");
//     closeBtn.className = "close";
//     closeBtn.textContent = "×";
//     closeBtn.addEventListener("click", function (event) {
//       event.stopPropagation();
//       deleteTask(index);
//     });

//     return closeBtn;
//   }

//   // Chuyển đổi trạng thái hoàn thành của task
//   function toggleTaskStatus(listItem, todo) {
//     listItem.classList.toggle("checked");
//     todo.isDone = !todo.isDone;
//   }

//   // Bắt sự kiện thêm task
//   btnAdd.addEventListener("click", function () {
//     // Kiểm tra nội dung nhập
//     if (inputTask.value.trim().length === 0) {
//       alert("Vui lòng nhập Task!");
//     } else {
//       const todo = new Task(inputTask.value, currentUser.username, false);
//       todoArr.push(todo);
//       saveToStorage("todoArr", todoArr);
//       displayTodoList();
//       inputTask.value = "";
//     }
//   });

//   // Xóa task
//   function deleteTask(index) {
//     todoArr.splice(index, 1);
//     saveToStorage("todoArr", todoArr);
//     displayTodoList();
//   }
// } else {
//   alert("Vui lòng đăng nhập");
//   window.location.assign("../index.html");
// }
