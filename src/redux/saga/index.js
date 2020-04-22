import { categoryFetchSaga } from "./categorySaga";
import { spawn } from "redux-saga/effects";

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield spawn(categoryFetchSaga);
}
