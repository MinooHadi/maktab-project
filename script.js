let days = document.getElementsByClassName("day");
let todo = document.querySelector("ul");

let loggedIn = localStorage.getItem("login-group1");
if (loggedIn) {
  let loginPopup = document.getElementsByClassName("login")[0];
  loginPopup.style.display = "none";
} else {
  document.getElementById("add-btn").disabled = true;
}

let selectedDay;
let globalArray = localStorage.getItem("globalArray");
if (!globalArray) {
  globalArray = [
    { day: "shanbe", task: [] },
    { day: "yekshanbe", task: [] },
    { day: "doshanbe", task: [] },
    { day: "seshanbe", task: [] },
    { day: "chaharshanbe", task: [] },
    { day: "panjshanbe", task: [] },
    { day: "jome", task: [] },
  ];
} else {
  globalArray = JSON.parse(globalArray);
}

function save() {
  localStorage.setItem("globalArray", JSON.stringify(globalArray));
}

function generateId() {
  return Date.now();
}

function deletBorder(elm) {
  for (let i = 0; i < days.length; i++) {
    days[i].classList.remove("active-div");
  }
  elm.classList.add("active-div");
  selectedDay = Number(elm.attributes["data-index"].value);
  todo.innerHTML = "";
  for (let data of globalArray[selectedDay].task) {
    renderData(data);
  }
}

function loginSubmit(event) {
  event.preventDefault();
  let login = {
    userName: document.getElementById("userName").value,
    fullName: document.getElementById("fullName").value,
    phoneNumber: document.getElementById("phoneNumber").value,
  };
  let error = document.getElementById("phoneError");
  if (login.phoneNumber.length === 0) {
    error.innerHTML = "شماره تماس خود را وارد کنید";
    error.style.display = "block";
  } else if (
    11 < login.phoneNumber.length ||
    (11 > login.phoneNumber.length && login.phoneNumber.length !== 0)
  ) {
    error.innerHTML = "شماره تماس خود را به درستی وارد کنید";
    error.style.display = "block";
  } else {
    let loginString = JSON.stringify(login);
    localStorage.setItem("login-group1", loginString);
    let loginPopup = document.getElementsByClassName("login")[0];
    loginPopup.style.display = "none";
    document.getElementById("add-btn").disabled = false;
  }
}

function addTodo(event) {
  if (selectedDay === undefined) {
    return;
  }
  event.preventDefault();
  let liItem = {
    id: generateId(),
    taskName: document.getElementById("taskName").value,
    taskTime: document.getElementById("taskTime").value,
    isDone: false,
  };
  globalArray[selectedDay]["task"].push(liItem);
  save();
  document.getElementById("taskName").value = "";
  document.getElementById("taskTime").value = "";

  renderData(liItem);
}

function renderData(data) {
  let item = document.createElement("li");
  item.id = data.id;

  let taskName = document.createElement("p");
  taskName.innerText = data.taskName;
  if (data.isDone) {
    taskName.classList.add("checked");
    item.classList.add("back");
  }
  item.prepend(taskName);

  let taskTime = document.createElement("div");
  taskTime.innerText = data.taskTime;
  item.append(taskTime);

  let checkBox = document.createElement("input");
  checkBox.type = "checkBox";
  checkBox.checked = data.isDone;
  item.prepend(checkBox);

  let deletIcone = document.createElement("div");
  deletIcone.innerText = "D";
  deletIcone.style.backgroundColor = "red";
  deletIcone.style.marginRight = "50px";
  deletIcone.style.width = "30px";
  deletIcone.style.height = "30px";
  item.append(deletIcone);

  let editIcon = document.createElement("div");
  editIcon.innerText = "E";
  editIcon.style.backgroundColor = "green";
  editIcon.style.marginRight = "60px";
  editIcon.style.width = "30px";
  editIcon.style.height = "30px";
  item.append(editIcon);

  todo.append(item);

  let selected = checkBox.addEventListener("click", (event) => {
    data.isDone = !data.isDone;
    save();
    if (checkBox.checked) {
      taskName.classList.add("checked");
      item.classList.add("back");
    } else {
      taskName.classList.remove("checked");
      item.classList.remove("back");
    }
  });

  let selectDelete = deletIcone.addEventListener("click", (event) => {
    let confirmed = confirm("آیا میخواهید این آیتم حذف شود؟");
    if (confirmed) {
      globalArray[selectedDay].task = globalArray[selectedDay].task.filter(
        (item) => item.id !== data.id
      );
      save();
      todo.removeChild(item);
    }
  });

  let selectEdit = editIcon.addEventListener("click", (event) => {
    let editBox = document.getElementsByClassName("editBox")[0];
    editBox.style.visibility = "visible";
    let editText = document.getElementById("editText");
    editText.value = data.taskName;
    editBox.setAttribute("data-id", data.id);
  });
}

let subBtn = document.getElementById("sub-btn");
let subEdit = subBtn.addEventListener("click", (event) => {
  let editBox = document.getElementsByClassName("editBox")[0];
  let itemId = editBox.getAttribute("data-id");
  let li = document.getElementById(itemId);
  let p = li.getElementsByTagName("p")[0];
  p.innerText = document.getElementById("editText").value;
  editBox.style.visibility = "hidden";
  let array = globalArray[selectedDay].task;
  let result = array.find(arr => arr.id == itemId);
  result.taskName = p.innerText;
  save();
});
