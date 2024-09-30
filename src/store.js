import { configureStore } from "@reduxjs/toolkit";

import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers/rootReducer";
import rootSaga from "./sagas/rootSaga";

// creating the saga middleware
const sagaMiddleware = createSagaMiddleware();

// configuring the store here

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

// running the saga
sagaMiddleware.run(rootSaga);

export default store;
