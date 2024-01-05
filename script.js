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
    displayMovies(data.results);
  })
  .catch(err => console.error(err));

// card제작, display
function displayMovies(movies) {
  const movieList = document.getElementById('movieList');
  // 화살표 map함수
  const tempHtml = movies.map(movie => `
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
    `).join('');
  // 사전캠프에서 배운 그거
  movieList.innerHTML = tempHtml;
}

// 필터링 함수
function filterMovies() {
  // 입력값
  const search = document.getElementById('search').value.toLowerCase(); 
  // 수정 대상
  const cards = document.querySelectorAll('.card'); 

  // cards의 요소 card에 대한 반복적으로 if문 돌릴거임
  cards.forEach(card => {
    // card 내부 쿼리 셀렉트, 대문자 소문자 구분 없음. title, overview로 검색
    const title = card.querySelector('.card-title').innerText.toLowerCase();
    const overview = card.querySelector('.card-text').innerText.toLowerCase();

    // include함수를 사용해 포함 확인
    if (title.includes(search) || overview.includes(search)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// 이벤트 리스너 추가
document.querySelector('.search_btn').addEventListener('click', filterMovies);