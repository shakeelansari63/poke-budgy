import { configureStore } from "@reduxjs/toolkit";
import budgetReducer from "./slices/budget-slice";
import { dateFormatMiddleware } from "./middlewares/date-middleware";

const store = configureStore({
    reducer: budgetReducer,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dateFormatMiddleware),
});

export default store;
