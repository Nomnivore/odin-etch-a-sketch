const board = document.getElementById("board");
const btnGen = document.querySelector("#generate");
const inpSize = document.querySelector("#size");

let mouseDown = 0;
document.body.onmousedown = function () {
    ++mouseDown;
};
document.body.onmouseup = function () {
    --mouseDown;
};

const changeColor = (event) => {
    event.target.style.background = `rgb(0,0,0)`;
};

let boardSize;
function makeBoard(squares) {
    // 16 = 16x16
    boardSize = squares;
    const size = board.offsetHeight / squares;

    for (let iRow = 1; iRow <= squares; iRow++) {
        const row = document.createElement("div");
        row.classList.add("row");
        row.style.width = `${board.offsetWidth}px`;
        row.style.height = `${size}px`;

        for (let iCol = 1; iCol <= squares; iCol++) {
            const col = document.createElement("div");
            col.classList.add("square");
            col.style.width = `${size}px`;
            col.style.height = `${size}px`;

            row.appendChild(col);
        }
        board.appendChild(row);
    }

    document.querySelectorAll(".square").forEach((square) => {
        square.addEventListener("mouseenter", (event) => {
            if (mouseDown) changeColor(event);
        });
        square.addEventListener("mousedown", changeColor);
    });
}

btnGen.onclick = () => {
    console.log(inpSize)
    let size = parseInt(inpSize.value)
    console.log(size)
    if (size > 100 || size < 16 || isNaN(size)) {
        alert("Please enter a valid size: 16-100");
        return;
    }
    board.innerHTML = "";
    mouseDown = 0;
    makeBoard(size);
};

document.body.onresize = () => {
    const size = board.offsetHeight / boardSize;
    document.querySelectorAll(".row").forEach((row) => {
        row.style.width = `${board.offsetWidth}px`;
        row.style.height = `${size}px`;
    });
    document.querySelectorAll(".square").forEach((col) => {
        col.style.width = `${size}px`;
        col.style.height = `${size}px`;
    });
};

makeBoard(16); // for debug
