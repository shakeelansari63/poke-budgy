import { View } from "react-native";
import React from "react";
import { Card, Portal, Dialog, Button, Text, IconButton, useTheme } from "react-native-paper";
import { ExpenseCategory, Expense } from "../model/expense";
import { useDispatch } from "react-redux";
import { deleteExpense } from "../storage/slices/budget-slice";
import SwipeableFlatList from "rn-gesture-swipeable-flatlist";
import BudgetSpendLine from "../components/budget-spend-line";

interface BudgetSpendSectionProps {
    expenseCategory: ExpenseCategory;
}

const BudgetSpendSection = ({ expenseCategory }: BudgetSpendSectionProps) => {
    const [expenseToDelete, setExpenseToDelete] = React.useState<Expense | null>(null);
    const [deleteModalVisible, setDeleteModalVisible] = React.useState<boolean>(false);
    const theme = useTheme();
    const dispactch = useDispatch();

    const delExpense = () => {
        if (expenseToDelete)
            dispactch(deleteExpense({ categoryId: expenseCategory.Id, expenseId: expenseToDelete.Id }));
        setDeleteModalVisible(false);
        setExpenseToDelete(null);
    };

    const deletePressHandler = (expense: Expense) => {
        setExpenseToDelete(expense);
        setDeleteModalVisible(true);
    };

    return (
        <>
            <Card style={{ margin: 10 }}>
                {expenseCategory.Expenses.length > 0 ? (
                    <View>
                        <Card.Title title="Expenditure" />
                        <Card.Content>
                            <SwipeableFlatList
                                swipeableProps={{
                                    dragOffsetFromRightEdge: 50,
                                }}
                                data={expenseCategory.Expenses}
                                keyExtractor={(expense: Expense) => expense.Id}
                                renderItem={({ item }: { item: Expense }) => (
                                    <BudgetSpendLine expense={item} categoryId={expenseCategory.Id} />
                                )}
                                enableOpenMultipleRows={false}
                                renderRightActions={(item: Expense) => (
                                    <View style={{ backgroundColor: theme.colors.errorContainer }}>
                                        <IconButton icon="trash-can-outline" onPress={() => deletePressHandler(item)} />
                                    </View>
                                )}
                            />
                        </Card.Content>
                    </View>
                ) : (
                    <Card.Title title="No Expenses in this Category yet" />
                )}
            </Card>
            <Portal>
                <Dialog
                    visible={deleteModalVisible}
                    style={{ margin: 15 }}
                    onDismiss={() => setDeleteModalVisible(false)}
                >
                    <Dialog.Title>Are you sure?</Dialog.Title>
                    <Dialog.Content>
                        <Text>Are you sure you want to delete the Expense "{expenseToDelete?.Comment}"?</Text>
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
                        <Button mode="text" textColor={theme.colors.error} icon="trash-can" onPress={delExpense}>
                            Delete
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </>
    );
};

export default BudgetSpendSection;
