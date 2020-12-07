import { defaultStyles } from "../constants";
import { storage } from "./../core/Utils";
export const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  styleState: {},
  currentText: "",
  currentStyles: {
    ...defaultStyles,
  },
};

const normalize = (state) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: "",
});
export const initialState = storage("excel-state")
  ? normalize(storage("excel-state"))
  : defaultState;
