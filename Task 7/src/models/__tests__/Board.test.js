import { Board } from "../Board.js";

describe("Board", () => {
  let board;

  beforeEach(() => {
    board = new Board(10);
  });

  test("creates empty board with correct size", () => {
    expect(board.size).toBe(10);
    expect(board.grid.length).toBe(10);
    expect(board.grid[0].length).toBe(10);
    expect(board.grid[0][0]).toBe("~");
  });

  test("places ship correctly", () => {
    const positions = [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: 2 },
    ];
    board.placeShip(null, positions);
    expect(board.grid[0][0]).toBe("S");
    expect(board.grid[0][1]).toBe("S");
    expect(board.grid[0][2]).toBe("S");
  });

  test("marks hit correctly", () => {
    board.markHit(0, 0);
    expect(board.grid[0][0]).toBe("X");
  });

  test("marks miss correctly", () => {
    board.markMiss(0, 0);
    expect(board.grid[0][0]).toBe("O");
  });

  test("validates positions correctly", () => {
    expect(board.isValidPosition(0, 0)).toBe(true);
    expect(board.isValidPosition(9, 9)).toBe(true);
    expect(board.isValidPosition(-1, 0)).toBe(false);
    expect(board.isValidPosition(0, 10)).toBe(false);
  });

  test("checks if cell is empty", () => {
    expect(board.isCellEmpty(0, 0)).toBe(true);
    board.markHit(0, 0);
    expect(board.isCellEmpty(0, 0)).toBe(false);
  });
});
