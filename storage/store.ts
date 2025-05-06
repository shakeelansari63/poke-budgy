import { configureStore, combineReducers } from "@reduxjs/toolkit";
import budgetReducer from "./slices/budget-slice";
import settingReducer from "./slices/settings-slice";
import { dateFormatMiddleware } from "./middlewares/date-middleware";
import { persistStore } from "./middlewares/persistent-storage";

const store = configureStore({
    reducer: combineReducers({ budget: budgetReducer, setting: settingReducer }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dateFormatMiddleware).concat(persistStore),
});

export default store;
