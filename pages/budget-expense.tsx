import { View } from "react-native";
import { Card, IconButton, ProgressBar, Text } from "react-native-paper";
import React from "react";
import { useLayoutEffect } from "react";
import { ExpenseCategory } from "../model/expense";
import { StackProps } from "../model/stack-props";
import BudgetSpendLine from "../components/budget-spend-line";
import EditBudgetSpendDialog from "../components/budget-spend-dialog";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useSelector } from "react-redux";
import { StoreState } from "../model/store";
import { Budget } from "../model/budget";
import colors from "../constants/colors";

const BudgetExpenses = ({ navigation, route }: StackProps) => {
    const sheetRef = React.createRef<BottomSheetModal>();
    const { categoryId } = route.params as { categoryId: string };
    const activeBudget = useSelector<StoreState, Budget | null>((state) => state.budget.activeBudget);
    const expenseCategory: ExpenseCategory = activeBudget?.Expenses.find((exp) => exp.Id === categoryId) ?? {
        Id: "",
        Amount: 0,
        Category: "",
        Expenses: [],
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            title: expenseCategory.Category,
            headerRight: () => <IconButton icon="plus" size={24} onPress={() => sheetRef.current?.present()} />,
        });
    }, [navigation]);

    const totalSpend = expenseCategory.Expenses.reduce((acc, exp) => acc + exp.Amount, 0);

    return (
        <View>
            {expenseCategory.Expenses.length > 0 ? (
                <Card style={{ margin: 10 }}>
                    <Card.Content>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flex: 0.5 }}>
                                <Text>Spend</Text>
                            </View>
                            <View style={{ flex: 0.5, alignSelf: "center" }}>
                                <ProgressBar
                                    progress={
                                        totalSpend > expenseCategory.Amount
                                            ? 1
                                            : totalSpend / (expenseCategory.Amount === 0 ? 1 : expenseCategory.Amount)
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
                    <Card.Content>
                        {expenseCategory.Expenses.map((expense) => (
                            <BudgetSpendLine categoryId={expenseCategory.Id} expense={expense} key={expense.Id} />
                        ))}
                    </Card.Content>
                ) : (
                    <Card.Title title="No Expenses in this Category yet" />
                )}
            </Card>
            <EditBudgetSpendDialog categoryId={expenseCategory.Id} sheetRef={sheetRef} />
        </View>
    );
};

export default BudgetExpenses;
