import { defaultStyles } from "../constants";
import { storage } from "./../core/Utils";
export const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  currentText: "",
  currentStyles: {
    ...defaultStyles,
  },
};

export const initialState = storage("excel-state")
  ? storage("excel-state")
  : defaultState;
