console.log("Project loaded");

const gameboard = (function () {
    const cells = ["", "", "", "", "", "", "", "", ""];

    function reset() {
        cells.fill("");
    }

    function placeMarker(index, marker) {
        if (index < 0 || index >= cells.length) {
            return false;
        }

        const upperMarker = marker.toUpperCase();

        if (!["X", "O"].includes(upperMarker)) {
            return false;
        }

        if (cells[index] !== "") {
            return false;
        }

        cells[index] = upperMarker;
        return true;
    }

    function getCells() {
        return [...cells];
    }

    return {
        reset,
        placeMarker,
        getCells
    };
})();

function Player(name, marker) {
    return {
        name,
        marker: marker.toUpperCase()
    };
}

const gameController = (function () {
    const playerOne = Player("Player 1", "X");
    const playerTwo = Player("Player 2", "O");

    let currentPlayer = playerOne;
    let gameOver = false;
    let statusMessage = "Player 1's turn.";

    function getCurrentPlayer() {
        return currentPlayer;
    }

    function isGameOver() {
        return gameOver;
    }

    function getStatusMessage() {
        return statusMessage;
    }

    function switchPlayer() {
        if (currentPlayer === playerOne) {
            currentPlayer = playerTwo;
        } else {
            currentPlayer = playerOne;
        }
    }

    function checkWinner() {
        const cells = gameboard.getCells();

        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const combination of winningCombinations) {
            const a = combination[0];
            const b = combination[1];
            const c = combination[2];

            if (cells[a] !== "") {
                if (cells[a] === cells[b] && cells[b] === cells[c]) {
                    gameOver = true;
                    return true;
                }
            }
        }

        return false;
    }

    function checkDraw() {
        const cells = gameboard.getCells();

        for (let index = 0; index < cells.length; index++) {
            if (cells[index] === "") {
                return false;
            }
        }

        gameOver = true;
        return true;
    }

    function playRound(index) {
        if (gameOver) {
            statusMessage = "Game ended. Please reset the game to play again.";
            console.log(statusMessage);
            return;
        }

        const playerPlayingNow = getCurrentPlayer();

        if (!gameboard.placeMarker(index, playerPlayingNow.marker)) {
            statusMessage = "Invalid move. Please try again.";
            console.log(statusMessage);
            return;
        }

        if (checkWinner()) {
            statusMessage = playerPlayingNow.name + " wins!";
            console.log(statusMessage);
            return;
        }

        if (checkDraw()) {
            statusMessage = "It's a draw!";
            console.log(statusMessage);
            return;
        }

        switchPlayer();
        statusMessage = getCurrentPlayer().name + "'s turn.";
        console.log(statusMessage);
    }

    function resetGame() {
        gameboard.reset();
        gameOver = false;
        currentPlayer = playerOne;
        statusMessage = "Player 1's turn.";
        console.log("Game reset. Player 1 goes first.");
    }

    function getBoard() {
        return gameboard.getCells();
    }

    function getPlayers() {
        return {
            playerOne,
            playerTwo
        };
    }

    return {
        getCurrentPlayer,
        isGameOver,
        getStatusMessage,
        playRound,
        resetGame,
        getBoard,
        getPlayers
    };
})();


const displayController = (function () {
    const statusMessageElement = document.getElementById("status-message");
    const gameBoardElement = document.getElementById("game-board");
    const resetButtonElement = document.getElementById("reset-button");

    function renderBoard() {

    }

    function renderStatus() {

    }

    function updateScreen() {

    }

    function handleCellClick(event) {

    }

    function handleReset() {

    }

    function bindEvents() {

    }

    return {
        renderBoard,
        renderStatus,
        updateScreen,
        handleCellClick,
        handleReset,
        bindEvents
    };
})();


console.log("Initial status:", gameController.getStatusMessage());

gameController.playRound(0);
console.log("After first move:", gameController.getStatusMessage());
