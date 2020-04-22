import { MENU_POPULATE } from "../types.js";

export const menuPopulate = data => ({
  type: MENU_POPULATE,
  payload: data
});
