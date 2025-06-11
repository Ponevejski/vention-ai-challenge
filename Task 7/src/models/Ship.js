export class Ship {
  constructor(length) {
    this.length = length;
    this.positions = [];
    this.hits = new Set();
  }

  addPosition(row, col) {
    this.positions.push({ row, col });
  }

  isHit(row, col) {
    return this.hits.has(`${row},${col}`);
  }

  recordHit(row, col) {
    this.hits.add(`${row},${col}`);
  }

  isSunk() {
    return this.hits.size === this.length;
  }

  getPositions() {
    return this.positions;
  }
}
