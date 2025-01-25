import { PaperProvider } from "react-native-paper";
import Main from "./pages/Main";
import { Theme } from "./constants/Theme";
import { useColorScheme } from "react-native";

export default function App() {
    const theme = useColorScheme() === "dark" ? Theme.dark : Theme.light;
    return (
        <PaperProvider theme={theme}>
            <Main />
        </PaperProvider>
    );
}
