import { options } from "./movie.js";

export const displayNowplaying = async () => {
  const movies = await fetchNowplayingData();

  const movieList = document.querySelector("#movieList");
  movieList.innerHTML = movies.results
    .map(
      (movie) => `
          <div class="card" id=${movie.id} style="width: 18rem;">
            <div class="card-header" id=${movie.id}>
              <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" class="card-img-top" alt="...">
            </div>
            <br>
            <div class="card-body" id=${movie.id}>
              <h4 class="card-title">${movie.title}</h4>
            </div>
          </div>`
    )
    .join("");

  movieList.addEventListener("click", idMovies);

  async function idMovies(event) {
    const target = event.target;
    const movieId = target.closest(".card").id;
    if (movieId) {
      window.location.href = `detail.html?id=${movieId}`;
    }
  }
};

export const fetchNowplayingData = async function () {
  const response = await fetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1", options);
  const data = await response.json();
  return data;
};