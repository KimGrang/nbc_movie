const options = {}; // Your options object here

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(data => {
        // Get the div element where you want to display the movie list
        const movieList = document.getElementById('movieList');

        // Create HTML content based on the movie data
        const tempHtml = data.results.map(movie => `
            <div class="card" style="width: 18rem;">
                <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h4 class="card-title">${movie.title}</h4>
                    <p class="card-text">
                        overview : <br>
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