import { ScrollView } from "react-native";
import { Text } from "react-native-paper";
import SafeView from "../components/safe-area-view";

export default function History() {
    return (
        <SafeView>
            <ScrollView>
                <Text>History Page</Text>
            </ScrollView>
        </SafeView>
    );
}
