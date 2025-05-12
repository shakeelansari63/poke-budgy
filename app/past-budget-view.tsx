import { View, SectionList } from "react-native";
import React from "react";
import { Budget } from "../model/budget";
import BudgetGraph from "@/components/budget-graph-card";
import IncomeSection from "@/components/income-section";
import ExpenseSection from "@/components/expense-section";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import { StoreState } from "@/model/store";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PastBudgetView = () => {
    const { budgetId } = useLocalSearchParams() as { budgetId: string };
    const budgets = useSelector<StoreState, Budget[]>((state) => state.budget.pastBudgets);
    const budget = budgets.find((bg) => bg.Id === budgetId) ?? null;
    const safeAreaInsets = useSafeAreaInsets();
    const navigation = useNavigation();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: "Past Budget Detail",
        });
    }, [navigation]);

    const sections = [
        {
            data: [{ id: 0, node: <BudgetGraph currentBudget={budget} isActive={false} /> }],
        },
        {
            data: [{ id: 1, node: <IncomeSection currentBudget={budget} isActive={false} /> }],
        },
        {
            data: [{ id: 2, node: <ExpenseSection currentBudget={budget} isActive={false} /> }],
        },
    ];

    return (
        <View style={{ paddingBottom: safeAreaInsets.bottom }}>
            <SectionList
                sections={sections}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => item.node}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default PastBudgetView;
