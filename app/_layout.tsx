import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { ThemeProvider } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import { PaperDark, PaperLight } from "./constants/theme";
import { useEffect } from "react";
import dataStorage from "./storage/storage";
import budgets from "./dummy-data";

export default function RootLayout() {
    // Get system Color Scheme
    const colorScheme = useColorScheme();

    // Use Theme based on System COlor scheme
    const paperTheme = colorScheme === "dark" ? PaperDark : PaperLight;

    useEffect(() => {
        const storeData = dataStorage.getAllBudgets();
        if (storeData.length === 0) dataStorage.loadBudgets(budgets);
    }, []);

    return (
        <PaperProvider theme={paperTheme}>
            <ThemeProvider value={paperTheme}>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                </Stack>
            </ThemeProvider>
        </PaperProvider>
    );
}
