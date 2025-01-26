import { PaperProvider } from "react-native-paper";
import Main from "./pages/Main";
import { Theme } from "./constants/Theme";
import { useColorScheme, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Icon from "./constants/Icons";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
    const theme = useColorScheme() === "dark" ? Theme.dark : Theme.light;
    return (
        <PaperProvider
            theme={theme}
            settings={{ icon: (props) => <Icon {...props} /> }}
        >
            <NavigationContainer>
                <SafeAreaProvider>
                    <SafeAreaView style={styles.container}>
                        <GestureHandlerRootView>
                            <StatusBar />
                            <BottomSheetModalProvider>
                                <Main />
                            </BottomSheetModalProvider>
                        </GestureHandlerRootView>
                    </SafeAreaView>
                </SafeAreaProvider>
            </NavigationContainer>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
});
