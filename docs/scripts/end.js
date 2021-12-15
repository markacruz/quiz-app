let scoreSet = sessionStorage.getItem("score");
let limitSet = sessionStorage.getItem("limit");

let score = document.getElementById("score");
let description = document.getElementById("description");
let playAgain = document.getElementById("play-again");

let percentage = ((scoreSet / limitSet) * 100).toFixed(2);

score.innerHTML = percentage;

if (percentage <= 50) {
    description.innerHTML = "You tried your best.\nBetter luck next time!";
} else {
    description.innerHTML = "Fantastic work!";
}

playAgain.addEventListener("click", () => {
    window.location.href = "index.html";
})







