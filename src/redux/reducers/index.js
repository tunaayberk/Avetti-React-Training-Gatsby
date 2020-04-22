import demoReducer from "./demoReducer";
import categoryReducer from "./categoryReducer";
import menuReducer from "./menuReducer";

import { combineReducers } from "redux";

const allReducers = combineReducers({
  demoReducer,
  categoryReducer,
  menuReducer
});

export default allReducers;
