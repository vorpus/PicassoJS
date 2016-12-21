const Cell = require('./cell');

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById('canvas');
  const ctx = root.getContext('2d');

  let testCell = new Cell({vertices: [[0,0], [0,100], [50,50], [50,0]]});
  testCell.draw(ctx)
});
