import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { Icon } from "react-native-paper";
import { useDispatch } from "react-redux";
import { loadBudgets } from "../../storage/slices/budget-slice";
import { BudgetState } from "../../model/store";
import { BudgetStore } from "../../storage/persistent-store";

export default function TabLayout() {
    const dispatch = useDispatch();
    React.useEffect(() => {
        const initialState: BudgetState = {
            activeBudget: BudgetStore.getActiveBudget(),
            pastBudgets: BudgetStore.getInactiveBudgets(),
        };
        dispatch(loadBudgets(initialState));
    }, []);

    return (
        <Tabs
            screenOptions={{
                headerShown: true,
                tabBarStyle: Platform.select({
                    ios: {
                        position: "absolute",
                    },
                    default: {},
                }),
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "My Budget",
                    tabBarIcon: ({ color }) => <Icon size={28} source="book" color={color} />,
                }}
            />
            <Tabs.Screen
                name="trends"
                options={{
                    title: "Trend",
                    tabBarIcon: ({ color }) => <Icon size={28} source="trending-up" color={color} />,
                }}
            />
            <Tabs.Screen
                name="history"
                options={{
                    title: "Past Budgets",
                    tabBarIcon: ({ color }) => <Icon size={28} source="book-clock" color={color} />,
                }}
            />
        </Tabs>
    );
}
