# Tic Tac Toe

A browser-based Tic Tac Toe game built with **HTML**, **CSS**, and **JavaScript** for **The Odin Project**.

The project focuses on building the game logic first and then connecting it to the DOM using modules, factories, and event handling.

## Features

- Two-player local Tic Tac Toe
- Custom player names
- Turn indicator
- Win and draw detection
- Winning cells highlighted
- Score tracking across rounds
- Reset button for a new round

## Built With

- HTML
- CSS
- JavaScript

## Structure

### `gameboard`
Handles the board state:
- store cells
- reset board
- place markers
- return board state

### `gameController`
Handles game logic:
- create players
- track turns
- check wins and draws
- track score
- reset rounds

### `displayController`
Handles the UI:
- render board
- render status and scores
- highlight active player
- highlight winning cells
- handle clicks and reset

## How It Works

The board state lives in JavaScript, not in the DOM.

When a player clicks a cell:
1. the display controller gets the cell index
2. the game controller processes the move
3. the board updates if valid
4. the controller checks win/draw
5. the screen rerenders

## Learning Goals

This project was built to practice:

- module and factory patterns
- separating logic from display
- DOM manipulation
- event handling
- state-based rendering

## Future Improvements

- AI opponent
- animations
- sound effects
- dark mode

## Author

Built by Alejandro Nava.
