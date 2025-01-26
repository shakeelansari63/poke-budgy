import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import Icon from "../constants/Icons";
import CurrentBudget from "./CurrentBudget";
import PastBudgets from "./PastBudgets";
import FloatingAction from "../components/FloatingAction";
import NewBudget from "./NewBudget";
import React, { useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Portal } from "react-native-paper";

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
                    options={{
                        tabBarLabel: "Current Budget",
                        tabBarIcon: ({ color }: any) => {
                            return (
                                <Icon name="wallet" size={26} color={color} />
                            );
                        },
                    }}
                >
                    {() => <BudgetPage bsRef={newBudgetBottomSheetRef} />}
                </Tab.Screen>
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
            <NewBudget bottomSheetRef={newBudgetBottomSheetRef} />
        </>
    );
};

export default Main;

interface Props {
    bsRef: React.RefObject<BottomSheetModal>;
}
const BudgetPage = ({ bsRef }: Props) => {
    return (
        <Portal.Host>
            <CurrentBudget />
            <FloatingAction visible={true} newBudgetRef={bsRef} />
        </Portal.Host>
    );
};
