import { options } from "./movie.js";

const urlParams = new URLSearchParams(window.location.search);
const movieID = urlParams.get("id");

document.addEventListener("DOMContentLoaded", function () {
   fetch(`https://api.themoviedb.org/3/movie/${movieID}?language=en-US`, options)
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

      movieDetails.innerHTML = tempHtml + movieDetails.innerHTML;
   }

   const reviewForm = document.getElementById('reviewForm');
   loadReviews();
});

document.getElementById('reviewForm').onsubmit = function (e) {
   e.preventDefault();
   let userName = document.getElementById('Name').value;
   let userComment = document.getElementById('Comment').value;
   let userPW = document.getElementById('PW').value;

   let newReview = {
      user: userName,
      review: userComment,
      PW: userPW
   };

   let reviews = getReviews();
   reviews.push(newReview);
   localStorage.setItem(`reviews_${movieID}`, JSON.stringify(reviews));
   loadReviews();
   document.getElementById('reviewForm').reset();
};

function getReviews() {
   let reviews = localStorage.getItem(`reviews_${movieID}`);
   return reviews ? JSON.parse(reviews) : [];
}

function loadReviews() {
   let reviewList = document.getElementById('reviewList');
   reviewList.innerHTML = '';

   let reviews = getReviews();

   for (let i = 0; i < reviews.length; i++) {
      let review = reviews[i];

      let listItem = document.createElement('li');
      listItem.innerHTML =
         '<strong>' + review.user + ':</strong> ' + review.review;

      reviewList.appendChild(listItem);
   }
}
