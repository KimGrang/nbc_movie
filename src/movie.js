export const displayMovies = async () => {
  const movies = await fetchMovieData();

  const movieList = document.querySelector("#movieList");
  movieList.innerHTML = movies.results
    .map(
      (movie) => `
        <div class="card" id=${movie.id} style="width: 18rem;">
          <div class="card-header" id=${movie.id}>
            <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" class="card-img-top" alt="...">
          </div>
          <div class="card-body" id=${movie.id}>
            <h4 class="card-title">${movie.title}</h4>
          </div>
        </div>`
    )
    .join("");

  movieList.addEventListener("click", idMovies);

  async function idMovies(event) {
    const target = event.target;
    const movieId = target.closest('.card').id;

    if (movieId) {
      // alert(`id : ${movieId}`);
      window.location.href = `detail.html?id=${movieId}`;
    }
  }
};

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNTUzYzcxYzVkNDhiYTBlNGUxZDZkMjBkMjFiYTVhMyIsInN1YiI6IjY1OGUwZTc1ODQ0NDhlNjZkOWI1NjFhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kEbSQdSbsQxbG_KRm8rf8ZXXUjo-CSFzd7IgwsiU4GQ"
  }
};

export const fetchMovieData = async function () {
  const response = await fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options)
  const data = await response.json()
  console.log(data.results)
  return data;
};