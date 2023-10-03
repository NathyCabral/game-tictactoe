const board = document.getElementById('board');
const statusText = document.getElementById('statusText');
const resetButton = document.getElementById('resetButton');
const winScore = document.getElementById('winScore');
const lossScore = document.getElementById('lossScore');
const drawScore = document.getElementById('drawScore');
const totalScore = document.getElementById('totalScore');
let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let xScore = 0;
let oScore = 0;
let draw = 0;
let totalPoints = 0;

// Função para verificar o vencedor
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
        [0, 4, 8], [2, 4, 6]             // Diagonais
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            gameActive = false;
            return boardState[a];
        }
    }

    if (!boardState.includes('')) {
        gameActive = false;
        return 'Empate';
    }

    return null;
}

// Função para atualizar o placar
function updateScore() {
    winScore.textContent = xScore + oScore;
    lossScore.textContent = 0;
    drawScore.textContent = draw;
    totalPoints = (xScore + oScore) * 100 + draw * 50;
    totalScore.textContent = totalPoints;
}

// Função para atualizar o tabuleiro
function updateBoard() {
    board.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = boardState[i];
        cell.addEventListener('click', () => handleCellClick(i));
        board.appendChild(cell);
    }
}

// Função para lidar com o clique em uma célula
function handleCellClick(index) {
    if (!gameActive || boardState[index] !== '') return;

    boardState[index] = currentPlayer;
    updateBoard();
    const winner = checkWinner();

    if (winner) {
        if (winner === 'Empate') {
            statusText.textContent = 'Empate! Clique em "Reiniciar" para jogar novamente.';
            draw++;
        } else {
            statusText.textContent = `O jogador ${winner} venceu! Clique em "Reiniciar" para jogar novamente.`;
            winner === 'X' ? xScore++ : oScore++;
        }
        gameActive = false;
        updateScore();
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `Vez do jogador ${currentPlayer}`;
    }
}

// Função para reiniciar o jogo
function resetGame() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    statusText.textContent = 'Vez do jogador X';
    updateBoard();
}


resetButton.addEventListener('click', resetGame);


updateBoard();
updateScore();
