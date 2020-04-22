import { MENU_POPULATE } from "../types.js";

const initialState = {
  menu: []
};

const mainReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case MENU_POPULATE:
      return { ...state, menu: payload };
    default:
      return state;
  }
};

export default mainReducer;
