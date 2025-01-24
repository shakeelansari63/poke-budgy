import { Tabs } from "expo-router";
import { Icon } from "@rneui/themed";

const TabLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <Icon name="house" color={color} />
                    ),
                }}
            ></Tabs.Screen>
            <Tabs.Screen
                name="history"
                options={{
                    title: "Past Budgets",
                    tabBarIcon: ({ color }) => (
                        <Icon name="history" color={color} />
                    ),
                }}
            ></Tabs.Screen>
        </Tabs>
    );
};

export default TabLayout;
