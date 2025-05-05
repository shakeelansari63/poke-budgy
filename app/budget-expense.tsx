import { useNavigation, useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";
import { Card, IconButton, ProgressBar, Text, Portal, Dialog, Button, useTheme } from "react-native-paper";
import React from "react";
import { useLayoutEffect } from "react";
import { ExpenseCategory, Expense } from "../model/expense";
import BudgetSpendLine from "../components/budget-spend-line";
import FabBudgetPage from "../components/fab-budget-page";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useSelector } from "react-redux";
import { StoreState } from "../model/store";
import { Budget } from "../model/budget";
import colors from "../constants/colors";
import EditExpenseCategoryDialog from "../components/edit-expense-category-dialog";
import { useDispatch } from "react-redux";
import { deleteExpense } from "../storage/slices/budget-slice";
import SwipeableFlatList from "rn-gesture-swipeable-flatlist";

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

    const [expenseToDelete, setExpenseToDelete] = React.useState<Expense | null>(null);
    const [deleteModalVisible, setDeleteModalVisible] = React.useState<boolean>(false);
    const theme = useTheme();
    const dispactch = useDispatch();

    const delExpense = () => {
        if (expenseToDelete) dispactch(deleteExpense({ categoryId: categoryId, expenseId: expenseToDelete.Id }));
        setDeleteModalVisible(false);
        setExpenseToDelete(null);
    };

    const deletePressHandler = (expense: Expense) => {
        setExpenseToDelete(expense);
        setDeleteModalVisible(true);
    };

    const AddButton = () => <IconButton icon="pencil" size={24} onPress={() => sheetRef.current?.present()} />;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: expenseCategory.Category,
            headerRight: AddButton,
        });
    }, [navigation]);

    const totalSpend = expenseCategory.Expenses.reduce((acc, exp) => acc + exp.Amount, 0);

    return (
        <>
            <ScrollView>
                <EditExpenseCategoryDialog sheetRef={sheetRef} expenseCat={expenseCategory} />
                {expenseCategory.Expenses.length > 0 ? (
                    <Card style={{ margin: 10 }}>
                        <Card.Content>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ flex: 0.3 }}>
                                    <Text>Budget Limit</Text>
                                </View>
                                <View style={{ flex: 0.7, alignSelf: "center" }}>
                                    <Text>{expenseCategory.Amount}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ flex: 0.3 }}>
                                    <Text>Spend</Text>
                                </View>
                                <View style={{ flex: 0.3 }}>
                                    <Text>{totalSpend}</Text>
                                </View>
                                <View style={{ flex: 0.4, alignSelf: "center" }}>
                                    <ProgressBar
                                        progress={
                                            totalSpend > expenseCategory.Amount
                                                ? 1
                                                : totalSpend /
                                                  (expenseCategory.Amount === 0 ? 1 : expenseCategory.Amount)
                                        }
                                        color={
                                            totalSpend > expenseCategory.Amount
                                                ? colors.SpentAboveLimit
                                                : colors.SpentInLimit
                                        }
                                    />
                                </View>
                            </View>
                        </Card.Content>
                    </Card>
                ) : null}
                <Card style={{ margin: 10 }}>
                    {expenseCategory.Expenses.length > 0 ? (
                        <>
                            <Card.Title title="Expenditure" />
                            <Card.Content>
                                <SwipeableFlatList
                                    data={expenseCategory.Expenses}
                                    keyExtractor={(expense: Expense) => expense.Id}
                                    renderItem={({ item }: { item: Expense }) => (
                                        <BudgetSpendLine expense={item} categoryId={categoryId} />
                                    )}
                                    enableOpenMultipleRows={false}
                                    renderRightActions={(item: Expense) => (
                                        <View style={{ backgroundColor: theme.colors.errorContainer }}>
                                            <IconButton
                                                icon="trash-can-outline"
                                                onPress={() => deletePressHandler(item)}
                                            />
                                        </View>
                                    )}
                                />
                            </Card.Content>
                        </>
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
            </ScrollView>
            <FabBudgetPage expenseCat={expenseCategory} />
        </>
    );
};

export default BudgetExpenses;
