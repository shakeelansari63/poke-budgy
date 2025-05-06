import { Settings } from "../../model/settings";
import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState: Settings = {
    currency: "USD",
    theme: "device",
};

const settingSlice = createSlice({
    name: "setting",
    initialState: initialState,
    reducers: {
        loadSettings: (state, action) => {
            const settings = action.payload as Settings;
            state.currency = settings.currency;
            state.theme = settings.theme;
        },

        setCurrency: (state, action) => {
            state.currency = action.payload as string;
        },

        setTheme: (state, action) => {
            state.theme = action.payload as "dark" | "light" | "device";
        },
    },
});

export const { loadSettings, setCurrency, setTheme } = settingSlice.actions;

export default settingSlice.reducer;
