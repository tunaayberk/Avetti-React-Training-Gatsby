import { call, put } from "redux-saga/effects";

import {
  CATEGORY_API_REQUEST,
  CATEGORY_API_SUCCESS,
  CATEGORY_API_ERROR
} from "../types.js";

export const categorySuccess = (cid, data) => ({
  type: CATEGORY_API_SUCCESS,
  payload: { cid, data }
});

export const categoryError = data => ({
  type: CATEGORY_API_ERROR,
  payload: data
});

export const categoryFetchRequest = cid => ({
  type: CATEGORY_API_REQUEST,
  payload: cid
});

export const categoryRequest = cid => {
  return dispatch => {
    if (cid) {
      fetch(
        `https://demob2b2cpreview.avetti.io/preview/uservices/1.0.2/category-page/20180521148/cid/${cid}/lang/en/`
      )
        .then(res => res.json())
        .then(json => dispatch(categorySuccess(cid, json[1].items)))
        .catch(err => dispatch(categoryError(err)));
    }
  };
};

export function* newCategoryRequest({ payload }) {
  try {
    const categoryState = yield call(fetchFunction, payload);

    yield put(categorySuccess(payload, categoryState));
  } catch (e) {
    categoryError(e);
  }
}

const fetchFunction = async cid => {
  let tempResult = "";
  await fetch(
    `https://demob2b2cpreview.avetti.io/preview/uservices/1.0.2/category-page/20180521148/cid/${cid}/lang/en/`
  )
    .then(res => res.json())
    .then(json => {
      tempResult = json[1].items;
    })
    .catch(err => {
      return err;
    });

  return tempResult;
};
