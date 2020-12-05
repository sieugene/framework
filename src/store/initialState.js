import { storage } from "./../core/Utils";
export const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  currentText: "",
};

export const initialState = storage("excel-state")
  ? storage("excel-state")
  : defaultState;
