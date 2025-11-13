import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer";
import stepsReducer from "../reducers/stepReducer";
import plotsReducer from "../reducers/plotReducer";
import questionaireReducer from "../reducers/questionaireReducer";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistStore, persistReducer } from "redux-persist";

const rootReducer = combineReducers({
  user: userReducer,
  steps: stepsReducer,
  plots: plotsReducer,
  questionaire: questionaireReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], //persist login state % profile image
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
