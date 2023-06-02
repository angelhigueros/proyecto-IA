// Angel Higueros
// 20460
// Proyecto IA

const COLS = 7;
const ROWS = 6;

function minimax(board, depth, isMaximizing, playerId) {
    let result = checkWinner(board);
    if (result !== null || depth === 0) {
        return result;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let col = 0; col < COLS; col++) {
            let row = getLowestEmptyRow(board, col);
            if (row !== null) {
                board[row][col] = playerId;
                let score = minimax(board, depth - 1, false, playerId);
                board[row][col] = 0;
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let col = 0; col < COLS; col++) {
            let row = getLowestEmptyRow(board, col);
            if (row !== null) {
                board[row][col] = playerId === 1 ? 2 : 1;
                let score = minimax(board, depth - 1, true, playerId);
                board[row][col] = 0;
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function getLowestEmptyRow(board, col) {
    for (let row = ROWS - 1; row >= 0; row--) {
        if (board[row][col] === 0) {
            return row;
        }
    }
    return null;
}

function checkWinner(board) {
    // vertical
    for (let row = 0; row < ROWS - 3; row++) {
        for (let col = 0; col < COLS; col++) {
            if (board[row][col] !== 0) {
                if (board[row][col] === board[row + 1][col] &&
                    board[row][col] === board[row + 2][col] &&
                    board[row][col] === board[row + 3][col]) {
                    return board[row][col];
                }
            }
        }
    }
    // horizontal
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS - 3; col++) {
            if (board[row][col] !== 0) {
                if (board[row][col] === board[row][col + 1] &&
                    board[row][col] === board[row][col + 2] &&
                    board[row][col] === board[row][col + 3]) {
                    return board[row][col];
                }
            }
        }
    }

    // ascendingDiagonal
    for (let row = 3; row < ROWS; row++) {

        for (let col = 0; col < COLS - 3; col++) {
            if (board[row][col] !== 0) {
                if (board[row][col] === board[row - 1][col + 1] &&
                    board[row][col] === board[row - 2][col + 2] &&
                    board[row][col] === board[row - 3][col + 3]) {
                    return board[row][col];
                }
            }
        }
    }

    // descendingDiagonal
    for (let row = 0; row < ROWS - 3; row++) {
        for (let col = 0; col < COLS - 3; col++) {
            if (board[row][col] !== 0) {
                if (board[row][col] === board[row + 1][col + 1] &&
                    board[row][col] === board[row + 2][col + 2] &&
                    board[row][col] === board[row + 3][col + 3]) {
                    return board[row][col];
                }
            }
        }
    }

    return null;
}

function makeMove(board, playerId) {

    let bestScore = -Infinity;
    let move;
    for (let col = 0; col < COLS; col++) {
        let row = getLowestEmptyRow(board, col);
        if (row !== null) {
            board[row][col] = playerId;
            let score = minimax(board, 3, false, playerId);
            board[row][col] = 0;
            if (score > bestScore) {
                bestScore = score;
                move = col;
            }
        }
    }
    return move;
}



module.exports = {
    makeMove: makeMove
}