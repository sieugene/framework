import {
  APPLY_STYLE,
  CHANGE_STYLES,
  CHANGE_TEXT,
  CHANGE_TITLE,
  TABLE_RESIZE,
  UPDATE_DATE,
} from "./types";

export function rootReducer(state, action) {
  let field;
  let val;
  if (process.env.NODE_ENV === "development") {
    console.log(`ACTION____${action.type}:`, action);
  }

  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === "col" ? "colState" : "rowState";
      return {
        ...state,
        [field]: value(state, field, action),
      };
    case CHANGE_TEXT:
      field = "dataState";
      return {
        ...state,
        currentText: action.data.value,
        [field]: value(state, field, action),
      };
    case CHANGE_STYLES:
      return { ...state, currentStyles: action.data };
    case APPLY_STYLE:
      field = "styleState";
      val = state[field] || {};
      action.data.ids.forEach((id) => {
        val[id] = { ...val[id], ...action.data.value };
      });
      return {
        ...state,
        [field]: val,
        currentStyles: { ...state.currentStyles, ...action.data.value },
      };
    case CHANGE_TITLE:
      return {
        ...state,
        title: action.title,
      };
    case UPDATE_DATE:
      return {
        ...state,
        openedDate: new Date().toJSON(),
      };
    default:
      return state;
  }
}

const value = (state, field, action) => {
  const val = state[field] || {};
  val[action.data.id] = action.data.value;
  return val;
};
