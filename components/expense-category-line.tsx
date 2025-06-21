import { View } from "react-native";
import React from "react";
import { List, Chip, Icon } from "react-native-paper";
import { ExpenseCategory } from "../model/expense";
import { useRouter } from "expo-router";
import { UsageIconColors } from "../constants/colors";
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
    const usageIcon =
        totalUsage === 0.0
            ? "circle-outline"
            : totalUsage > 0.0 && totalUsage <= 1.0 / 8
            ? "circle-slice-1"
            : totalUsage > 1.0 / 8 && totalUsage <= 2.0 / 8
            ? "circle-slice-2"
            : totalUsage > 2.0 / 8 && totalUsage <= 3.0 / 8
            ? "circle-slice-3"
            : totalUsage > 3.0 / 8 && totalUsage <= 4.0 / 8
            ? "circle-slice-4"
            : totalUsage > 4.0 / 8 && totalUsage <= 5.0 / 8
            ? "circle-slice-5"
            : totalUsage > 5.0 / 8 && totalUsage <= 6.0 / 8
            ? "circle-slice-6"
            : totalUsage > 6.0 / 8 && totalUsage <= 7.0 / 8
            ? "circle-slice-7"
            : "circle-slice-8";

    const usageIconColor =
        totalUsage <= 0.3
            ? UsageIconColors[0]
            : totalUsage > 0.3 && totalUsage <= 0.7
            ? UsageIconColors[1]
            : totalUsage > 0.7 && totalUsage <= 0.9
            ? UsageIconColors[2]
            : UsageIconColors[3];

    return (
        <View>
            <List.Item
                title={expenseCategory.Category}
                left={() => (
                    <Chip compact={true} elevated={true}>
                        {currencySymbol} {expenseCategory.Amount.toFixed(2)}
                    </Chip>
                )}
                right={() => (
                    <View style={{ alignSelf: "center" }}>
                        <Icon source={usageIcon} color={usageIconColor} size={16} />
                    </View>
                )}
                onPress={() =>
                    router.navigate({
                        pathname: "/budget-expense",
                        params: { budgetId: budgetId, categoryId: expenseCategory.Id },
                    })
                }
            />
            <View style={{ padding: 5 }} />
        </View>
    );
};

export default ExpenseCategoryLine;
