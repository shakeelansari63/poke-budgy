import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import * as Icons from "@expo/vector-icons";
import CurrentBudget from "./CurrentBudget";
import PastBudgets from "./PastBudgets";

const Tab = createMaterialBottomTabNavigator();

const Main = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Current"
                component={CurrentBudget}
                options={{
                    tabBarLabel: "Current Budget",
                    tabBarIcon: ({ color }: any) => {
                        return (
                            <Icons.FontAwesome6
                                name="money-bill-trend-up"
                                size={26}
                                color={color}
                            />
                        );
                    },
                }}
            />
            <Tab.Screen
                name="History"
                component={PastBudgets}
                options={{
                    tabBarLabel: "Past Budgets",
                    tabBarIcon: ({ color }: any) => {
                        return (
                            <Icons.FontAwesome5
                                name="history"
                                size={26}
                                color={color}
                            />
                        );
                    },
                }}
            />
        </Tab.Navigator>
    );
};

export default Main;
