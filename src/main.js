import { displayMovies } from "./movie.js";
import { searchMovies } from "./search.js";

displayMovies();
document.querySelector(".search_btn").addEventListener("click", searchMovies);

// //캐러셀 함수
let car = 1; //캐러셀 자동으로움직이는거
setInterval(function () {
  document.getElementById("radio" + car).checked = true;
  car++;
  if (car > 4) {
    car = 1;
  }
}, 4000);
