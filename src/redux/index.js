import { createStore, applyMiddleware, compose } from "redux";
import allReducer from "./reducers";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import rootSaga from "./saga/index";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
  const store = createStore(
    allReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware, thunk))
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
