let startButton = document.getElementById("start");
let selectCategory = document.getElementById("category").value;
let selectDifficulty = document.getElementById("difficulty").value;
let selectLimit = document.getElementById("limit").value;

let select = [selectCategory, selectDifficulty, selectLimit];

function changeCategory() {
    selectCategory = document.getElementById("category").value;
    select[0] = selectCategory;
}

function changeDifficulty() {
    selectDifficulty = document.getElementById("difficulty").value;
    select[1] = selectDifficulty;
}
function changeLimit() {
    selectLimit = document.getElementById("limit").value;
    select[2] = selectLimit;
}

startButton.addEventListener("click" , () => {
    sessionStorage.setItem("select", JSON.stringify(select));
})
