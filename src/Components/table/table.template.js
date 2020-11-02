const CODES = {
  A: 65,
  Z: 90,
};

const createCell = () => {
  return `<div class="cell" contenteditable></div>`;
};
const toColumn = (col) => {
  return `<div class="column">${col}</div>`;
};
const createRow = (content, number) => {
  const iterate = number !== undefined ? String(number) : "";
  return `
    <div class="row">
    <div class="row-info">${iterate}</div>
    <div class="row-data">
    ${content}
    </div>
  </div>`;
};

const toChar = (_, char) => {
  return String.fromCharCode(CODES.A + char);
};
export const createTable = (rowsCount = 15) => {
  const colsCount = CODES.Z - CODES.A + 1;
  const cols = new Array(colsCount).fill("").map(toChar).map(toColumn).join("");
  const cells = new Array(colsCount).fill("").map(createCell).join("");
  const rows = [];
  rows.push(createRow(cols));
  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(cells, i + 1));
  }
  return rows.join("");
};