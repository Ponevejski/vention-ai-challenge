import { Game } from "../Game.js";

describe("Game", () => {
  let game;

  beforeEach(() => {
    game = new Game(10, 3, 3);
    game.initialize();
  });

  test("initializes game with correct state", () => {
    expect(game.boardSize).toBe(10);
    expect(game.numShips).toBe(3);
    expect(game.shipLength).toBe(3);
    expect(game.player.ships.length).toBe(3);
    expect(game.cpu.ships.length).toBe(3);
  });

  test("processes player guess correctly", () => {
    // Place a ship at known position for testing
    const ship = game.cpu.ships[0];
    ship.addPosition(0, 0);
    ship.addPosition(0, 1);
    ship.addPosition(0, 2);

    const result = game.processPlayerGuess(0, 0);
    expect(result.hit).toBe(true);
    expect(result.sunk).toBe(false);
    expect(result.message).toBe("PLAYER HIT!");
  });

  test("processes CPU guess correctly", () => {
    // Place a ship at known position for testing
    const ship = game.player.ships[0];
    ship.addPosition(0, 0);
    ship.addPosition(0, 1);
    ship.addPosition(0, 2);

    const result = game.processCPUGuess();
    expect(result).toHaveProperty("hit");
    expect(result).toHaveProperty("sunk");
    expect(result).toHaveProperty("message");
  });

  test("detects game over correctly", () => {
    // Sink all player ships
    game.player.ships.forEach((ship) => {
      ship.positions.forEach((pos) => {
        ship.recordHit(pos.row, pos.col);
      });
    });

    const gameState = game.isGameOver();
    expect(gameState.over).toBe(true);
    expect(gameState.winner).toBe("CPU");
  });

  test("returns boards in correct format", () => {
    const boards = game.getBoards();
    expect(boards).toHaveProperty("playerBoard");
    expect(boards).toHaveProperty("cpuBoard");
    expect(Array.isArray(boards.playerBoard)).toBe(true);
    expect(Array.isArray(boards.cpuBoard)).toBe(true);
    expect(boards.playerBoard.length).toBe(11);
    expect(boards.cpuBoard.length).toBe(11);
  });
});
