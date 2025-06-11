import { Board } from "./models/Board.js";
import { Player } from "./models/Player.js";
import { CPUPlayer } from "./models/CPUPlayer.js";

export class Game {
  constructor(boardSize = 10, numShips = 3, shipLength = 3) {
    this.boardSize = boardSize;
    this.numShips = numShips;
    this.shipLength = shipLength;

    this.playerBoard = new Board(boardSize);
    this.cpuBoard = new Board(boardSize);

    this.player = new Player("Player", this.playerBoard);
    this.cpu = new CPUPlayer(this.cpuBoard);
  }

  initialize() {
    // Place ships for both players
    for (let i = 0; i < this.numShips; i++) {
      this.player.placeShip(this.shipLength);
      this.cpu.placeShip(this.shipLength);
    }
  }

  processPlayerGuess(row, col) {
    const guessResult = this.player.makeGuess(row, col);
    if (!guessResult.valid) {
      return guessResult;
    }

    const ship = this.cpu.ships.find((ship) =>
      ship.getPositions().some((pos) => pos.row === row && pos.col === col)
    );

    if (ship) {
      ship.recordHit(row, col);
      this.cpuBoard.markHit(row, col);

      if (ship.isSunk()) {
        return {
          valid: true,
          hit: true,
          sunk: true,
          message: "You sunk an enemy battleship!",
        };
      }
      return {
        valid: true,
        hit: true,
        sunk: false,
        message: "PLAYER HIT!",
      };
    }

    this.cpuBoard.markMiss(row, col);
    return {
      valid: true,
      hit: false,
      sunk: false,
      message: "PLAYER MISS.",
    };
  }

  processCPUGuess() {
    const { row, col } = this.cpu.makeGuess();
    const guessKey = `${row},${col}`;

    if (this.cpu.guesses.has(guessKey)) {
      return this.processCPUGuess();
    }

    this.cpu.guesses.add(guessKey);

    const ship = this.player.ships.find((ship) =>
      ship.getPositions().some((pos) => pos.row === row && pos.col === col)
    );

    if (ship) {
      ship.recordHit(row, col);
      this.playerBoard.markHit(row, col);
      this.cpu.processHit(row, col);

      if (ship.isSunk()) {
        return {
          valid: true,
          hit: true,
          sunk: true,
          message: "CPU sunk your battleship!",
        };
      }
      return {
        valid: true,
        hit: true,
        sunk: false,
        message: `CPU HIT at ${row}${col}!`,
      };
    }

    this.playerBoard.markMiss(row, col);
    this.cpu.processMiss();
    return {
      valid: true,
      hit: false,
      sunk: false,
      message: `CPU MISS at ${row}${col}.`,
    };
  }

  isGameOver() {
    if (this.player.getRemainingShips() === 0) {
      return {
        over: true,
        winner: "CPU",
        message: "GAME OVER! The CPU sunk all your battleships!",
      };
    }
    if (this.cpu.getRemainingShips() === 0) {
      return {
        over: true,
        winner: "Player",
        message: "CONGRATULATIONS! You sunk all enemy battleships!",
      };
    }
    return { over: false };
  }

  getBoards() {
    return {
      playerBoard: this.playerBoard.toString(),
      cpuBoard: this.cpuBoard.toString(true),
    };
  }
}
