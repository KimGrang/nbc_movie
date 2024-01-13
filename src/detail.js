const options = {
   method: "GET",
   headers: {
      accept: "application/json",
      Authorization:
         "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzZmYzQyYzYyY2JhMWJmOGNjZWE3NGIzYzY1ZmIxYiIsInN1YiI6IjY0NTBhNjM3ZDcxMDdlMDE0YzZmZDk4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ispHusWEKA3CalXIEK51_NiqFwzActFVSyietRsLH68"
   }
};

let link = document.location.href.split("?");
const urlSearchParamsObject = new URLSearchParams(link[1]);
const id = urlSearchParamsObject.get("id");

// review
const rating_input = document.querySelector(".rating > input");
const rating_star = document.querySelector(".rating_star");
let star = 0;
let review_num = 0;

fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
   .then((response) => response.json())
   .then((response) => {
      const detail_backImg = "https://image.tmdb.org/t/p/w200" + response.backdrop_path;
      const poster = "https://image.tmdb.org/t/p/w400" + response.poster_path;
      document.querySelector(
         "#visual"
      ).style.background = `linear-gradient(0deg, rgb(0 0 0), rgb(0 0 0 / 84%)), url(${detail_backImg}) center no-repeat`;
      document.querySelector("#visual").style.backgroundSize = "cover";
      const detail_title = response.title;
      const detail_tagline = response.tagline;
      const detail_average = Math.round(response.vote_average * 10) / 10;
      const detail_date = response.release_date;
      const lan = response.spoken_languages[0].english_name;
      const detail_genres = response.genres[0].name;
      const detail_runtime = response.runtime;
      const detail_overview = response.overview;
      const movie_poster = document.querySelector("#visual").getElementsByTagName("img")[0];
      movie_poster.setAttribute("src", poster);

      document.getElementsByTagName("h2")[0].innerText = detail_title;
      document.getElementsByClassName("tagline")[0].innerText = detail_tagline;
      document.getElementsByClassName("vote")[0].innerText = "⭐ " + detail_average;
      document.getElementsByClassName("date")[0].innerText = detail_date;
      document.getElementsByClassName("genre")[0].innerText = detail_genres;
      document.getElementsByClassName("country")[0].innerText = lan;
      document.getElementsByClassName("time")[0].innerText = detail_runtime;
      document.getElementsByClassName("content")[0].innerText = detail_overview;

      return response;
   })
   .then((response) => console.log(response));
// .catch(err => console.error(err));

const saveId = localStorage.getItem("like-" + String(id));
if (saveId === "true") {
   const like = document.querySelector("#btn");
   like.classList.add("fa-solid");
}
// 좋아요 기능
function heartLight() {
   const a = localStorage.getItem("like-" + String(id));
   if (a === "true" || a === "false") {
      localStorage.setItem("like-" + String(id), !(a === "true"));
   } else {
      localStorage.setItem("like-" + String(id), true);
   }
   const like = document.querySelector("#btn");
   like.classList.toggle("fa-solid");
}

// tab menu 부분
function openMovie(evt, tabName) {
   const tabcontent = document.getElementsByClassName("tabcontent");
   const tablinks = document.getElementsByClassName("tablinks");

   for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
   }
   for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
   }

   document.getElementById(tabName).style.display = "block";
   evt.currentTarget.className += " active";

   // review
   if (tabName === "reviews") {
      document.querySelector(".modalReview").scrollTop = document.querySelector(".modalReview").scrollHeight;
   }

   // more (영화 추천) 호출
   fetchMovieMore();
}

//------------------- 댓글박스 -----------------------

// 폼 제출
const form = document.querySelector("#form");
const name = document.querySelector("#name");
const textareaComment = document.querySelector("#textareaComment");

// 댓글 붙일 부모요소
const modalReview = document.querySelector(".modalReview");

// 폼 제출
// 1. localStorage에 그냥 값을 입력하면 읽어올때 순서를 무시하는 경우가 발생
// 2. 그래서 배열형식으로 객체를 집어넣음
const reviewAction = (e) => {
   e.preventDefault();

   // console.log(Math.floor(rating_input.value / 2), rating_star);
   //초기 설정
   if (!id) {
      return alert("새로고침 해주세요");
   } else if (!name.value && !textareaComment.value) {
      return alert("정보를 입력해주세요");
   }

   //비밀번호 입력창 설정
   let password = prompt("비밀번호를 입력해주세요");

   if (!password) {
      return alert("비밀번호를 입력해주세요");
   } else if (!/^[a-zA-Z]+[0-9]*$/.test(password)) {
      return alert("영문 + 숫자의 조합으로 입력해주세요");
   }

   // 1.키에 값이 없는 경우
   if (!localStorage.getItem(id)) {
      const obj = [
         {
            name: name.value,
            password: password,
            textareaComment: textareaComment.value,
            star_num: Math.floor(rating_input.value / 2)
         }
      ];

      const objString = JSON.stringify(obj);
      localStorage.setItem(id, objString);
      getReadInfo();
      // 2. 키에 값이 있는 경우
   } else {
      //비밀번호 중복 방지
      try {
         JSON.parse(localStorage.getItem(id)).forEach((item) => {
            if (item.password === password) {
               throw new Error("비밀번호가 중복됩니다");
            }
         });

         //함수 즉시 종료
      } catch (e) {
         return alert(e);
      }

      const obj = {
         name: name.value,
         password: password,
         textareaComment: textareaComment.value,
         star_num: star
      };

      // 키 값을 가져와서 객체로 만든 다음에 push()로 배열에 입력
      const already = JSON.parse(localStorage.getItem(id));
      already.push(obj);

      // 다시 JSON파일로 변환
      const objString = JSON.stringify(already);
      localStorage.setItem(id, objString);

      //폼 입력창 초기화
      name.value = "";
      textareaComment.value = "";

      getReadInfo();
   }
};

// 폼을 제출할 때 reviewAction() 함수 실행
form.addEventListener("submit", reviewAction);

// 로컬스토리지 정보를 html에 보이게 해줌
const getReadInfo = () => {
   // 댓글 붙일 요소들을 아예 없애줌
   review_num = 0;
   document.querySelector(".modalReview").innerHTML = "";

   for (const key in window.localStorage) {
      //문제
      if (window.localStorage.hasOwnProperty(key)) {
         // 로컬스토리지의 키 값과 url id값이 일치하는지 검사
         if (key === id) {
            const value = JSON.parse(localStorage.getItem(key));

            // 로컬스토리지 value에 있는 배열을 차례대로 돌아줌
            value.forEach((item) => {
               // 댓글 붙일 요소를 다시 생성
               let nweDiv = document.createElement("div");
               // value값 지정 - 사용자가 입력한 비밀번호로 특정한 값을 만들어줌
               let valueAttr = document.createAttribute("id");
               valueAttr.value = item.password;
               nweDiv.setAttributeNode(valueAttr);

               nweDiv.classList.add("show-reviews");

               nweDiv.innerHTML = `
         <p><div class='textImg'></div><span class='textarea-name'>${item.name
                  }</span> &nbsp; : &nbsp; <span class='textarea-comment'>${item.textareaComment}</span></p> 
         <span class='reviews-btn'>
             <span>${"⭐".repeat(item.star_num)}</span>
             <button id='edit' onclick='editInfo(event)'>edit</button>
             <button id='remove' onclick='removeInfo(event)'>remove</button>
         </span>
         `;

               modalReview.appendChild(nweDiv);

               // if (item.star_num == 5) {
               //   document.getElementById(item.name + '_star').innerText = '⭐⭐⭐⭐⭐';
               // } else if (item.star_num == 4) {
               //   document.getElementById(item.name + '_star').innerText = '⭐⭐⭐⭐';
               // } else if (item.star_num == 3) {
               //   document.getElementById(item.name + '_star').innerText = '⭐⭐⭐';
               // } else if (item.star_num == 2) {
               //   document.getElementById(item.name + '_star').innerText = '⭐⭐';
               // } else {
               //   document.getElementById(item.name + '_star').innerText = '⭐';
               // }

               modalReview.scrollTop = modalReview.scrollHeight;
               review_num++;
            });
         }
      }
   }

   document.getElementById("review-num").innerHTML = "댓글( " + review_num + " )";
};

// 수정하기-html에 사용자가 입력할 수 있는 인풋창을 보여줌
const editInfo = (e) => {
   const ParentNode = e.currentTarget.parentNode.parentNode;
   // e.currentTarget이 <span> 태그로 감싸져 있기때문에 parentNode를 두번 써줌

   //댓글 수정할때 덮어 쓰여질 배경색상
   ParentNode.classList.add("edit-background");
   ParentNode.innerHTML = `          
     <input class='editName' type='text' > : 
     <input class='editComment'  type='text' >
     <span class='edit-button'>
     <button id='clear' onclick='submitEditInfo(event)'>
       save
     </button>
     <button id='clear' onclick='goToBack(event)' >
       back
     </button>
     </span>
     `;
};

// 댓글수정 완료버튼 클릭
const submitEditInfo = (e) => {
   let compartPassword = e.currentTarget.parentNode.parentNode.getAttribute("id");
   // e.currentTarget.parentNode ==> <div id="user-password" class="show-reviews"></div>

   // edit input editName의 value
   const prcapracName = document.querySelector(`#${compartPassword}
         > .editName`).value;

   // edit input editComment value
   const prcapractextareaComment = document.querySelector(`#${compartPassword} > .editComment`).value;

   console.log(prcapracName, prcapractextareaComment);
   //입력창 입력없을떄
   if (!prcapracName || !prcapractextareaComment) {
      return alert("내용을 입력해주세요");
   }

   const promptObj = prompt("비밀번호를 입력하세요");
   const len = JSON.parse(localStorage.getItem(id)).length;
   console.log("sdfsfsd", len);

   // 로컬스토리지의 value값의 배열에 반복문
   let ddd = false;
   for (let i = 0; i < len; i++) {
      if (JSON.parse(localStorage.getItem(id))[i].password === promptObj) {
         const obj = {
            name: prcapracName,
            password: compartPassword,
            textareaComment: prcapractextareaComment,
            star_num: JSON.parse(localStorage.getItem(id))[i].star_num
         };

         const already = JSON.parse(localStorage.getItem(id));

         already.splice(i, 1, obj);
         const objString = JSON.stringify(already);
         window.localStorage.setItem(id, objString);

         ddd = false;
         alert("완료되었습니다");
         putEditInfo(e, compartPassword);
         break;
      } else {
         ddd = true;
      }
   }

   if (ddd) {
      alert("다시 입력해주세요");
   }
};

const goToBack = (e) => {
   const ParentNode = e.currentTarget.parentNode.parentNode;
   const nodeIdValue = ParentNode.getAttribute("id");
   ParentNode.classList.remove("edit-background");

   JSON.parse(localStorage.getItem(id)).forEach((item) => {
      if (item.password === nodeIdValue) {
         ParentNode.innerHTML = `
       <p><div class='textImg'></div><span class='textarea-name'>${item.name
            }</span> &nbsp; : &nbsp; <span class='textarea-comment'>${item.textareaComment}</span></p> 
       <span class='reviews-btn'>
           <span>${"⭐".repeat(item.star_num)}</span>
           <button id='edit' onclick='editInfo(event)'>edit</button>
           <button id='remove' onclick='removeInfo(event)'>remove</button>
       </span>
       `;
      }
   });
};

// 댓글 수정한 결과를 다시 브라우저에 보여줌
const putEditInfo = (e, compartPassword) => {
   const ParentNode = e.currentTarget.parentNode.parentNode;
   const value = JSON.parse(localStorage.getItem(id));

   value.forEach((item) => {
      if (item.password === compartPassword) {
         //e.currentTarget.parentNode ==> <div id="user-password" class="show-reviews"></div>

         ParentNode.classList.remove("edit-background");
         ParentNode.innerHTML = `
        
       <p><div class='textImg'></div><span class='textarea-name'>${item.name
            }</span> &nbsp; : &nbsp;<span class='textarea-comment'>${item.textareaComment}</span></p> 
       <span class='reviews-btn'>
           <span>${"⭐".repeat(item.star_num)}</span>
           <button id='edit' onclick='editInfo(event)'>edit</button>
           <button id='remove' onclick='removeInfo(event)'>remove</button>
       </span>
        `;
      }
   });
};

// 댓글 제거
const removeInfo = (e) => {
   //e.currentTarget.parentNode ==> <div id="user-password" class="show-reviews"></div>
   if (window.confirm("삭제하시겠습니까?")) {
      const promptObj = prompt("비밀번호를 입력하세요");
      const len = JSON.parse(localStorage.getItem(id)).length;
      const ParentNode = e.currentTarget.parentNode.parentNode;
      let nodePassword = ParentNode.getAttribute("id");
      let localArr = JSON.parse(localStorage.getItem(id));
      let ddd = false;
      for (let i = 0; i < len; i++) {
         if (JSON.parse(localStorage.getItem(id))[i].password === promptObj) {
            localArr.splice(i, 1);
            const objString = JSON.stringify(localArr);
            window.localStorage.setItem(id, objString);
            ///로컬스토리지 삭제 완료
            ParentNode.classList.remove("show-reviews");
            ParentNode.innerHTML = "";
            document.getElementById("review-num").innerHTML = "댓글( " + (len - 1) + " )";
            alert("삭제되었습니다");
            ddd = false;
            break;
         } else {
            ddd = true;
         }
      }
      if (ddd) {
         alert("다시 입력해주세요");
      }
   }
};

// 별점 드래그 할 때
rating_input.addEventListener("input", () => {
   rating_star.style.width = `${rating_input.value * 10}%`;
   star = parseInt(rating_input.value / 2);
});

getReadInfo();