import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { Icon, Avatar, useTheme, Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import { loadBudgets } from "../../storage/slices/budget-slice";
import { BudgetState } from "../../model/store";
import { BudgetStore } from "../../storage/persistent-store";
import { HapticTab } from "@/components/haptic-tabs";

export default function TabLayout() {
    const dispatch = useDispatch();
    const theme = useTheme();
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
                headerTitleAlign: "center",
                headerShown: true,
                tabBarButton: HapticTab,
                headerLeft: () => (
                    <Avatar.Image
                        size={48}
                        source={require("../../assets/images/icon-circle.png")}
                        style={{ marginLeft: 10 }}
                    />
                ),
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
                    tabBarIcon: ({ size, focused }) => (
                        <Icon
                            size={size}
                            source={focused ? "book" : "book-outline"}
                            color={focused ? theme.colors.onPrimaryContainer : theme.colors.onBackground}
                        />
                    ),
                    tabBarLabel: ({ children, focused }) => (
                        <Text
                            variant="labelMedium"
                            style={{ color: focused ? theme.colors.onPrimaryContainer : theme.colors.onBackground }}
                        >
                            {children}
                        </Text>
                    ),
                }}
            />
            <Tabs.Screen
                name="trends"
                options={{
                    title: "Trend",

                    tabBarIcon: ({ size, focused }) => (
                        <Icon
                            size={size}
                            source={focused ? "chart-timeline-variant" : "chart-line-variant"}
                            color={focused ? theme.colors.onPrimaryContainer : theme.colors.onBackground}
                        />
                    ),
                    tabBarLabel: ({ children, focused }) => (
                        <Text
                            variant="labelMedium"
                            style={{ color: focused ? theme.colors.onPrimaryContainer : theme.colors.onBackground }}
                        >
                            {children}
                        </Text>
                    ),
                }}
            />
            <Tabs.Screen
                name="history"
                options={{
                    title: "Past Budgets",

                    tabBarIcon: ({ size, focused }) => (
                        <Icon
                            size={size}
                            source={focused ? "clock" : "clock-outline"}
                            color={focused ? theme.colors.onPrimaryContainer : theme.colors.onBackground}
                        />
                    ),
                    tabBarLabel: ({ children, focused }) => (
                        <Text
                            variant="labelMedium"
                            style={{ color: focused ? theme.colors.onPrimaryContainer : theme.colors.onBackground }}
                        >
                            {children}
                        </Text>
                    ),
                }}
            />
        </Tabs>
    );
}
