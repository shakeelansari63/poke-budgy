import { PaperProvider } from "react-native-paper";
import Main from "./pages/Main";
import { Theme } from "./constants/Theme";
import { useColorScheme, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function App() {
    const theme = useColorScheme() === "dark" ? Theme.dark : Theme.light;
    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                <SafeAreaProvider>
                    <SafeAreaView style={styles.container}>
                        <StatusBar />
                        <Main />
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
