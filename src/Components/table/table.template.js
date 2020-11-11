const CODES = {
  A: 65,
  Z: 90,
};

const createCell = (_, col) => {
  return `<div class="cell" contenteditable data-col=${col}></div>`;
};
const toColumn = (col, index) => {
  return `
  <div class="column" data-type="resizable" data-col=${index}>
    ${col}
    <div class="col-resize" data-resize="col"></div>
  </div>`;
};
const createRow = (content, number) => {
  const iterate = number ? String(number) : "";
  const resizer = iterate && `<div class="row-resize" data-resize="row"></div>`;
  return `
    <div class="row" data-row=${number} data-type="resizable">
    <div class="row-info">
      ${iterate}
      ${resizer}
    </div>
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
  rows.push(createRow(cols, null));
  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(cells, i + 1));
  }
  return rows.join("");
};
