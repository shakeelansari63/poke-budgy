import { useLocalSearchParams, useRouter } from "expo-router";
import { SectionList, View } from "react-native";
import React from "react";
import { ExpenseCategory } from "../model/expense";

import FabBudgetPage from "../components/fab-budget-page";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useSelector } from "react-redux";
import { BudgetState, StoreState } from "../model/store";
import { Budget } from "../model/budget";

import EditExpenseCategoryDialog from "../components/edit-expense-category-dialog";
import BudgetSpendSummarySection from "@/components/budget-spend-summary-section";
import BudgetSpendSection from "@/components/budget-spend-section";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TopAppBar from "@/components/top-app-bar";

const BudgetExpenses = () => {
  const { budgetId, categoryId } = useLocalSearchParams() as {
    budgetId: string;
    categoryId: string;
  };
  const router = useRouter();

  const sheetRef = React.useRef<BottomSheetModal>(null);
  const allBudgets = useSelector<StoreState, BudgetState>(
    (state) => state.budget,
  );
  let budgetToUse: Budget | null = null;
  let isEditable: boolean = false;

  if (budgetId === allBudgets.activeBudget?.Id) {
    budgetToUse = allBudgets.activeBudget;
    isEditable = true;
  } else {
    const pastBudget =
      allBudgets.pastBudgets.find((bdgt) => bdgt.Id === budgetId) ?? null;
    budgetToUse = pastBudget;
  }

  const expenseCategory: ExpenseCategory = budgetToUse?.Expenses.find(
    (exp) => exp.Id === categoryId,
  ) ?? {
    Id: "",
    Amount: 0,
    Category: "",
    Expenses: [],
  };

  const sections = [
    {
      data: [
        {
          id: 0,
          node: <BudgetSpendSummarySection expenseCategory={expenseCategory} />,
        },
      ],
    },
    {
      data: [
        {
          id: 1,
          node: (
            <BudgetSpendSection
              expenseCategory={expenseCategory}
              isEditable={isEditable}
            />
          ),
        },
      ],
    },
    {
      data: [
        {
          id: 2,
          node: <View style={{ paddingBottom: useSafeAreaInsets().bottom }} />,
        },
      ],
    },
  ];

  return (
    <>
      <TopAppBar
        backAction={router.back}
        rightIcon={isEditable ? "pencil" : undefined}
        rightAction={isEditable ? () => sheetRef.current?.present() : undefined}
        title={expenseCategory.Category}
      />
      {isEditable && (
        <EditExpenseCategoryDialog
          sheetRef={sheetRef}
          expenseCat={expenseCategory}
        />
      )}
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
