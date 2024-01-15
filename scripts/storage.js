"use strict";

//Hàm lấy dữ liệu
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

//Hàm lưu dữ liệu
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
//lấy dữ liệu userArr từ localstorage
//const users = getFromStorage("userArr") ? getFromStorage("userArr") : [];
//chuyển đổi về dạng class instance
//const userArr = users.map((user) => parseUser(user));

// lấy dữ liệu user đang đăng nhập
let userActive = getFromStorage("currentUser")
  ? parseUser(getFromStorage("currentUser"))
  : null;

//hàm chuyển từ js object sang class intance
function parseUser(userData) {
  const user = new User(
    userData.firstname,
    userData.lastname,
    userData.username,
    userData.password,
    userData.pageSize,
    userData.category
  );

  return User;
}

//lấy dữ liệu todoArr từ localStorage
//const todos = getFromStorage("todoArr") ? getFromStorage("todoArr") : [];
//chuyển đổi về dạng class instance
//const todoArr = todos.map((todo) => parseTask(todo));
//hàm chuyển đổi từ js object sang class instance
function parseTask(taskData) {
  const task = new Task(taskData.task, taskData.owner, taskData.isDone);
  return task;
}
