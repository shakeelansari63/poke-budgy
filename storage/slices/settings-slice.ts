import { PersistentStoreModel } from "@/model/persistent";
import { Settings } from "../../model/settings";
import { createSlice } from "@reduxjs/toolkit";
import { DataStore } from "../persistent-store";
import { ThemeColors } from "../../constants/colors";

const initialState: Settings = {
    currency: "USD",
    theme: "device",
    color: ThemeColors[0].base,
};

const settingSlice = createSlice({
    name: "setting",
    initialState: initialState,
    reducers: {
        loadSettings: (state, action) => {
            const settings = action.payload as Settings;
            state.currency = settings.currency;
            state.theme = settings.theme;
            state.color = settings.color;
        },

        loadSettingsFromStore: (state, action) => {
            const settings = DataStore.getSettings();
            state.currency = settings?.currency ?? "USD";
            state.theme = settings?.theme ?? "device";
            state.color = settings?.color ?? ThemeColors[0].base;
        },

        setCurrency: (state, action) => {
            state.currency = action.payload as string;
        },

        setTheme: (state, action) => {
            state.theme = action.payload as "dark" | "light" | "device";
        },

        setColor: (state, action) => {
            state.color = action.payload as string;
        },

        resetSetting: (state, action) => {
            state.currency = initialState.currency;
            state.theme = initialState.theme;
            state.color = initialState.color;
        },
    },
});

export const { loadSettingsFromStore, setCurrency, setTheme, setColor, resetSetting } = settingSlice.actions;

export default settingSlice.reducer;
