let day = document.getElementsByClassName("day");
// console.log(day);

function deletBorder(elm) {
  // console.log(elm);
  for (let i = 0; i < day.length; i++) {
    day[i].classList.remove("active-div");
  }
  elm.classList.add("active-div");
}

// let addButton = document.getElementById("add-btn");
// function addTodo(){

// }

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
    localStorage.setItem("login", loginString);
  }
}

let todo = document.querySelector("ul");
function addTodo(event) {
  event.preventDefault();
  let liList = {
    work: document.getElementById("work").value,
    time: document.getElementById("time").value,
  };
  let liListString = JSON.stringify(liList);
  localStorage.setItem("lilist", liListString);

  let getItem = localStorage.getItem("lilist");
  getItem = JSON.parse(getItem);
  console.log(getItem);
  let item = document.createElement("li");
  
  let getWork = document.createElement("p");
  getWork.innerText = getItem["work"];
  item.prepend(getWork);
  let getTime = document.createElement("div");
  getTime.innerText = getItem["time"];
  item.append(getTime);
  let getCheckBox = document.createElement("input");
  getCheckBox.type = "checkBox";
  getCheckBox.id = Math.floor(Math.random() * 1000);
  item.prepend(getCheckBox);

  let deletIcone=document.createElement("div")
  deletIcone.id=Math.floor(Math.random() * 1000);
  deletIcone.innerText="D"
  deletIcone.style.backgroundColor="green";
  deletIcone.style.marginRight="50px";
  deletIcone.style.width="30px";
  deletIcone.style.height="30px";

  item.append(deletIcone);
  todo.append(item);

  let selected = getCheckBox.addEventListener("click", (event) => {
    checkTodo(getCheckBox.id);
  });
  function checkTodo(id) {
    console.log(id);
    if(getCheckBox.checked){
      getWork.classList.add("checked");
      item.classList.add("back")
    }
    else{
      getWork.classList.remove("checked");
      item.classList.remove("back")
    }
  }
  let selectDelete=deletIcone.addEventListener("click" , (event) => {
    delet(deletIcone.id);
  })
function delet(id){
  console.log(id);
  localStorage.removeItem("liList");

}

}

