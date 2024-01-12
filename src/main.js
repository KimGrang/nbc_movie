import { displayMovies } from "./movie.js";
import { searchMovies } from "./search.js";

displayMovies();
document.querySelector(".search_btn").addEventListener("click", searchMovies);