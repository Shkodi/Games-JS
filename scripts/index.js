let gameActive = true;
let currentPlayer = "X";
let gameState = new Array(9).fill("");
// let gameState = ["", "", "", "", "", "", "", "", ""];
let resetButton = document.querySelector(".status button");
let message = document.querySelector(".status p");
let winResults = ["012", "345", "678", "036", "147", "258", "048", "246"];


const drawAudio = new Audio("./soundEffects/draw.wav");
const winAudio = new Audio("./soundEffects/win.wav");

function drawSymbol(clickedCell, cellIndex) {
    gameState[cellIndex] = currentPlayer;
    colorSymbol = (currentPlayer === "X") ? "skyblue" : "orange";
    clickedCell.style.color = colorSymbol;
    clickedCell.innerHTML = currentPlayer;
    drawAudio.play();
}

function changePlayer() {
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    // if(currentPlayer === "X") {
    //     currentPlayer = "O";
    // } else {
    //     currentPlayer = "X";
    // }
    message.innerHTML = "It's " + currentPlayer + "'s turn";
}

function winConditions() {
    for(let i = 0; i < winResults.length; i++) {
        let a = gameState[winResults[i][0]];
        let b = gameState[winResults[i][1]];
        let c = gameState[winResults[i][2]];

        if(a !== "" && a === b && b === c) {
            message.innerHTML = currentPlayer + " wins";
            resetButton.classList.add("animation");
            gameActive = false;
            setTimeout(function() {
                winAudio.volume = 0.15;
                winAudio.play();
            }, 300);
            return;
        }
    }
    if(!gameState.includes("")) {
        message.innerHTML = "It's a draw";
        resetButton.classList.add("animation");
        gameActive = false;
        return;
    }
    changePlayer();
}

function playGame(element) {
    let clickedCell = element.target;
    let cellIndex = parseInt(clickedCell.getAttribute("data-index"));

    if(gameState[cellIndex] !== "" || !gameActive) { return; }

    drawSymbol(clickedCell, cellIndex);
    winConditions();
}

function resetGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = new Array(9).fill("");
    message.innerHTML = "It's " + currentPlayer + "'s turn";
    resetButton.classList.remove("animation");
    document.querySelectorAll(".gameFields").forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll(".gameFields").forEach(cell => cell.addEventListener("click", playGame));
// for(let i = 0; i < 9; i++) {
//     document.querySelectorAll(".gameFields")[i].addEventListener("click", playGame);
// }
document.querySelector(".status button").addEventListener("click", resetGame);