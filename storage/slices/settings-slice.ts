import { Settings } from "../../model/settings";
import { createSlice } from "@reduxjs/toolkit";
import { DataStore } from "../persistent-store";
import { ThemeColors } from "../../constants/colors";

const initialState: Settings = {
  currency: "USD",
  theme: "device",
  color: ThemeColors[0].base,
  onboarded: false,
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
      state.onboarded = settings.onboarded;
    },

    loadSettingsFromStore: (state, action) => {
      const settings = DataStore.getSettings();
      state.currency = settings?.currency ?? initialState.currency;
      state.theme = settings?.theme ?? initialState.theme;
      state.color = settings?.color ?? initialState.color;
      state.onboarded = settings?.onboarded ?? initialState.onboarded;
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

    setOnBoarded: (state, action) => {
      state.onboarded = action.payload as boolean;
    },

    resetSetting: (state, action) => {
      state.currency = initialState.currency;
      state.theme = initialState.theme;
      state.color = initialState.color;
      state.onboarded = initialState.onboarded;
    },
  },
});

export const {
  loadSettingsFromStore,
  setCurrency,
  setTheme,
  setColor,
  setOnBoarded,
  resetSetting,
} = settingSlice.actions;

export default settingSlice.reducer;
