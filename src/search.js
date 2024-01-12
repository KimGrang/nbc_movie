export const searchMovies = function () {
    const search = document.getElementById("search").value.toLowerCase().trim();;
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
};
