let stopVisualization = false; // Global flag to control stopping

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function visualizeNQueens(board, speed, container, description) {
    stopVisualization = false;  // Reset the stop flag
    description.textContent = 'Starting the visualization...';
    const result = await solveNQueens(board, 0, speed, container, description);
    if (!stopVisualization) { // If not stopped midway, show final result
        if (result) {
            description.textContent = 'Solution found!';
        } else {
            description.textContent = 'No solution exists.';
        }
    }
}

async function solveNQueens(board, col, speed, container, description) {
    if (stopVisualization) return false; // Stop if the process is interrupted

    if (col >= board.length) {
        return true;
    }

    const delay = (speed - 1) * (2.4 / 99) + 0.1; // Convert slider value to delay (0.1 to 2.5 seconds)

    for (let row = 0; row < board.length; row++) {
        if (stopVisualization) return false; // Stop if the process is interrupted

        highlightCell(board, row, col, container); // Highlight the current cell
        description.textContent = `Checking position (${row}, ${col})...`;
        await sleep(delay * 1000); // Convert seconds to milliseconds

        if (isSafe(board, row, col)) {
            description.textContent = `Position (${row}, ${col}) is safe. Placing the queen...`;
            board[row][col].isPresent = true;
            renderBoard(board, container);
            await sleep(delay * 1000);

            if (await solveNQueens(board, col + 1, speed, container, description)) {
                return true;
            }

            description.textContent = `Backtracking from (${row}, ${col})...`;
            board[row][col].isPresent = false;
            renderBoard(board, container);
            await sleep(delay * 1000);
        } else {
            description.textContent = `Position (${row}, ${col}) is not safe (conflict in row/column/diagonal).`;
            await sleep(delay * 1000);
        }

        unhighlightCell(board, row, col, container); // Unhighlight after the check
    }

    return false;
}

function isSafe(board, row, col) {
    // Check the current column
    for (let i = 0; i < col; i++) {
        if (board[row][i].isPresent) return false;
    }

    // Check upper diagonal
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j].isPresent) return false;
    }

    // Check lower diagonal
    for (let i = row, j = col; i < board.length && j >= 0; i++, j--) {
        if (board[i][j].isPresent) return false;
    }

    return true;
}

function highlightCell(board, row, col, container) {
    const cells = container.getElementsByClassName('board-cell');
    const cellIndex = row * board.length + col;
    cells[cellIndex].classList.add('highlight');
}

function unhighlightCell(board, row, col, container) {
    const cells = container.getElementsByClassName('board-cell');
    const cellIndex = row * board.length + col;
    cells[cellIndex].classList.remove('highlight');
}
