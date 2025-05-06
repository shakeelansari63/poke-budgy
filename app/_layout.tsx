import { useColorScheme } from "react-native";
import { ThemeProvider } from "@react-navigation/native";
import { PaperProvider, Portal } from "react-native-paper";
import { PaperDark, PaperLight } from "../constants/theme";
import { Provider, useDispatch } from "react-redux";
import store from "../storage/store";
import { StatusBar, StatusBarStyle } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { en, registerTranslation } from "react-native-paper-dates";
import React from "react";
import { Settings } from "../model/settings";
import { loadBudgets } from "../storage/slices/budget-slice";
import { loadSettings } from "../storage/slices/settings-slice";
import { BudgetState } from "../model/store";
import { DataStore } from "../storage/persistent-store";
import { useCurrentTheme } from "../hooks/use-settings";

// Register Englist Translation of Dates
registerTranslation("en", en);

export default function RootLayout() {
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

    // Use Theme based on User theme setting and System Color scheme
    const paperTheme =
        appTheme === "device" && colorScheme === "dark"
            ? PaperDark
            : appTheme === "device" && colorScheme === "light"
            ? PaperLight
            : appTheme === "dark"
            ? PaperDark
            : PaperLight;

    const statusBarStyle: StatusBarStyle = appTheme === "device" ? "auto" : appTheme === "dark" ? "light" : "dark";

    // USe Font
    const [loaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    });

    const dispatch = useDispatch();

    React.useLayoutEffect(() => {
        const savedBudgets: BudgetState = {
            activeBudget: DataStore.getActiveBudget(),
            pastBudgets: DataStore.getInactiveBudgets(),
        };

        const savedSettings: Settings = DataStore.getSettings() ?? { currency: "USD", theme: "device" };

        dispatch(loadBudgets(savedBudgets));
        dispatch(loadSettings(savedSettings));
    }, []);

    return (
        <PaperProvider theme={paperTheme}>
            <ThemeProvider value={paperTheme}>
                <SafeAreaProvider>
                    <Portal.Host>
                        <GestureHandlerRootView>
                            <BottomSheetModalProvider>
                                <Stack
                                    screenOptions={{
                                        headerTitleAlign: "center",
                                    }}
                                >
                                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                                    <Stack.Screen name="settings" />
                                    <Stack.Screen name="budget-expense" />
                                    <Stack.Screen name="+not-found" />
                                </Stack>
                            </BottomSheetModalProvider>
                        </GestureHandlerRootView>
                    </Portal.Host>
                </SafeAreaProvider>
                <StatusBar style={statusBarStyle} />
            </ThemeProvider>
        </PaperProvider>
    );
};
