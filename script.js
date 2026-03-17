console.log("Project loaded");


const board = {
    cells: ["", "", "", "", "", "", "", "", ""],

    reset: function () {
        for (let index = 0; index < this.cells.length; index++) {
            this.cells[index] = ""
        }
    },
    placeMarker: function (index, marker) {
        if (index >= 0 && index < this.cells.length) {
            this.cells[index] = marker;
        }
    }

}

console.log("Initial board:");
console.log(board.cells);

board.placeMarker(0, "X");
board.placeMarker(1, "X");
board.placeMarker(2, "X");
board.placeMarker(3, "O");
board.placeMarker(4, "X");
board.placeMarker(5, "O");
console.log(board.cells);
board.reset();

console.log("Board after reset:");
console.log(board.cells);