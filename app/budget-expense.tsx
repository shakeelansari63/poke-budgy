import { useNavigation, useLocalSearchParams } from "expo-router";
import { SectionList, View } from "react-native";
import { IconButton } from "react-native-paper";
import React from "react";
import { useLayoutEffect } from "react";
import { ExpenseCategory } from "../model/expense";

import FabBudgetPage from "../components/fab-budget-page";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useSelector } from "react-redux";
import { StoreState } from "../model/store";
import { Budget } from "../model/budget";

import EditExpenseCategoryDialog from "../components/edit-expense-category-dialog";
import BudgetSpendSummarySection from "@/components/budget-spend-summary-section";
import BudgetSpendSection from "@/components/budget-spend-section";

const BudgetExpenses = () => {
    const navigation = useNavigation();
    const { categoryId } = useLocalSearchParams() as { categoryId: string };

    const sheetRef = React.useRef<BottomSheetModal>(null);
    const activeBudget = useSelector<StoreState, Budget | null>((state) => state.budget.activeBudget);
    const expenseCategory: ExpenseCategory = activeBudget?.Expenses.find((exp) => exp.Id === categoryId) ?? {
        Id: "",
        Amount: 0,
        Category: "",
        Expenses: [],
    };

    const AddButton = () => <IconButton icon="pencil" size={24} onPress={() => sheetRef.current?.present()} />;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: expenseCategory.Category,
            headerRight: AddButton,
        });
    }, [navigation]);

    const sections = [
        {
            data: [{ id: 0, node: <BudgetSpendSummarySection expenseCategory={expenseCategory} /> }],
        },
        {
            data: [{ id: 1, node: <BudgetSpendSection expenseCategory={expenseCategory} /> }],
        },
    ];

    return (
        <>
            <EditExpenseCategoryDialog sheetRef={sheetRef} expenseCat={expenseCategory} />
            <SectionList
                sections={sections}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => item.node}
            />
            <FabBudgetPage expenseCat={expenseCategory} />
        </>
    );
};

export default BudgetExpenses;
