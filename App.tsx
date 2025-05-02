import { useColorScheme } from "react-native";
import { ThemeProvider } from "@react-navigation/native";
import { PaperProvider, Portal } from "react-native-paper";
import { PaperDark, PaperLight } from "./constants/theme";
import { Provider } from "react-redux";
import store from "./storage/store";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import TabLayout from "./pages/main";

export default function App() {
    // Get system Color Scheme
    const colorScheme = useColorScheme();

    // Use Theme based on System COlor scheme
    const paperTheme = colorScheme === "dark" ? PaperDark : PaperLight;

    return (
        <PaperProvider theme={paperTheme}>
            <ThemeProvider value={paperTheme}>
                <Provider store={store}>
                    <SafeAreaProvider>
                        <Portal.Host>
                            <GestureHandlerRootView>
                                <BottomSheetModalProvider>
                                    <TabLayout />
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
