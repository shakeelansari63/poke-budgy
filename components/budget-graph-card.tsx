import { Dimensions } from "react-native";
import { Card, useTheme } from "react-native-paper";
import React from "react";
import { BarChart, barDataItem } from "react-native-gifted-charts";
import { useSelector } from "react-redux";
import { BudgetState } from "../model/store";
import { Budget } from "../model/budget";

const BudgetGraph = () => {
    const theme = useTheme();
    const currentBudget = useSelector<BudgetState, Budget | null>((state) => state.activeBudget);
    const totalIncome = currentBudget?.Incomes.reduce((acc, inc) => acc + inc.Amount, 0) ?? 0;
    const totalBudgeted = currentBudget?.Expenses.reduce((acc, exp) => acc + exp.Amount, 0) ?? 0;
    const totalSpent =
        currentBudget?.Expenses.reduce(
            (acc, exp) => acc + exp.Expenses.reduce((accIn, expIn) => accIn + expIn.Amount, 0),
            0
        ) ?? 0;

    const graphData: barDataItem[] = [
        {
            label: "Income",
            value: totalIncome,
            frontColor: "#2883b4",
            barWidth: 40,
            barBorderTopLeftRadius: 10,
            barBorderTopRightRadius: 10,
            labelTextStyle: { color: theme.colors.onBackground },
        },
        {
            label: "Budget",
            value: totalBudgeted,
            frontColor: totalBudgeted < totalIncome ? "#3498db" : "#c0392b",
            barWidth: 40,
            barBorderTopLeftRadius: 10,
            barBorderTopRightRadius: 10,
            labelTextStyle: { color: theme.colors.onBackground },
        },
        {
            label: "Spent",
            value: totalSpent,
            frontColor: totalSpent < totalBudgeted ? "#e67e22" : "#b03a2e",
            barWidth: 40,
            barBorderTopLeftRadius: 10,
            barBorderTopRightRadius: 10,
            labelTextStyle: { color: theme.colors.onBackground },
        },
        {
            label: "Saved",
            value: totalIncome - totalBudgeted,
            frontColor: totalIncome - totalBudgeted >= 0 ? "#28b463" : "#922b21",
            barWidth: 40,
            barBorderTopLeftRadius: 10,
            barBorderTopRightRadius: 10,
            labelTextStyle: { color: theme.colors.onBackground },
        },
    ];

    return (
        <Card mode="elevated" style={{ margin: 10 }}>
            <Card.Content>
                <BarChart
                    data={graphData}
                    noOfSections={1}
                    hideAxesAndRules={true}
                    spacing={32}
                    showValuesAsTopLabel={true}
                    topLabelTextStyle={{ color: theme.colors.onBackground, fontSize: 8 }}
                    initialSpacing={10}
                    autoShiftLabels={true}
                />
            </Card.Content>
        </Card>
    );
};

export default BudgetGraph;
