import { Text, Card, IconButton, Avatar, useTheme } from "react-native-paper";
import { Budget } from "../model/budget";
import ExpenseCategoryLine from "./expense-category-line";
import EditExpenseCategoryDialog from "./edit-expense-category-dialog";
import React from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { ExpenseCategory } from "../model/expense";
import { useDispatch } from "react-redux";
import { deleteExpenseCategory } from "../storage/slices/budget-slice";
import { useCurrencySymbol } from "../hooks/use-settings";
import ConfirmationDialog from "./confirmation-dialog";
import SwipeableFlatList from "rn-gesture-swipeable-flatlist";
import SwipeQuickActions, { SwipeQuickActionData } from "./swipe-quick-actions";
import { numberOption } from "@/constants/app-constants";

interface ExpenseSectionProps {
  currentBudget: Budget | null;
  isActive: boolean;
}

const ExpenseSection = ({ currentBudget, isActive }: ExpenseSectionProps) => {
  const currencySymbol = useCurrencySymbol();
  const totalBudgeted = currentBudget?.Expenses.reduce(
    (acc, category) => acc + category.Amount,
    0,
  );
  const sheetRef = React.useRef<BottomSheetModal>(null);
  const [expenseCategoryToDelete, setExpenseCategoryToDelete] =
    React.useState<ExpenseCategory | null>(null);
  const [deleteModalVisible, setDeleteModalVisible] =
    React.useState<boolean>(false);
  const theme = useTheme();
  const dispatch = useDispatch();

  const delExpenseCategory = () => {
    if (expenseCategoryToDelete)
      dispatch(deleteExpenseCategory(expenseCategoryToDelete.Id));
    setDeleteModalVisible(false);
    setExpenseCategoryToDelete(null);
  };

  const deletePressHandler = (expenseCategory: ExpenseCategory) => {
    setExpenseCategoryToDelete(expenseCategory);
    setDeleteModalVisible(true);
  };

  return (
    <>
      <EditExpenseCategoryDialog sheetRef={sheetRef} />
      <Card
        mode="elevated"
        style={{ marginVertical: 10, marginHorizontal: 20 }}
      >
        <Card.Title
          title="Budgets"
          titleVariant="titleLarge"
          subtitle={
            currentBudget !== null &&
            `Total: ${currencySymbol} ${totalBudgeted?.toLocaleString("en-US", numberOption)}`
          }
          left={() => <Avatar.Icon icon="basket" size={40} />}
          right={() => {
            return (
              currentBudget !== null &&
              isActive && (
                <IconButton
                  icon="plus"
                  onPress={() => {
                    sheetRef.current?.present();
                  }}
                />
              )
            );
          }}
        />
        <Card.Content>
          {currentBudget === null ? (
            <Text>No active budget</Text>
          ) : (
            <SwipeableFlatList
              swipeableProps={{
                dragOffsetFromRightEdge: 50,
              }}
              data={currentBudget.Expenses}
              keyExtractor={(expense: ExpenseCategory) => expense.Id}
              renderItem={({
                item,
                index,
              }: {
                item: ExpenseCategory;
                index: number;
              }) => (
                <ExpenseCategoryLine
                  expenseCategory={item}
                  budgetId={currentBudget.Id}
                  isLast={index === currentBudget.Expenses.length - 1}
                  isEditable={isActive}
                />
              )}
              enableOpenMultipleRows={false}
              renderRightActions={(item: ExpenseCategory) => {
                const data: SwipeQuickActionData[] = [
                  {
                    icon: "trash-can-outline",
                    action: () => deletePressHandler(item),
                    iconColor: theme.colors.error,
                  },
                ];
                return isActive && <SwipeQuickActions data={data} />;
              }}
            />
          )}
        </Card.Content>
      </Card>
      <ConfirmationDialog
        visible={deleteModalVisible}
        title="Are you sure?"
        confirmText={`Are you sure you want to delete the Budget "${expenseCategoryToDelete?.Category}"?`}
        primaryActionName="Delete"
        primaryActionColor={theme.colors.error}
        primaryActionHandler={delExpenseCategory}
        cancelActionHandler={() => setDeleteModalVisible(false)}
      />
    </>
  );
};

export default ExpenseSection;
