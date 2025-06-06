import { MD3DarkTheme, MD3LightTheme, adaptNavigationTheme } from "react-native-paper";
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from "@react-navigation/native";
import merge from "deepmerge";
import colors, { ThemeColors } from "@/constants/colors";
import { SuccessColor } from "@/constants/colors";

const themeProp = {
    ...MD3DarkTheme,
    colors: {
        ...ThemeColors[0].darkColors.colors,
        success: SuccessColor.dark,
    },
};

export type AppTheme = typeof themeProp;

export const buildTheme = (primaryColor?: string) => {
    // Find Colors Object
    const themeColors =
        ThemeColors.find((col) => col.base.toUpperCase() === primaryColor?.toUpperCase()) ?? ThemeColors[0];

    // Change Material Dark Theme Primary Color
    const MaterialDarkTheme = {
        ...MD3DarkTheme,
        colors: { ...themeColors.darkColors.colors, success: SuccessColor.dark },
    };

    // Change Material Light Theme Primary Color
    const MaterialLightTheme = {
        ...MD3LightTheme,
        colors: { ...themeColors.lightColors.colors, success: SuccessColor.light },
    };

    // Generate Light and Dark themes from Expo Router Navigation
    const { LightTheme, DarkTheme } = adaptNavigationTheme({
        reactNavigationLight: NavigationDefaultTheme,
        reactNavigationDark: NavigationDarkTheme,
    });

    // Generate Combined Themes for Dark and Light
    const PaperLight = merge(LightTheme, MaterialLightTheme);
    const PaperDark = merge(DarkTheme, MaterialDarkTheme);

    // Return Light and Dark themes in List
    return { lightTheme: PaperLight, darkTheme: PaperDark };
};
