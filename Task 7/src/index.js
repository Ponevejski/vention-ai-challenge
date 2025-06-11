import readline from "readline";
import { Game } from "./Game.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const game = new Game();
game.initialize();

console.log("\nLet's play Sea Battle!");
console.log(`Try to sink the ${game.numShips} enemy ships.`);

function gameLoop() {
  const gameState = game.isGameOver();
  if (gameState.over) {
    console.log(`\n*** ${gameState.message} ***`);
    const boards = game.getBoards();
    console.log("\n   --- OPPONENT BOARD ---          --- YOUR BOARD ---");
    console.log(boards.cpuBoard + "     " + boards.playerBoard);
    rl.close();
    return;
  }

  const boards = game.getBoards();
  console.log("\n   --- OPPONENT BOARD ---          --- YOUR BOARD ---");
  console.log(boards.cpuBoard + "     " + boards.playerBoard);

  rl.question("Enter your guess (e.g., 00): ", (answer) => {
    if (answer.length !== 2) {
      console.log("Oops, input must be exactly two digits (e.g., 00, 34, 98).");
      gameLoop();
      return;
    }

    const row = parseInt(answer[0]);
    const col = parseInt(answer[1]);

    if (
      isNaN(row) ||
      isNaN(col) ||
      row < 0 ||
      row >= game.boardSize ||
      col < 0 ||
      col >= game.boardSize
    ) {
      console.log(
        `Oops, please enter valid row and column numbers between 0 and ${game.boardSize - 1}.`
      );
      gameLoop();
      return;
    }

    const playerResult = game.processPlayerGuess(row, col);
    console.log(playerResult.message);

    if (playerResult.valid) {
      const cpuResult = game.processCPUGuess();
      console.log(cpuResult.message);
    }

    gameLoop();
  });
}

gameLoop();
