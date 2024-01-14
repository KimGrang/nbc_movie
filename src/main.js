import { displayMovies } from "./movie.js";
import { displayNowplaying } from "./now.js";
import { searchMovies } from "./search.js";

document.addEventListener("DOMContentLoaded", () => {
  displayMovies();
  document.querySelector(".tab1").addEventListener("click", displayMovies);
  document.querySelector(".tab2").addEventListener("click", displayNowplaying);
  document.querySelector(".search_btn").addEventListener("click", searchMovies);

  let car = 1;
  setInterval(function () {
    document.getElementById("radio" + car).checked = true;
    car = (car % 4) + 1;
  }, 4000);
});

document.getElementById("movieList").addEventListener("click", idMovies);

