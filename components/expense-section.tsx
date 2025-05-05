import { Text, Card, IconButton, Avatar, Portal, Dialog, Button, useTheme } from "react-native-paper";
import { useSelector } from "react-redux";
import { StoreState } from "../model/store";
import { Budget } from "../model/budget";
import ExpenseCategoryLine from "./expense-category-line";
import EditExpenseCategoryDialog from "./edit-expense-category-dialog";
import React from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { ExpenseCategory } from "../model/expense";
import { View } from "react-native";
import SwipeableFlatList from "rn-gesture-swipeable-flatlist";
import { useDispatch } from "react-redux";
import { deleteExpenseCategory } from "../storage/slices/budget-slice";

const ExpenseSection = () => {
    const currentBudget = useSelector<StoreState, Budget | null>((state) => state.budget.activeBudget);
    const totalBudgeted = currentBudget?.Expenses.reduce((acc, category) => acc + category.Amount, 0);
    const sheetRef = React.useRef<BottomSheetModal>(null);
    const [expenseCategoryToDelete, setExpenseCategoryToDelete] = React.useState<ExpenseCategory | null>(null);
    const [deleteModalVisible, setDeleteModalVisible] = React.useState<boolean>(false);
    const theme = useTheme();
    const dispactch = useDispatch();

    const delExpenseCategory = () => {
        if (expenseCategoryToDelete) dispactch(deleteExpenseCategory(expenseCategoryToDelete.Id));
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
                    subtitle={"Total: " + totalBudgeted}
                    left={() => <Avatar.Icon icon="basket" size={40} />}
                    right={() => (
                        <IconButton
                            icon="plus"
                            onPress={() => {
                                sheetRef.current?.present();
                            }}
                        />
                    )}
                />
                <Card.Content>
                    {currentBudget === null ? (
                        <Text>No active budget</Text>
                    ) : (
                        <SwipeableFlatList
                            data={currentBudget.Expenses}
                            keyExtractor={(expense: ExpenseCategory) => expense.Id}
                            renderItem={({ item }: { item: ExpenseCategory }) => <ExpenseCategoryLine budget={item} />}
                            enableOpenMultipleRows={false}
                            renderRightActions={(item: ExpenseCategory) => (
                                <View style={{ backgroundColor: theme.colors.errorContainer }}>
                                    <IconButton icon="trash-can-outline" onPress={() => deletePressHandler(item)} />
                                </View>
                            )}
                        />
                    )}
                </Card.Content>
            </Card>
            <Portal>
                <Dialog
                    visible={deleteModalVisible}
                    style={{ margin: 15 }}
                    onDismiss={() => setDeleteModalVisible(false)}
                >
                    <Dialog.Title>Are you sure?</Dialog.Title>
                    <Dialog.Content>
                        <Text>Are you sure you want to delete the Budget "{expenseCategoryToDelete?.Category}"?</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button
                            mode="text"
                            textColor={theme.colors.onBackground}
                            icon="cancel"
                            onPress={() => setDeleteModalVisible(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            mode="text"
                            textColor={theme.colors.error}
                            icon="trash-can"
                            onPress={delExpenseCategory}
                        >
                            Delete
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </>
    );
};

export default ExpenseSection;
