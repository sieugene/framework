const CODES = {
  A: 65,
  Z: 90,
};

// const toCell = (row, col) => {
//   return `<div class="cell" contenteditable data-col=${col} data-row=${row}
//   ></div>`;
// };

const toCell = (row) => {
  return function(_, col) {
    return `<div class="cell" 
            contenteditable 
            data-col="${col}" 
            data-row="${row}"
            data-id="${row}:${col}"
            >
            </div>`;
  };
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
  const rows = [];
  rows.push(createRow(cols, null));
  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill("")
      // .map((_, col) => toCell(row, col))
      .map(toCell(row))
      .join("");
    rows.push(createRow(cells, row + 1));
  }
  return rows.join("");
};
