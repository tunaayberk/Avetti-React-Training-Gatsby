import { CATEGORY_API_SUCCESS, CATEGORY_API_ERROR } from "../types.js";

const initialState = {
  categoryItems: {},
  error: ""
};

const categoryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CATEGORY_API_ERROR:
      return {
        ...state,
        error: payload
      };
    case CATEGORY_API_SUCCESS:
      return {
        ...state,
        categoryItems: {
          ...state.categoryItems,
          [payload.cid]: payload.data
        }
      };
    default:
      return state;
  }
};

export default categoryReducer;
