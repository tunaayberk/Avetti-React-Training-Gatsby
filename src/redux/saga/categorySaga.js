import { takeLatest } from "redux-saga/effects";

import { CATEGORY_API_REQUEST } from "../types";

import { newCategoryRequest } from "../actions/categoryActions";

export function* categoryFetchSaga() {
  yield takeLatest(CATEGORY_API_REQUEST, newCategoryRequest);
}
