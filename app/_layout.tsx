import { useColorScheme } from "react-native";
import { ThemeProvider } from "@react-navigation/native";
import { PaperProvider, Portal } from "react-native-paper";
import { buildTheme } from "../services/theme-service";
import { Provider, useDispatch } from "react-redux";
import store from "../storage/store";
import { StatusBar, StatusBarStyle } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";
import { en, registerTranslation } from "react-native-paper-dates";
import React from "react";
import { loadBudgetFromStore } from "../storage/slices/budget-slice";
import { loadSettingsFromStore } from "../storage/slices/settings-slice";
import { useCurrentTheme, useCurrentColor } from "../hooks/use-settings";

// Register Englist Translation of Dates
registerTranslation("en", en);

export default function RootLayout() {
    // Set Splash Screen Options
    SplashScreen.setOptions({
        duration: 1500,
        fade: true,
    });

    return (
        <Provider store={store}>
            <AppMain />
        </Provider>
    );
}

const AppMain = () => {
    // Get system Color Scheme
    const colorScheme = useColorScheme();

    // Get Settings from Redux
    const appTheme = useCurrentTheme();
    const color = useCurrentColor();

    // Build Color Theme
    const { lightTheme, darkTheme } = buildTheme(color);

    // Use Theme based on User theme setting and System Color scheme
    const paperTheme =
        appTheme === "device" && colorScheme === "dark"
            ? darkTheme
            : appTheme === "device" && colorScheme === "light"
            ? lightTheme
            : appTheme === "dark"
            ? darkTheme
            : lightTheme;

    const statusBarStyle: StatusBarStyle = appTheme === "device" ? "auto" : appTheme === "dark" ? "light" : "dark";

    const dispatch = useDispatch();

    React.useEffect(() => {
        // Dispatch all load actions
        dispatch(loadBudgetFromStore({}));
        dispatch(loadSettingsFromStore({}));
    }, []);

    return (
        <PaperProvider theme={paperTheme}>
            <ThemeProvider value={paperTheme}>
                <SafeAreaProvider>
                    <Portal.Host>
                        <GestureHandlerRootView>
                            <BottomSheetModalProvider>
                                <AppRouterStack />
                            </BottomSheetModalProvider>
                        </GestureHandlerRootView>
                    </Portal.Host>
                </SafeAreaProvider>
                <StatusBar style={statusBarStyle} />
            </ThemeProvider>
        </PaperProvider>
    );
};

const AppRouterStack = () => {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="settings" />
            <Stack.Screen name="budget-expense" />
            <Stack.Screen name="past-budget-view" />
            <Stack.Screen name="+not-found" />
        </Stack>
    );
};
