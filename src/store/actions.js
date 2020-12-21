import {
  CHANGE_TEXT,
  TABLE_RESIZE,
  CHANGE_STYLES,
  APPLY_STYLE,
  CHANGE_TITLE,
  UPDATE_DATE,
} from "./types";

export const tableResize = (data) => {
  return {
    type: TABLE_RESIZE,
    data,
  };
};

export const changeText = (data) => {
  return {
    type: CHANGE_TEXT,
    data,
  };
};

export const changeStyles = (data) => {
  return {
    type: CHANGE_STYLES,
    data,
  };
};

export const applyStyle = (data) => {
  return {
    type: APPLY_STYLE,
    data,
  };
};

export const changeTitle = (title) => {
  return {
    type: CHANGE_TITLE,
    title,
  };
};

export const updateDate = () => {
  return {
    type: UPDATE_DATE,
  };
};
