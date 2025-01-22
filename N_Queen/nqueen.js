document.addEventListener("DOMContentLoaded", function () {
    const boardContainer = document.getElementById('board-container');
    const description = document.getElementById('description');
    let boardSize = parseInt(document.getElementById('grid-size').value);
    let speed = parseInt(document.getElementById('speed').value);
    let board = createBoard(boardSize);

    renderBoard(board, boardContainer);

    document.getElementById('grid-size').addEventListener('input', function () {
        boardSize = parseInt(this.value);
        document.getElementById('grid-value').textContent = boardSize;
        board = createBoard(boardSize);
        renderBoard(board, boardContainer);
    });

    document.getElementById('speed').addEventListener('input', function () {
        speed = parseInt(this.value);
        // Convert slider value to delay in seconds (0.1 to 2.5)
        const delay = (speed - 1) * (2.4 / 99) + 0.1;
        document.getElementById('speed-value').textContent = delay.toFixed(1);
    });

    document.getElementById('visualize-btn').addEventListener('click', async function () {
        board = createBoard(boardSize);
        renderBoard(board, boardContainer);
        await visualizeNQueens(board, speed, boardContainer, description);
    });

    document.getElementById('clear-btn').addEventListener('click', function () {
        stopVisualization = true;  // Stop the current visualization
        board = createBoard(boardSize);  // Reset the board
        renderBoard(board, boardContainer);
        description.textContent = '';  // Clear the description
    });
});
