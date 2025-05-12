import { useNavigation, useLocalSearchParams } from "expo-router";
import { SectionList, View } from "react-native";
import { IconButton } from "react-native-paper";
import React from "react";
import { useLayoutEffect } from "react";
import { ExpenseCategory } from "../model/expense";

import FabBudgetPage from "../components/fab-budget-page";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useSelector } from "react-redux";
import { BudgetState, StoreState } from "../model/store";
import { Budget } from "../model/budget";

import EditExpenseCategoryDialog from "../components/edit-expense-category-dialog";
import BudgetSpendSummarySection from "@/components/budget-spend-summary-section";
import BudgetSpendSection from "@/components/budget-spend-section";

const BudgetExpenses = () => {
    const navigation = useNavigation();
    const { budgetId, categoryId } = useLocalSearchParams() as { budgetId: string; categoryId: string };

    const sheetRef = React.useRef<BottomSheetModal>(null);
    const allBudgets = useSelector<StoreState, BudgetState>((state) => state.budget);
    let budgetToUse: Budget | null = null;
    let isEditable: boolean = false;

    if (budgetId === allBudgets.activeBudget?.Id) {
        budgetToUse = allBudgets.activeBudget;
        isEditable = true;
    } else {
        const pastBudget = allBudgets.pastBudgets.find((bdgt) => bdgt.Id === budgetId) ?? null;
        budgetToUse = pastBudget;
    }

    const expenseCategory: ExpenseCategory = budgetToUse?.Expenses.find((exp) => exp.Id === categoryId) ?? {
        Id: "",
        Amount: 0,
        Category: "",
        Expenses: [],
    };

    const AddButton = <IconButton icon="pencil" size={24} onPress={() => sheetRef.current?.present()} />;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: expenseCategory.Category,
            headerRight: () => isEditable && AddButton,
        });
    }, [navigation]);

    const sections = [
        {
            data: [{ id: 0, node: <BudgetSpendSummarySection expenseCategory={expenseCategory} /> }],
        },
        {
            data: [{ id: 1, node: <BudgetSpendSection expenseCategory={expenseCategory} isEditable={isEditable} /> }],
        },
    ];

    return (
        <>
            {isEditable && <EditExpenseCategoryDialog sheetRef={sheetRef} expenseCat={expenseCategory} />}
            <SectionList
                sections={sections}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => item.node}
                showsVerticalScrollIndicator={false}
            />
            {isEditable && <FabBudgetPage expenseCat={expenseCategory} />}
        </>
    );
};

export default BudgetExpenses;
