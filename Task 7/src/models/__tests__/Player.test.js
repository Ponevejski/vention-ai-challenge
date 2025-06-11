import { Player } from "../Player.js";
import { Board } from "../Board.js";

describe("Player", () => {
  let player;
  let board;

  beforeEach(() => {
    board = new Board(10);
    player = new Player("TestPlayer", board);
  });

  test("creates player with correct initial state", () => {
    expect(player.name).toBe("TestPlayer");
    expect(player.ships).toEqual([]);
    expect(player.guesses.size).toBe(0);
  });

  test("places ship correctly", () => {
    const ship = player.placeShip(3);
    expect(ship.length).toBe(3);
    expect(ship.positions.length).toBe(3);
    expect(player.ships).toContain(ship);
  });

  test("validates guesses correctly", () => {
    const result = player.makeGuess(0, 0);
    expect(result.valid).toBe(true);
    expect(player.guesses.has("0,0")).toBe(true);

    const duplicateResult = player.makeGuess(0, 0);
    expect(duplicateResult.valid).toBe(false);
    expect(duplicateResult.message).toBe("You already guessed that location!");
  });

  test("counts remaining ships correctly", () => {
    const ship1 = player.placeShip(3);
    const ship2 = player.placeShip(3);

    expect(player.getRemainingShips()).toBe(2);

    ship1.recordHit(0, 0);
    ship1.recordHit(0, 1);
    ship1.recordHit(0, 2);

    expect(player.getRemainingShips()).toBe(1);
  });
});
