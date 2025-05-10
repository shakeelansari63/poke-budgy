import { View } from "react-native";
import React from "react";
import { List, Chip, IconButton, ProgressBar, Divider } from "react-native-paper";
import { ExpenseCategory } from "../model/expense";
import { useRouter } from "expo-router";
import colors from "../constants/colors";
import { useCurrencySymbol } from "../hooks/use-settings";

interface BudgetProps {
    budget: ExpenseCategory;
    isLast?: boolean;
}

const ExpenseCategoryLine = ({ budget, isLast }: BudgetProps) => {
    const router = useRouter();
    const currencySymbol = useCurrencySymbol();
    const totalExpense = budget.Expenses.reduce((acc, expense) => acc + expense.Amount, 0);
    const totalUsage = totalExpense >= budget.Amount ? 1.0 : (totalExpense * 1.0) / budget.Amount;

    return (
        <View>
            <List.Item
                title={budget.Category}
                left={() => (
                    <Chip compact={true} elevated={true}>
                        {currencySymbol} {budget.Amount.toFixed(2)}
                    </Chip>
                )}
                onPress={() => router.navigate({ pathname: "/budget-expense", params: { categoryId: budget.Id } })}
            />
            <View style={{ padding: 5 }} />
            <ProgressBar
                progress={totalUsage}
                color={totalExpense > budget.Amount ? colors.SpentAboveLimit : colors.SpentInLimit}
            />
            <View style={{ padding: 5 }} />
        </View>
    );
};

export default ExpenseCategoryLine;
