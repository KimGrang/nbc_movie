const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNTUzYzcxYzVkNDhiYTBlNGUxZDZkMjBkMjFiYTVhMyIsInN1YiI6IjY1OGUwZTc1ODQ0NDhlNjZkOWI1NjFhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kEbSQdSbsQxbG_KRm8rf8ZXXUjo-CSFzd7IgwsiU4GQ"
  }
};

fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options)
  .then((response) => response.json())
  .then((data) => {
    displayMovies(data.results);
    idMovies(data.results);
  })
  .catch((err) => console.error(err));

function displayMovies(movies) {
  const movieList = document.getElementById("movieList");
  const tempHtml = movies
    .map(
      (movie) => `
        <div class="card" style="width: 18rem;">
          <div class="card-header">
            <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" class="card-img-top" alt="...">
          </div>
          <br>
          <div class="card-body">
            <h4 class="card-title">${movie.title}</h4>
          </div>
        </div>
      `
    )
    .join("");
  movieList.innerHTML = tempHtml;
}

function idMovies(movies) {
  document.querySelectorAll(".card-img-top").forEach((img, index) => {
    img.addEventListener("click", function () {
      const movieId = movies[index].id;
      window.location.href = `detail.html?id=${movieId}`;
    });
  });
}

const searchMovies = function () {
  const search = document.getElementById("search").value.toLowerCase().trim();;
  const cards = document.querySelectorAll(".card");
  let hasdata = false; // 검색결과 확인

  cards.forEach((card) => {
    const title = card.querySelector(".card-title").innerText.toLowerCase().replace(/\s/g, "");
    if (title.includes(search)) {
      card.style.display = "block";
      hasdata = true
    } else {
      card.style.display = "none";
    }
  });

  // 검색결과 없으면 없다고 표시
  const nodata = document.getElementById("no_reselt");
  if (hasdata) {
    nodata.style.display = "none"
  } else {
    nodata.style.display = "block"
  }
};
document.querySelector(".search_btn").addEventListener("click", searchMovies);

const searchInput = document.querySelector(".search_input");
searchInput.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    searchMovies();
  }
});
