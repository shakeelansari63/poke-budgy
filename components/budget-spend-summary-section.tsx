import { View } from "react-native";
import React from "react";
import colors from "../constants/colors";
import { Card, Text, ProgressBar } from "react-native-paper";
import { ExpenseCategory } from "@/model/expense";
import { useCurrencySymbol } from "../hooks/use-settings";

interface BudgetSpendSummarySectionProps {
    expenseCategory: ExpenseCategory;
}

const BudgetSpendSummarySection = ({ expenseCategory }: BudgetSpendSummarySectionProps) => {
    const totalSpend = expenseCategory.Expenses.reduce((acc, exp) => acc + exp.Amount, 0);
    const currencySymbol = useCurrencySymbol();

    return (
        <Card style={{ margin: 10 }}>
            <Card.Content>
                <View style={{ flexDirection: "row", marginBottom: 10 }}>
                    <View style={{ flex: 0.5 }}>
                        <Text variant="titleLarge">Budget Limit</Text>
                    </View>
                    <View style={{ flex: 0.5, alignSelf: "center" }}>
                        <Text variant="titleLarge">
                            {currencySymbol} {expenseCategory.Amount.toFixed(2)}
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 10 }}>
                    <View style={{ flex: 0.5 }}>
                        <Text variant="titleLarge">Spend</Text>
                    </View>
                    <View style={{ flex: 0.5, alignSelf: "center" }}>
                        <Text variant="titleLarge">
                            {currencySymbol} {totalSpend.toFixed(2)}
                        </Text>
                    </View>
                </View>
                <View style={{ marginBottom: 10 }}>
                    <ProgressBar
                        progress={
                            totalSpend > expenseCategory.Amount
                                ? 1
                                : totalSpend / (expenseCategory.Amount === 0 ? 1 : expenseCategory.Amount)
                        }
                        color={totalSpend > expenseCategory.Amount ? colors.SpentAboveLimit : colors.SpentInLimit}
                    />
                </View>
            </Card.Content>
        </Card>
    );
};

export default BudgetSpendSummarySection;
