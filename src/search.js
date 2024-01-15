// 유효성 검사를 맨 윗단에서 실행하는 것이 맞다고 하여 searchInput 전역변수로 변경함.
const searchInput = document.getElementById("search");

export const searchMovies = function () {
    const warningMsg = document.getElementsByClassName("warning")[0];

    // 유효성 검사
    if (!searchInput.value.trim()) {
        warningMsg.innerText = '검색어를 입력해주세요.';
        return;
    }
    else if (searchInput.value.length > 60) {
        warningMsg.innerText = '검색어는 60자 이내로 입력해주세요.';
        return;
    }
    else if (/[^a-zA-Z0-9 !@#$%^&*()-_=+[\]{};:'",.<>/?]/g.test(searchInput.value)) {
        warningMsg.innerText = '한글은 검색하실 수 없습니다.';
        return;
    }

    const search = document.getElementById("search").value.toLowerCase().trim();
    const cards = document.querySelectorAll(".card");
    let hasdata = false;

    cards.forEach((card) => {
        const title = card.querySelector(".card-title").innerText.toLowerCase().replace(/\s/g, "");
        if (title.includes(search)) {
            card.style.display = "block";
            hasdata = true
        } else {
            card.style.display = "none";
        }
    });

    const nodata = document.getElementById("no_result");
    if (hasdata) {
        nodata.style.display = "none"
    } else {
        nodata.style.display = "block"
    }
    warningMsg.innerText = '';
};

searchInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        searchMovies();
    }
});
