document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");

  fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
    .then((response) => response.json())
    .then((data) => {
      displayMovieDetails(data);
    })
    .catch((err) => {
      console.error(err);
    });

  function displayMovieDetails(movie) {
    const movieDetails = document.getElementById("movieDetails");
    const tempHtml = `
            <div class="card" style="width: 18rem;">
                <div class="card-header">
                    <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" class="card-img-top" alt="...">
                </div>
                <div class="card-body">
                    <h4 class="card-title">${movie.title}</h4>
                    <p class="card-text">Overview: <br>${movie.overview}</p>
                    <p class="card-text">Vote Average: ${movie.vote_average}</p>
                </div>
            </div>
        `;
    movieDetails.innerHTML = tempHtml;
  }
});
