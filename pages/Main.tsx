import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import Icon from "../constants/Icons";
import CurrentBudget from "./CurrentBudget";
import PastBudgets from "./PastBudgets";
import FloatingAction from "../components/FloatingAction";
import NewBudget from "./NewBudget";
import React, { useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const Tab = createMaterialBottomTabNavigator();

const Main = () => {
    // ref
    const newBudgetBottomSheetRef: React.RefObject<BottomSheetModal> =
        useRef<BottomSheetModal>(null);

    return (
        <>
            <Tab.Navigator>
                <Tab.Screen
                    name="Current"
                    component={CurrentBudget}
                    options={{
                        tabBarLabel: "Current Budget",
                        tabBarIcon: ({ color }: any) => {
                            return <Icon name="home" size={26} color={color} />;
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
                                <Icon name="history" size={26} color={color} />
                            );
                        },
                    }}
                />
            </Tab.Navigator>
            <FloatingAction
                visible={true}
                newBudgetRef={newBudgetBottomSheetRef}
            />
            <NewBudget bottomSheetRef={newBudgetBottomSheetRef} />
        </>
    );
};

export default Main;
