import { PersistentStoreModel } from "@/model/persistent";
import { Settings } from "../../model/settings";
import { createSlice, nanoid } from "@reduxjs/toolkit";
import { DataStore } from "../persistent-store";

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

        loadSettingsFromStore: (state, action) => {
            const settings = DataStore.getSettings();
            state.currency = settings?.currency ?? "USD";
            state.theme = settings?.theme ?? "device";
        },

        setCurrency: (state, action) => {
            state.currency = action.payload as string;
        },

        setTheme: (state, action) => {
            state.theme = action.payload as "dark" | "light" | "device";
        },

        resetSetting: (state, action) => {
            state.currency = initialState.currency;
            state.theme = initialState.theme;
        },
    },
});

export const { loadSettingsFromStore, setCurrency, setTheme, resetSetting } = settingSlice.actions;

export default settingSlice.reducer;
