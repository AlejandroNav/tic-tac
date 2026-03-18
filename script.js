console.log("Project loaded");



// Gameboard object Owns the board state.
const board = {
    cells: ["", "", "", "", "", "", "", "", ""],

    reset: function () {
        for (let index = 0; index < this.cells.length; index++) {
            this.cells[index] = "";
        }
    },

    placeMarker: function (index, marker) {
        if (index < 0 || index >= this.cells.length) {
            return false;
        }
        const upperMarker = marker.toUpperCase();
        if (upperMarker !== "X" && upperMarker !== "O") {
            return false;
        }
        if (this.cells[index] !== "") {
            return false;
        }
        this.cells[index] = upperMarker;
        return true;
    },


    getCells: function () {
        return this.cells;
    }
};

function Player(name, marker) {
    return { name, marker };
}

const playerOne = Player("Player 1", "X");
const playerTwo = Player("Player 2", "O");

const gameController = {
    currentPlayer: playerOne,
    getCurrentPlayer: function () {
        return this.currentPlayer
    },
    switchPlayer: function () {
        if (this.getCurrentPlayer().name === "Player 1") {
            this.currentPlayer = playerTwo
        } else {
            this.currentPlayer = playerOne
        }
    },
    playRound: function (index) {
        let currentPlayer = this.getCurrentPlayer()
        let result = board.placeMarker(index, currentPlayer.marker)
        if (result) {
            this.switchPlayer()
        } else {
            console.log("There was an issue setting the player");
        }
    }
}

//displayController -- Handles the DOM.
console.log("Initial board:");
console.log(board.cells);

board.placeMarker(0, "X");
board.placeMarker(1, "X");
board.placeMarker(2, "X");
board.placeMarker(3, "O");
board.placeMarker(4, "x");
board.placeMarker(5, "o");
console.log(board.getCells());
board.reset();

console.log("Board after reset:");
console.log(board.getCells());