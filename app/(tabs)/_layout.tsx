import { Tabs } from "expo-router";
import Icon from "../../constants/icons";

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Current Budget",
                    tabBarIcon: ({ color }) => <Icon source="book" size={28} color={color} />,
                }}
            />
            <Tabs.Screen
                name="history"
                options={{
                    title: "Past Budgets",
                    tabBarIcon: ({ color }) => <Icon source="book-clock" size={28} color={color} />,
                }}
            />
        </Tabs>
    );
}
