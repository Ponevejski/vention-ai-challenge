import { Ship } from "./Ship.js";

export class Player {
  constructor(name, board) {
    this.name = name;
    this.board = board;
    this.ships = [];
    this.guesses = new Set();
  }

  placeShip(length) {
    const ship = new Ship(length);
    let placed = false;

    while (!placed) {
      const orientation = Math.random() < 0.5 ? "horizontal" : "vertical";
      const startRow = Math.floor(Math.random() * this.board.size);
      const startCol = Math.floor(Math.random() * this.board.size);

      if (this.canPlaceShip(ship, startRow, startCol, orientation)) {
        this.placeShipOnBoard(ship, startRow, startCol, orientation);
        placed = true;
      }
    }

    this.ships.push(ship);
    return ship;
  }

  canPlaceShip(ship, startRow, startCol, orientation) {
    for (let i = 0; i < ship.length; i++) {
      const row = orientation === "horizontal" ? startRow : startRow + i;
      const col = orientation === "horizontal" ? startCol + i : startCol;

      if (
        !this.board.isValidPosition(row, col) ||
        !this.board.isCellEmpty(row, col)
      ) {
        return false;
      }
    }
    return true;
  }

  placeShipOnBoard(ship, startRow, startCol, orientation) {
    for (let i = 0; i < ship.length; i++) {
      const row = orientation === "horizontal" ? startRow : startRow + i;
      const col = orientation === "horizontal" ? startCol + i : startCol;
      ship.addPosition(row, col);
    }
    this.board.placeShip(ship, ship.getPositions());
  }

  makeGuess(row, col) {
    const guessKey = `${row},${col}`;
    if (this.guesses.has(guessKey)) {
      return { valid: false, message: "You already guessed that location!" };
    }

    this.guesses.add(guessKey);
    return { valid: true };
  }

  getRemainingShips() {
    return this.ships.filter((ship) => !ship.isSunk()).length;
  }
}
