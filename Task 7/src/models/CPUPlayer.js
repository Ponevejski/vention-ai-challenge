import { Player } from "./Player.js";

export class CPUPlayer extends Player {
  constructor(board) {
    super("CPU", board);
    this.mode = "hunt";
    this.targetQueue = [];
  }

  makeGuess() {
    let guess;

    if (this.mode === "target" && this.targetQueue.length > 0) {
      guess = this.targetQueue.shift();
    } else {
      this.mode = "hunt";
      guess = this.generateRandomGuess();
    }

    const [row, col] = guess.split(",").map(Number);
    return { row, col };
  }

  generateRandomGuess() {
    let row, col;
    do {
      row = Math.floor(Math.random() * this.board.size);
      col = Math.floor(Math.random() * this.board.size);
    } while (this.guesses.has(`${row},${col}`));

    return `${row},${col}`;
  }

  processHit(row, col) {
    this.mode = "target";
    const adjacent = [
      { r: row - 1, c: col },
      { r: row + 1, c: col },
      { r: row, c: col - 1 },
      { r: row, c: col + 1 },
    ];

    adjacent.forEach(({ r, c }) => {
      if (this.board.isValidPosition(r, c) && !this.guesses.has(`${r},${c}`)) {
        this.targetQueue.push(`${r},${c}`);
      }
    });
  }

  processMiss() {
    if (this.mode === "target" && this.targetQueue.length === 0) {
      this.mode = "hunt";
    }
  }
}
