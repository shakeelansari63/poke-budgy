import { View } from "react-native";
import React from "react";
import { Card, useTheme } from "react-native-paper";
import { ExpenseCategory, Expense } from "../model/expense";
import { useDispatch } from "react-redux";
import { deleteExpense } from "../storage/slices/budget-slice";
import BudgetSpendLine from "../components/budget-spend-line";
import ConfirmationDialog from "./confirmation-dialog";
import SwipeableFlatList from "rn-gesture-swipeable-flatlist";
import SwipeQuickActions, { SwipeQuickActionData } from "./swipe-quick-actions";

interface BudgetSpendSectionProps {
    expenseCategory: ExpenseCategory;
    isEditable: boolean;
}

const BudgetSpendSection = ({ expenseCategory, isEditable }: BudgetSpendSectionProps) => {
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
                        <Card.Title title="Expenditure" titleVariant="titleLarge" />
                        <Card.Content>
                            <SwipeableFlatList
                                swipeableProps={{
                                    dragOffsetFromRightEdge: 50,
                                }}
                                data={expenseCategory.Expenses}
                                keyExtractor={(expense: Expense) => expense.Id}
                                renderItem={({ item, index }: { item: Expense; index: number }) => (
                                    <BudgetSpendLine
                                        expense={item}
                                        categoryId={expenseCategory.Id}
                                        isLast={index === expenseCategory.Expenses.length - 1}
                                        isEditable={isEditable}
                                    />
                                )}
                                enableOpenMultipleRows={false}
                                renderRightActions={(item: Expense) => {
                                    const data: SwipeQuickActionData[] = [
                                        {
                                            icon: "trash-can-outline",
                                            action: () => deletePressHandler(item),
                                            backgroundColor: theme.colors.errorContainer,
                                        },
                                    ];
                                    return isEditable && <SwipeQuickActions data={data} />;
                                }}
                            />
                        </Card.Content>
                    </View>
                ) : (
                    <Card.Title title="No Expenses in this Category yet" />
                )}
            </Card>
            <ConfirmationDialog
                visible={deleteModalVisible}
                title="Are you sure?"
                confirmText={`Are you sure you want to delete the Expense "${expenseToDelete?.Comment}"?`}
                primaryActionName="Delete"
                primaryActionColor={theme.colors.error}
                primaryActionHandler={delExpense}
                cancelActionHandler={() => setDeleteModalVisible(false)}
            />
        </>
    );
};

export default BudgetSpendSection;
