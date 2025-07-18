const cells = document.querySelectorAll('.cell');
const currentPlayerElement = document.getElementById('current-player');
const scoreElement = document.getElementById('score');
const messageElement = document.getElementById('message');
const resetButton = document.getElementById('reset-button');
const newGameButton = document.getElementById('new-game-button');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let scores = { X: 0, O: 0, tie: 0 };

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

function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');

    if (board[index] === '' && gameActive) {
        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        event.target.classList.add(currentPlayer);

        if (checkWin(currentPlayer)) {
            messageElement.textContent = `Player ${currentPlayer} Wins!`;
            scores[currentPlayer]++;
            updateScore();
            gameActive = false;
            return;
        }

        if (board.every(cell => cell !== '')) {
            messageElement.textContent = "It's a Draw!";
            scores.tie++;
            updateScore();
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        currentPlayerElement.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

function checkWin(player) {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] === player && board[b] === player && board[c] === player) {
            return true;
        }
    }
    return false;
}

function updateScore() {
    scoreElement.textContent = `X: ${scores.X} | O: ${scores.O} | Ties: ${scores.tie}`;
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
    currentPlayer = 'X';
    currentPlayerElement.textContent = `Player ${currentPlayer}'s Turn`;
    messageElement.textContent = '';
    gameActive = true;
}

function newGame() {
    resetGame();
    scores = { X: 0, O: 0, tie: 0 };
    updateScore();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
newGameButton.addEventListener('click', newGame);

// Initial setup
updateScore();