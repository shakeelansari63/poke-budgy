import { configureStore } from "@reduxjs/toolkit";
import budgetReducer from "./slices/budget-slice";

const store = configureStore({
    reducer: budgetReducer,
});

export default store;
