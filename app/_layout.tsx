import { useColorScheme } from "react-native";
import { ThemeProvider } from "@react-navigation/native";
import { PaperProvider, Portal } from "react-native-paper";
import { PaperDark, PaperLight } from "../constants/theme";
import { Provider } from "react-redux";
import store from "../storage/store";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function RootLayout() {
    // Get system Color Scheme
    const colorScheme = useColorScheme();

    // Use Theme based on System COlor scheme
    const paperTheme = colorScheme === "dark" ? PaperDark : PaperLight;

    // USe Font
    const [loaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    });

    return (
        <PaperProvider theme={paperTheme}>
            <ThemeProvider value={paperTheme}>
                <Provider store={store}>
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
                    <StatusBar style="auto" />
                </Provider>
            </ThemeProvider>
        </PaperProvider>
    );
}
