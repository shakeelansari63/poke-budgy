import { Text, Card, IconButton, Avatar, Portal, Dialog, Button, useTheme } from "react-native-paper";
import { useSelector } from "react-redux";
import { StoreState } from "../model/store";
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

const ExpenseSection = () => {
    const currencySymbol = useCurrencySymbol();
    const currentBudget = useSelector<StoreState, Budget | null>((state) => state.budget.activeBudget);
    const totalBudgeted = currentBudget?.Expenses.reduce((acc, category) => acc + category.Amount, 0);
    const sheetRef = React.useRef<BottomSheetModal>(null);
    const [expenseCategoryToDelete, setExpenseCategoryToDelete] = React.useState<ExpenseCategory | null>(null);
    const [deleteModalVisible, setDeleteModalVisible] = React.useState<boolean>(false);
    const theme = useTheme();
    const dispatch = useDispatch();

    const delExpenseCategory = () => {
        if (expenseCategoryToDelete) dispatch(deleteExpenseCategory(expenseCategoryToDelete.Id));
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
            <Card mode="elevated" style={{ margin: 10 }}>
                <Card.Title
                    title="Budgets"
                    titleVariant="titleLarge"
                    subtitle={currentBudget !== null && `Total: ${currencySymbol} ${totalBudgeted}`}
                    left={() => <Avatar.Icon icon="basket" size={40} />}
                    right={() => {
                        return (
                            currentBudget !== null && (
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
                            renderItem={({ item, index }: { item: ExpenseCategory; index: number }) => (
                                <ExpenseCategoryLine
                                    budget={item}
                                    isLast={index === currentBudget.Expenses.length - 1}
                                />
                            )}
                            enableOpenMultipleRows={false}
                            renderRightActions={(item: ExpenseCategory) => {
                                const data: SwipeQuickActionData[] = [
                                    {
                                        icon: "trash-can-outline",
                                        action: () => deletePressHandler(item),
                                        backgroundColor: theme.colors.errorContainer,
                                    },
                                ];
                                return <SwipeQuickActions data={data} />;
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
