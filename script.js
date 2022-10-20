let day = document.getElementsByClassName("day");
// console.log(day);

function deletBorder(elm) {
  // console.log(elm);
  for (let i = 0; i < day.length; i++) {
    day[i].classList.remove("active-div");
  }
  elm.classList.add("active-div");
}
