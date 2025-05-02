import { View } from "react-native";
import { Card, Text, ProgressBar, useTheme } from "react-native-paper";
import React from "react";
import { useSelector } from "react-redux";
import { StoreState } from "../model/store";
import { Budget } from "../model/budget";
import colors from "../constants/colors";

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
                <Text variant="titleMedium" style={{ alignSelf: "flex-end", marginRight: 10 }}>
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
                    fillStyle={{ borderTopRightRadius: 10, borderBottomRightRadius: 10 }}
                    style={{
                        height: 16,
                        backgroundColor: theme.colors.elevation.level1,
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
    const currentBudget = useSelector<StoreState, Budget | null>((state) => state.budget.activeBudget);
    const totalIncome = currentBudget?.Incomes.reduce((acc, inc) => acc + inc.Amount, 0) ?? 0;
    const totalBudgeted = currentBudget?.Expenses.reduce((acc, exp) => acc + exp.Amount, 0) ?? 0;
    const totalSpent =
        currentBudget?.Expenses.reduce(
            (acc, exp) => acc + exp.Expenses.reduce((accIn, expIn) => accIn + expIn.Amount, 0),
            0
        ) ?? 0;
    const totalSaving = totalIncome - totalBudgeted;

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
        {
            label: "Saved",
            value: totalSaving / (totalIncome === 0 ? 1 : totalIncome),
            barColor: totalSaving >= 0 ? colors.SavingPositive : colors.SavingNegative,
        },
    ];

    return (
        <Card mode="elevated" style={{ margin: 10 }}>
            <Card.Content>
                {graphData.map((bar, idx) => (
                    <HorizontalBar label={bar.label} value={bar.value} barColor={bar.barColor} key={idx} />
                ))}
            </Card.Content>
        </Card>
    );
};

export default BudgetGraph;
