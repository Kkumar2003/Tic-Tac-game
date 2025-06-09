// Create the HTML structure dynamically
document.body.innerHTML = `
    <div id="game">
        <h1>Tic Tac Toe</h1>
        <div id="board"></div>
        <p id="status"></p>
        <button id="reset">Restart Game</button>
    </div>
`;

// Add styles dynamically
const style = document.createElement('style');
style.textContent = `
    body {
        font-family: Arial, sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
        background-color: #f4f4f9;
    }
    #game {
        text-align: center;
    }
    #board {
        display: grid;
        grid-template-columns: repeat(3, 100px);
        grid-gap: 5px;
        margin: 20px auto;
    }
    .cell {
        width: 100px;
        height: 100px;
        background-color: #fff;
        border: 2px solid #333;
        font-size: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    .cell.taken {
        cursor: not-allowed;
    }
    #status {
        font-size: 1.2rem;
        margin: 10px 0;
    }
    #reset {
        padding: 10px 20px;
        font-size: 1rem;
        cursor: pointer;
    }
`;
document.head.appendChild(style);
const board = document.getElementById('board');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];


function createBoard() {
    board.innerHTML = '';
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}


function handleCellClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (gameState[index] !== '' || !gameActive) {
        return;
    }

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('taken');

    if (checkWin()) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (gameState.every(cell => cell !== '')) {
        statusText.textContent = 'It\'s a draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}


function checkWin() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return gameState[a] === currentPlayer &&
                     gameState[a] === gameState[b] &&
                     gameState[a] === gameState[c];
    });
}

resetButton.addEventListener('click', createBoard);


createBoard();

style.textContent += `
    h1 {
        font-size: 2.5rem;
        color: #333;
        margin-bottom: 10px;
    }
    #game {
        background-color: #ffffff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        width: 350px;
    }
    .cell {
        transition: background-color 0.3s, transform 0.2s;
    }
    .cell:hover:not(.taken) {
        background-color: #f0f0f0;
        transform: scale(1.05);
    }
    #reset {
        background-color: #007BFF;
        color: #fff;
        border: none;
        border-radius: 5px;
        transition: background-color 0.3s;
    }
    #reset:hover {
        background-color: #0056b3;
    }
    #status {
        color: #555;
    }
`;
// 
function highlightWinningCells(winningCells) {
    winningCells.forEach(index => {
        const cell = board.children[index];
        cell.style.backgroundColor = '#4CAF50'; 
        cell.style.color = '#fff';
        cell.style.animation = 'winAnimation 1s infinite alternate';
    });
}

function handleLoss() {
    Array.from(board.children).forEach(cell => {
        if (!cell.classList.contains('taken')) {
            cell.style.backgroundColor = '#FF6347'; 
            cell.style.animation = 'lossAnimation 1s infinite alternate';
        }
    });
}

// 
function checkWin() {
    const winningCondition = winningConditions.find(condition => {
        const [a, b, c] = condition;
        return gameState[a] === currentPlayer &&
               gameState[a] === gameState[b] &&
               gameState[a] === gameState[c];
    });

    if (winningCondition) {
        highlightWinningCells(winningCondition);
        return true;
    }
    return false;
}

// 
style.textContent += `
    @keyframes winAnimation {
        0% { transform: scale(1); }
        100% { transform: scale(1.1); }
    }
    @keyframes lossAnimation {
        0% { transform: scale(1); opacity: 1; }
        100% { transform: scale(0.9); opacity: 0.7; }
    }
`;

// 
function handleCellClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (gameState[index] !== '' || !gameActive) {
        return;
    }

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('taken');

    if (checkWin()) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (gameState.every(cell => cell !== '')) {
        statusText.textContent = 'It\'s a draw!';
        handleLoss();
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}
// Add styles for the tic-tac-toe signs
style.textContent += `
    .cell.X {
        color: #007BFF; /* Blue for X */
        font-weight: bold;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }
    .cell.O {
        color: #FF6347; /* Red for O */
        font-weight: bold;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }
`;

//
function handleCellClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (gameState[index] !== '' || !gameActive) {
        return;
    }

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('taken', currentPlayer); 

    if (checkWin()) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (gameState.every(cell => cell !== '')) {
        statusText.textContent = 'It\'s a draw!';
        handleLoss();
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

