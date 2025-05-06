import { View } from "react-native";
import { Card, Text, Icon, ProgressBar, useTheme } from "react-native-paper";
import React from "react";
import { useSelector } from "react-redux";
import { StoreState } from "../model/store";
import { Budget } from "../model/budget";
import colors from "../constants/colors";
import { dateOption } from "../constants/app-constants";
import DateChip from "./date-chip";
import { useCurrencySymbol } from "../hooks/use-settings";

interface HorizontalBarProps {
    label: string;
    value: number;
    barColor: string;
}

const HorizontalBar = ({ label, value, barColor }: HorizontalBarProps) => {
    const theme = useTheme();

    return (
        <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 0.3, alignSelf: "center" }}>
                <Text variant="titleMedium" style={{ marginRight: 10 }}>
                    {label}
                </Text>
            </View>
            <View
                style={{
                    flex: 0.7,
                    justifyContent: "flex-start",
                    alignSelf: "center",
                }}
            >
                <ProgressBar
                    progress={value}
                    color={barColor}
                    style={{
                        height: 16,
                        backgroundColor: theme.colors.primaryContainer,
                        borderLeftWidth: 1,
                        borderLeftColor: theme.colors.onBackground,
                    }}
                />
            </View>
        </View>
    );
};

const BudgetGraph = () => {
    const theme = useTheme();
    const currencySymbol = useCurrencySymbol();
    const currentBudget = useSelector<StoreState, Budget | null>((state) => state.budget.activeBudget);
    const totalIncome = currentBudget?.Incomes.reduce((acc, inc) => acc + inc.Amount, 0) ?? 0;
    const totalBudgeted = currentBudget?.Expenses.reduce((acc, exp) => acc + exp.Amount, 0) ?? 0;
    const totalSpent =
        currentBudget?.Expenses.reduce(
            (acc, exp) => acc + exp.Expenses.reduce((accIn, expIn) => accIn + expIn.Amount, 0),
            0
        ) ?? 0;
    const totalSaving = totalIncome - totalBudgeted;

    const startDate: string | undefined =
        typeof currentBudget?.StartDate == "string"
            ? new Date(currentBudget.StartDate).toLocaleDateString("en-US", dateOption)
            : currentBudget?.StartDate.toLocaleDateString("en-US", dateOption);
    const endDate: string | undefined =
        typeof currentBudget?.EndDate == "string"
            ? new Date(currentBudget.EndDate).toLocaleDateString("en-US", dateOption)
            : currentBudget?.EndDate.toLocaleDateString("en-US", dateOption);

    const graphData = [
        {
            label: "Income",
            value: 1,
            barColor: colors.Income,
        },
        {
            label: "Budget",
            value: totalBudgeted / (totalIncome === 0 ? 1 : totalIncome),
            barColor: totalBudgeted < totalIncome ? colors.BudgetInLimit : colors.BudgetAboveLimit,
        },
        {
            label: "Spent",
            value: totalSpent / (totalIncome === 0 ? 1 : totalIncome),
            barColor: totalSpent < totalBudgeted ? colors.SpentInLimit : colors.SpentAboveLimit,
        },
    ];

    return (
        <Card mode="elevated" style={{ margin: 10, backgroundColor: theme.colors.primaryContainer }}>
            <Card.Content>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
                    <DateChip>From: {startDate ?? ""}</DateChip>
                    <DateChip>To: {endDate ?? ""}</DateChip>
                </View>
                <Text variant="headlineSmall">Monthly Saving</Text>
                <Text variant="displaySmall">
                    {currencySymbol} {totalSaving}
                </Text>
                <View style={{ padding: 10 }}></View>
                <View style={{ flexDirection: "row", marginBottom: 20 }}>
                    <View style={{ flex: 0.5, justifyContent: "flex-start" }}>
                        <View style={{ flexDirection: "row" }}>
                            <Icon source="menu-up" color={theme.colors.onPrimaryContainer} size={24} />
                            <Text variant="titleMedium" style={{ color: theme.colors.onPrimaryContainer }}>
                                Income
                            </Text>
                        </View>
                        <Text variant="headlineMedium" style={{ color: theme.colors.onPrimaryContainer }}>
                            {currencySymbol} {totalIncome}
                        </Text>
                    </View>
                    <View style={{ flex: 0.5, justifyContent: "flex-end" }}>
                        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                            <Icon source="menu-down" color={theme.colors.error} size={24} />
                            <Text variant="titleMedium" style={{ alignSelf: "flex-end", color: theme.colors.error }}>
                                Budget
                            </Text>
                        </View>
                        <Text variant="headlineMedium" style={{ alignSelf: "flex-end", color: theme.colors.error }}>
                            {currencySymbol} {totalBudgeted}
                        </Text>
                    </View>
                </View>
                {graphData.map((bar, idx) => (
                    <HorizontalBar label={bar.label} value={bar.value} barColor={bar.barColor} key={idx} />
                ))}
            </Card.Content>
        </Card>
    );
};

export default BudgetGraph;
