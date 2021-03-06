import { defaultStyles } from "../../constants";
import { toInlineStyles } from "../../core/Utils";
import { camelInDashed } from "./../../core/Utils";
import { parse } from "./../../core/parse";

const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = "120";
const DEFAULT_HEIGHT = "24";

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + "px";
}

function getHeight(state, index) {
  return ((index && state[index]) || DEFAULT_HEIGHT) + "px";
}

const toCell = (row, state) => {
  return function (_, col) {
    const id = `${row}:${col}`;
    const data = state.dataState[id] || "";
    const width = getWidth(state.colState, col);
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.styleState[id],
    });
    return `<div class="cell" 
            contenteditable 
            data-col="${col}" 
            data-row="${row}"
            data-id="${id}"
            data-value="${data || ""}"
            style="${styles && camelInDashed(styles)}; width:${width}"
            data-type="cell">${parse(data)}
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
const createRow = (content, number, state) => {
  const iterate = number ? String(number) : "";
  const resizer = iterate && `<div class="row-resize" data-resize="row"></div>`;
  return `
    <div class="row" data-row=${number} data-type="resizable"
    style="height:${getHeight(state, number)}"
    >
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
    .map(withWidthFrom(state.colState))
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
    rows.push(createRow(cells, row + 1, state.rowState));
  }
  return rows.join("");
};
