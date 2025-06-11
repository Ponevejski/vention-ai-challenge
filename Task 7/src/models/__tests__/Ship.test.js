import { Ship } from "../Ship.js";

describe("Ship", () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(3);
  });

  test("creates ship with correct length", () => {
    expect(ship.length).toBe(3);
    expect(ship.positions).toEqual([]);
    expect(ship.hits.size).toBe(0);
  });

  test("adds positions correctly", () => {
    ship.addPosition(0, 0);
    ship.addPosition(0, 1);
    ship.addPosition(0, 2);

    expect(ship.positions).toEqual([
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: 2 },
    ]);
  });

  test("records hits correctly", () => {
    ship.addPosition(0, 0);
    ship.addPosition(0, 1);
    ship.addPosition(0, 2);

    ship.recordHit(0, 0);
    expect(ship.isHit(0, 0)).toBe(true);
    expect(ship.isHit(0, 1)).toBe(false);
  });

  test("detects sunk ship correctly", () => {
    ship.addPosition(0, 0);
    ship.addPosition(0, 1);
    ship.addPosition(0, 2);

    expect(ship.isSunk()).toBe(false);

    ship.recordHit(0, 0);
    ship.recordHit(0, 1);
    ship.recordHit(0, 2);

    expect(ship.isSunk()).toBe(true);
  });
});
