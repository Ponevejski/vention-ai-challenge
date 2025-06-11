import { CPUPlayer } from "../CPUPlayer.js";
import { Board } from "../Board.js";

describe("CPUPlayer", () => {
  let cpu;
  let board;

  beforeEach(() => {
    board = new Board(10);
    cpu = new CPUPlayer(board);
  });

  test("creates CPU player with correct initial state", () => {
    expect(cpu.name).toBe("CPU");
    expect(cpu.mode).toBe("hunt");
    expect(cpu.targetQueue).toEqual([]);
  });

  test("generates random guess in hunt mode", () => {
    const { row, col } = cpu.makeGuess();
    expect(row).toBeGreaterThanOrEqual(0);
    expect(row).toBeLessThan(10);
    expect(col).toBeGreaterThanOrEqual(0);
    expect(col).toBeLessThan(10);
  });

  test("switches to target mode after hit", () => {
    cpu.processHit(5, 5);
    expect(cpu.mode).toBe("target");
    expect(cpu.targetQueue.length).toBe(4);
    expect(cpu.targetQueue).toContain("4,5");
    expect(cpu.targetQueue).toContain("6,5");
    expect(cpu.targetQueue).toContain("5,4");
    expect(cpu.targetQueue).toContain("5,6");
  });

  test("switches back to hunt mode after miss with empty queue", () => {
    cpu.mode = "target";
    cpu.targetQueue = [];
    cpu.processMiss();
    expect(cpu.mode).toBe("hunt");
  });

  test("stays in target mode if queue is not empty", () => {
    cpu.mode = "target";
    cpu.targetQueue = ["1,1"];
    cpu.processMiss();
    expect(cpu.mode).toBe("target");
  });
});
