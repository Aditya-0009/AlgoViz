function createBoard(size) {
    const board = [];
    for (let row = 0; row < size; row++) {
        const rowArray = [];
        for (let col = 0; col < size; col++) {
            rowArray.push({
                row,
                col,
                isPresent: false,
                isChecked: false,
                isAttacked: false
            });
        }
        board.push(rowArray);
    }
    return board;
}

function renderBoard(board, container) {
    container.innerHTML = ''; // Clear previous board
    const size = board.length;
    container.style.gridTemplateColumns = `repeat(${size}, 80px)`;
    container.style.gridTemplateRows = `repeat(${size}, 80px)`;

    board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('board-cell');
            cellElement.classList.add((rowIndex + colIndex) % 2 === 0 ? 'white' : 'black');

            if (cell.isPresent) {
                cellElement.classList.add('present');
                const img = document.createElement('img');
                img.src = 'queen.png';
                cellElement.appendChild(img);
            }

            container.appendChild(cellElement);
        });
    });
}
