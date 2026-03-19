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
    let winner = null;
    let winningCells = [];
    let scores = {
        X: 0,
        O: 0
    };

    function getScores() {
        return { ...scores };
    }

    function getCurrentPlayer() {
        return currentPlayer;
    }

    function setPlayerNames(playerOneName, playerTwoName) {
        const trimmedPlayerOneName = playerOneName.trim();
        const trimmedPlayerTwoName = playerTwoName.trim();

        if (trimmedPlayerOneName !== "") {
            playerOne.name = trimmedPlayerOneName;
        }

        if (trimmedPlayerTwoName !== "") {
            playerTwo.name = trimmedPlayerTwoName;
        }

        if (!gameOver) {
            statusMessage = currentPlayer.name + "'s turn.";
        }
    }

    function isGameOver() {
        return gameOver;
    }

    function getStatusMessage() {
        return statusMessage;
    }

    function getWinner() {
        return winner;
    }

    function getWinningCells() {
        return [...winningCells];
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
                    winningCells = [a, b, c];
                    return [a, b, c];
                }
            }
        }

        return null;
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
            return;
        }

        const playerPlayingNow = getCurrentPlayer();

        if (!gameboard.placeMarker(index, playerPlayingNow.marker)) {
            statusMessage = "Invalid move. Please try again.";
            return;
        }

        const winningLine = checkWinner();

        if (winningLine) {
            scores[playerPlayingNow.marker]++;
            winner = playerPlayingNow;
            statusMessage = playerPlayingNow.name + " wins!";
            return;
        }

        if (checkDraw()) {
            statusMessage = "It's a draw!";
            return;
        }

        switchPlayer();
        statusMessage = getCurrentPlayer().name + "'s turn.";
    }

    function resetGame() {
        gameboard.reset();
        gameOver = false;
        currentPlayer = playerOne;
        winner = null;
        statusMessage = "Player 1's turn.";
        winningCells = [];
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
        setPlayerNames,
        isGameOver,
        getStatusMessage,
        getWinner,
        getWinningCells,
        playRound,
        resetGame,
        getBoard,
        getScores,
        getPlayers
    };
})();

const displayController = (function () {
    const statusMessageElement = document.getElementById("status-message");
    const gameBoardElement = document.getElementById("game-board");
    const resetButtonElement = document.getElementById("reset-button");
    const scoreXElement = document.getElementById("score-x");
    const scoreOElement = document.getElementById("score-o");
    const playerOnePanelElement = document.getElementById("player-one-panel");
    const playerTwoPanelElement = document.getElementById("player-two-panel");
    const playerOneInputElement = document.getElementById("player-one-input");
    const playerTwoInputElement = document.getElementById("player-two-input");
    const setNamesButtonElement = document.getElementById("set-names-button");
    const playerOneNameElement = document.getElementById("player-one-name");
    const playerTwoNameElement = document.getElementById("player-two-name");

    function renderBoard() {
        gameBoardElement.innerHTML = "";

        const cells = gameController.getBoard();
        const winningCells = gameController.getWinningCells();

        cells.forEach((cell, index) => {
            const cellElement = document.createElement("button");
            cellElement.classList.add("cell");
            cellElement.dataset.index = index;
            cellElement.textContent = cell;

            if (winningCells.includes(index)) {
                cellElement.classList.add("winning-cell");
            }

            gameBoardElement.appendChild(cellElement);
        });
    }

    function renderStatus() {
        statusMessageElement.textContent = gameController.getStatusMessage();
    }

    function renderScores() {
        const scores = gameController.getScores();
        scoreXElement.textContent = scores.X;
        scoreOElement.textContent = scores.O;
    }

    function renderNames() {
        const players = gameController.getPlayers();
        playerOneNameElement.textContent = players.playerOne.name;
        playerTwoNameElement.textContent = players.playerTwo.name;
    }

    function renderActivePlayer() {
        const winner = gameController.getWinner();

        playerOnePanelElement.classList.remove("active-player", "winner-player");
        playerTwoPanelElement.classList.remove("active-player", "winner-player");

        if (winner) {
            if (winner.marker === "X") {
                playerOnePanelElement.classList.add("winner-player");
            } else {
                playerTwoPanelElement.classList.add("winner-player");
            }
            return;
        }

        const currentPlayer = gameController.getCurrentPlayer();

        if (currentPlayer.marker === "X") {
            playerOnePanelElement.classList.add("active-player");
        } else {
            playerTwoPanelElement.classList.add("active-player");
        }
    }

    function updateScreen() {
        renderBoard();
        renderStatus();
        renderScores();
        renderNames();
        renderActivePlayer();
    }

    function handleCellClick(event) {
        const clickedCell = event.target;

        if (!clickedCell.classList.contains("cell")) {
            return;
        }

        const index = Number(clickedCell.dataset.index);
        gameController.playRound(index);
        updateScreen();
    }

    function handleReset() {
        gameController.resetGame();
        updateScreen();
    }

    function handleSetNames() {
        gameController.setPlayerNames(
            playerOneInputElement.value,
            playerTwoInputElement.value
        );
        updateScreen();
    }

    function bindEvents() {
        gameBoardElement.addEventListener("click", handleCellClick);
        resetButtonElement.addEventListener("click", handleReset);
        setNamesButtonElement.addEventListener("click", handleSetNames);
    }

    return {
        updateScreen,
        bindEvents,
        handleSetNames
    };
})();

displayController.updateScreen();
displayController.bindEvents();