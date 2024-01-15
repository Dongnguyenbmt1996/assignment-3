"use strict";
//class user thông tin người dùng
class User {
  constructor(
    firstName,
    lastName,
    userName,
    password,
    pageSize = 5,
    category = "business"
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.password = password;
    this.pageSize = pageSize;
    this.category = category;
  }
}

//class todo task

class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
