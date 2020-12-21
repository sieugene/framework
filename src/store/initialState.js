import { defaultStyles, defaultTitle } from "../constants";
import { clone, storage } from "./../core/Utils";

export const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  styleState: {},
  currentText: "",
  currentStyles: {
    ...defaultStyles,
  },
  title: defaultTitle,
};

const normalize = (state) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: "",
});
export const initialState = storage("excel-state")
  ? normalize(storage("excel-state"))
  : defaultState;

export const normalizeInitialState = (state) => {
  return state ? normalize(state) : clone(defaultState);
};
