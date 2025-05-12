import { View } from "react-native";
import React from "react";
import { List, Chip, ProgressBar } from "react-native-paper";
import { ExpenseCategory } from "../model/expense";
import { useRouter } from "expo-router";
import colors from "../constants/colors";
import { useCurrencySymbol } from "../hooks/use-settings";

interface ExpenseCategoryLineProps {
    budgetId: string;
    expenseCategory: ExpenseCategory;
    isEditable: boolean;
    isLast?: boolean;
}

const ExpenseCategoryLine = ({ budgetId, expenseCategory, isEditable }: ExpenseCategoryLineProps) => {
    const router = useRouter();
    const currencySymbol = useCurrencySymbol();
    const totalExpense = expenseCategory.Expenses.reduce((acc, expense) => acc + expense.Amount, 0);
    const totalUsage = totalExpense >= expenseCategory.Amount ? 1.0 : (totalExpense * 1.0) / expenseCategory.Amount;

    return (
        <View>
            <List.Item
                title={expenseCategory.Category}
                left={() => (
                    <Chip compact={true} elevated={true}>
                        {currencySymbol} {expenseCategory.Amount.toFixed(2)}
                    </Chip>
                )}
                onPress={() =>
                    router.navigate({
                        pathname: "/budget-expense",
                        params: { budgetId: budgetId, categoryId: expenseCategory.Id },
                    })
                }
            />
            <View style={{ padding: 5 }} />
            <ProgressBar
                progress={totalUsage}
                color={totalExpense > expenseCategory.Amount ? colors.SpentAboveLimit : colors.SpentInLimit}
            />
            <View style={{ padding: 5 }} />
        </View>
    );
};

export default ExpenseCategoryLine;
