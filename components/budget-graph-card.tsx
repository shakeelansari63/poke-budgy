import { Dimensions } from "react-native";
import { Card, useTheme } from "react-native-paper";
import React from "react";
import { ProgressChart } from "react-native-chart-kit";
import { useSelector } from "react-redux";
import { BudgetState } from "../model/store";
import { Budget } from "../model/budget";

const BudgetGraph = () => {
    const currentBudget = useSelector<BudgetState, Budget | null>((state) => state.activeBudget);
    const totalIncome = currentBudget?.Incomes.reduce((acc, inc) => acc + inc.Amount, 0);
    const totalBudgeted = currentBudget?.Expenses.reduce((acc, exp) => acc + exp.Amount, 0);
    const totalSpent = currentBudget?.Expenses.reduce(
        (acc, exp) => acc + exp.Expenses.reduce((accIn, expIn) => accIn + expIn.Amount, 0),
        0
    );

    const graphData = {
        labels: ["Spent", "Budgeted", "Total"],
        colors: ["#dc7500", "#007bdc", "#88dc00"],
        data: [((totalSpent ?? 0) * 1.0) / (totalIncome ?? 1), ((totalBudgeted ?? 0) * 1.0) / (totalIncome ?? 1), 1],
    };

    const theme = useTheme();

    const chartConfig = {
        decimalPlaces: 2,
        backgroundGradientFromOpacity: 0,
        backgroundGradientToOpacity: 0,
        color: (opacity = 1) => theme.colors.surface,
        labelColor: (opacity = 1) => theme.colors.onBackground,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false, // optional
    };

    return (
        <Card mode="elevated" style={{ margin: 10 }}>
            <Card.Content>
                <ProgressChart
                    data={graphData}
                    height={180}
                    width={Dimensions.get("window").width - 70}
                    strokeWidth={16}
                    radius={32}
                    chartConfig={chartConfig}
                    withCustomBarColorFromData={true}
                />
            </Card.Content>
        </Card>
    );
};

export default BudgetGraph;
