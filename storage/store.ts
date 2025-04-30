import { configureStore } from "@reduxjs/toolkit";
import budgetReducer from "./slices/budget-slice";
import { dateFormatMiddleware } from "./middlewares/date-middleware";
import { persistStore } from "./middlewares/persistent-storage";

const store = configureStore({
    reducer: budgetReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dateFormatMiddleware).concat(persistStore),
});

export default store;
