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

    return expenseCategory.Expenses.length > 0 ? (
        <Card style={{ margin: 10 }}>
            <Card.Content>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 0.3 }}>
                        <Text>Budget Limit</Text>
                    </View>
                    <View style={{ flex: 0.7, alignSelf: "center" }}>
                        <Text>
                            {currencySymbol} {expenseCategory.Amount}
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 0.3 }}>
                        <Text>Spend</Text>
                    </View>
                    <View style={{ flex: 0.3 }}>
                        <Text>
                            {currencySymbol} {totalSpend}
                        </Text>
                    </View>
                    <View style={{ flex: 0.4, alignSelf: "center" }}>
                        <ProgressBar
                            progress={
                                totalSpend > expenseCategory.Amount
                                    ? 1
                                    : totalSpend / (expenseCategory.Amount === 0 ? 1 : expenseCategory.Amount)
                            }
                            color={totalSpend > expenseCategory.Amount ? colors.SpentAboveLimit : colors.SpentInLimit}
                        />
                    </View>
                </View>
            </Card.Content>
        </Card>
    ) : null;
};

export default BudgetSpendSummarySection;
