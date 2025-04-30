import { MD3DarkTheme, MD3LightTheme, adaptNavigationTheme } from "react-native-paper";
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from "@react-navigation/native";
import merge from "deepmerge";

// Change Material Dark Theme Primary Color
const MaterialDarkTheme = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        primary: "#4f378b",
    },
};

// Change Material Light Theme Primary Color
const MaterialLightTheme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        primary: "#4f378b",
    },
};

// Generate Light and Dark themes from Expo Router Navigation
const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
});

// Generate Combined Themes for Dark and Light
export const PaperLight = merge(LightTheme, MaterialLightTheme);
export const PaperDark = merge(DarkTheme, MaterialDarkTheme);
