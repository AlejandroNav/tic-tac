console.log("Project loaded");


const board = {
    cells: ["", "", "", "", "", "", "", "", ""],

    reset: function () {
        for (let index = 0; index < this.cells.length; index++) {
            this.cells[index] = ""
        }
    }


}

console.log("Initial board:");
console.log(board.cells);

board.cells[0] = "X";
board.cells[1] = "X";
board.cells[2] = "X";
board.cells[3] = "O";
board.cells[4] = "X";
board.cells[5] = "O";
console.log(board.cells);
board.reset();

console.log("Board after reset:");
console.log(board.cells);