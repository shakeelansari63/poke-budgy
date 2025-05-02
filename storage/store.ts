import { configureStore, combineReducers } from "@reduxjs/toolkit";
import budgetReducer from "./slices/budget-slice";
import { dateFormatMiddleware } from "./middlewares/date-middleware";
import { persistStore } from "./middlewares/persistent-storage";
import devToolsEnhancer from "redux-devtools-expo-dev-plugin";

const store = configureStore({
    reducer: combineReducers({ budget: budgetReducer }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dateFormatMiddleware).concat(persistStore),
    enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(devToolsEnhancer()),
});

export default store;
