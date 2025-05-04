import { useNavigation, useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";
import { Card, IconButton, ProgressBar, Text } from "react-native-paper";
import React from "react";
import { useLayoutEffect } from "react";
import { ExpenseCategory } from "../model/expense";
import BudgetSpendLine from "../components/budget-spend-line";
import FabBudgetPage from "../components/fab-budget-page";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useSelector } from "react-redux";
import { StoreState } from "../model/store";
import { Budget } from "../model/budget";
import colors from "../constants/colors";
import EditExpenseCategoryDialog from "../components/edit-expense-category-dialog";

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
                            <Card.Title title="Expenditures" />
                            <Card.Content>
                                {expenseCategory.Expenses.map((expense) => (
                                    <BudgetSpendLine
                                        categoryId={expenseCategory.Id}
                                        expense={expense}
                                        key={expense.Id}
                                    />
                                ))}
                            </Card.Content>
                        </>
                    ) : (
                        <Card.Title title="No Expenses in this Category yet" />
                    )}
                </Card>
            </ScrollView>
            <FabBudgetPage expenseCat={expenseCategory} />
        </>
    );
};

export default BudgetExpenses;
