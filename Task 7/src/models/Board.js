export class Board {
  constructor(size = 10) {
    this.size = size;
    this.grid = this.createEmptyGrid();
  }

  createEmptyGrid() {
    return Array(this.size)
      .fill(null)
      .map(() => Array(this.size).fill("~"));
  }

  placeShip(ship, positions) {
    positions.forEach(({ row, col }) => {
      this.grid[row][col] = "S";
    });
  }

  markHit(row, col) {
    this.grid[row][col] = "X";
  }

  markMiss(row, col) {
    this.grid[row][col] = "O";
  }

  getCell(row, col) {
    return this.grid[row][col];
  }

  isValidPosition(row, col) {
    return row >= 0 && row < this.size && col >= 0 && col < this.size;
  }

  isCellEmpty(row, col) {
    return this.grid[row][col] === "~";
  }

  toString(hideShips = false) {
    const lines = [];
    // Добавляем заголовок с номерами столбцов
    let header = "  ";
    for (let h = 0; h < this.size; h++) {
      header += h + " ";
    }
    lines.push(header);

    // Добавляем строки с данными
    for (let i = 0; i < this.size; i++) {
      let row = i + " ";
      for (let j = 0; j < this.size; j++) {
        const cell = this.grid[i][j];
        row += (hideShips && cell === "S" ? "~" : cell) + " ";
      }
      lines.push(row);
    }
    return lines;
  }
}
