import { Dimensions } from "react-native";
import { Card, useTheme } from "react-native-paper";
import React from "react";
import { BarChart, barDataItem } from "react-native-gifted-charts";
import { useSelector } from "react-redux";
import { StoreState } from "../model/store";
import { Budget } from "../model/budget";
import colors from "../constants/colors";

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

    const graphData: barDataItem[] = [
        {
            label: "Income",
            value: totalIncome,
            frontColor: colors.Income,
            barWidth: 40,
            barBorderTopLeftRadius: 10,
            barBorderTopRightRadius: 10,
            labelTextStyle: { color: theme.colors.onBackground },
        },
        {
            label: "Budget",
            value: totalBudgeted,
            frontColor: totalBudgeted < totalIncome ? colors.BudgetInLimit : colors.BudgetAboveLimit,
            barWidth: 40,
            barBorderTopLeftRadius: 10,
            barBorderTopRightRadius: 10,
            labelTextStyle: { color: theme.colors.onBackground },
        },
        {
            label: "Spent",
            value: totalSpent,
            frontColor: totalSpent < totalBudgeted ? colors.SpentInLimit : colors.SpentAboveLimit,
            barWidth: 40,
            barBorderTopLeftRadius: 10,
            barBorderTopRightRadius: 10,
            labelTextStyle: { color: theme.colors.onBackground },
        },
        {
            label: "Saved",
            value: totalIncome - totalBudgeted,
            frontColor: totalIncome - totalBudgeted >= 0 ? colors.SavingPositive : colors.SavingNegative,
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
