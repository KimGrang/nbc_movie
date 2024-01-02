const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNTUzYzcxYzVkNDhiYTBlNGUxZDZkMjBkMjFiYTVhMyIsInN1YiI6IjY1OGUwZTc1ODQ0NDhlNjZkOWI1NjFhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kEbSQdSbsQxbG_KRm8rf8ZXXUjo-CSFzd7IgwsiU4GQ'
  }
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  .then(response => response.json())
  .then(data => {
    // Get the div element where you want to display the movie list
    const movieList = document.getElementById('movieList');

    // Create HTML content based on the movie data
    const tempHtml = data.results.map(movie => `
            <div class="card" style="width: 18rem;">
              <div class="card-header">
                <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" class="card-img-top" alt="...">
              </div>
              <div class="card-body">
                <h4 class="card-title">${movie.title}</h4>
                  <p class="card-text">overview : <br>
                    ${movie.overview}
                  </p>
                  <p class="card-text">
                    Vote_average : ${movie.vote_average}
                  </p>    
              </div>
            </div>
        `).join('');

    // Append the generated HTML content to the movieList element
    movieList.innerHTML = tempHtml;
  })
  .catch(err => console.error(err));