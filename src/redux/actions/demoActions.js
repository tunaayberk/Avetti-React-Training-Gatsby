import { ADD_ACTION, DEC_ACTION, CUSTOM_CHANGE } from "../types.js";

export const addResult = () => ({
  type: ADD_ACTION
});

export const decResult = () => ({
  type: DEC_ACTION
});

export const customChange = data => ({
  type: CUSTOM_CHANGE,
  payload: data
});

export const thunkCustomChange = data => {
  return dispatch => {
    let tempNumber = data * 3;

    dispatch(customChange(tempNumber));
  };
};
