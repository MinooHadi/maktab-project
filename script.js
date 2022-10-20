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

