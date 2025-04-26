import { ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function History() {
    return (
        <SafeAreaView>
            <ScrollView>
                <Text>History Page</Text>
            </ScrollView>
        </SafeAreaView>
    );
}
