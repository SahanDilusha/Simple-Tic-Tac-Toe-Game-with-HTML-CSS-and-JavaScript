
const statusstatus = document.querySelector('.status-game');

let gameActive = true;

let payer = "X";

let gameState = ["", "", "", "", "", "", "", "", ""];

const winning = () => `Player ${payer} has won!`;
const draw = () => `Game ended in a draw!`;
const payerTurn = () => `It's ${payer}'s turn`;

statusstatus.innerHTML = payerTurn();

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.restart-game').addEventListener('click', handleRestartGame);

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(
        clickedCell.getAttribute('data-cell')
    );

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleCellPlayed(clickedCell, clickedCellIndex) {

    gameState[clickedCellIndex] = payer;
    clickedCell.innerHTML = payer;
}

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
    if (roundWon) {
        statusstatus.innerHTML = winning();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusstatus.innerHTML = draw();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handlePlayerChange() {
    payer = payer === "X" ? "O" : "X";
    statusstatus.innerHTML = payerTurn();
}

function handleRestartGame() {
    gameActive = true;
    payer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusstatus.innerHTML = payerTurn();
    document.querySelectorAll('.cell')
        .forEach(cell => cell.innerHTML = "");
}    