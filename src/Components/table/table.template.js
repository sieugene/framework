const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = "120";

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + "px";
}

const toCell = (row, state) => {
  return function (_, col) {
    return `<div class="cell" 
            contenteditable 
            data-col="${col}" 
            data-row="${row}"
            data-id="${row}:${col}"
            style="width:${getWidth(state, col)}"
            data-type="cell">
            </div>`;
  };
};
const toColumn = ({ col, index, width }) => {
  return `
  <div class="column" data-type="resizable" data-col=${index} 
  style="width:${width}"
  >
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


function withWidthFrom(state) {
  return function (col, index) {
    return {
      col,
      index,
      width: getWidth(state, index),
    };
  };
}

export const createTable = (rowsCount = 15, state = {}) => {
  const colsCount = CODES.Z - CODES.A + 1;
  const cols = new Array(colsCount)
    .fill("")
    .map(toChar)
    .map(withWidthFrom(state))
    .map(toColumn)
    .join("");
  const rows = [];
  rows.push(createRow(cols, null));
  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill("")
      // .map((_, col) => toCell(row, col))
      .map(toCell(row, state))
      .join("");
    rows.push(createRow(cells, row + 1));
  }
  return rows.join("");
};
