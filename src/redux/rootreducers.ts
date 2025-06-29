import { combineReducers } from "@reduxjs/toolkit";
import globalDataReducer from "./globalData/reducer";
import productsReducer from "./products/reducer";

export const rootReducers = combineReducers({
  globalData: globalDataReducer,
  products: productsReducer,
});
export type RootState = ReturnType<typeof rootReducers>;
