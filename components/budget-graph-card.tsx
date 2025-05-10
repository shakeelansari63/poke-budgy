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
    visible?: boolean;
}

const HorizontalBar = ({ label, value, barColor, visible }: HorizontalBarProps) => {
    const theme = useTheme();

    return (
        visible && (
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
        )
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

    const baselineCost =
        totalIncome >= totalBudgeted
            ? totalIncome >= totalSpent
                ? totalIncome
                : totalSpent
            : totalBudgeted >= totalSpent
            ? totalBudgeted
            : totalSpent;

    const graphData = [
        {
            label: "Income",
            value: totalIncome / (baselineCost === 0 ? 1 : baselineCost),
            barColor: colors.Income,
            visible: totalIncome > 0,
        },
        {
            label: "Budget",
            value: totalBudgeted / (baselineCost === 0 ? 1 : baselineCost),
            barColor: totalBudgeted < totalIncome ? colors.BudgetInLimit : colors.BudgetAboveLimit,
            visible: totalBudgeted > 0,
        },
        {
            label: "Spent",
            value: totalSpent / (baselineCost === 0 ? 1 : baselineCost),
            barColor: totalSpent < totalBudgeted ? colors.SpentInLimit : colors.SpentAboveLimit,
            visible: totalSpent > 0,
        },
    ];

    return (
        <Card mode="elevated" style={{ margin: 10, backgroundColor: theme.colors.primaryContainer }}>
            {currentBudget !== null ? (
                <Card.Content>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
                        <DateChip>From: {startDate ?? ""}</DateChip>
                        <DateChip>To: {endDate ?? ""}</DateChip>
                    </View>
                    <Text variant="headlineSmall">Monthly Saving</Text>
                    <Text variant="displaySmall">
                        {currencySymbol} {totalSaving.toFixed(2)}
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
                                {currencySymbol} {totalIncome.toFixed(2)}
                            </Text>
                        </View>
                        <View style={{ flex: 0.5, justifyContent: "flex-end" }}>
                            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                                <Icon source="menu-down" color={theme.colors.error} size={24} />
                                <Text
                                    variant="titleMedium"
                                    style={{ alignSelf: "flex-end", color: theme.colors.error }}
                                >
                                    Budget
                                </Text>
                            </View>
                            <Text variant="headlineMedium" style={{ alignSelf: "flex-end", color: theme.colors.error }}>
                                {currencySymbol} {totalBudgeted.toFixed(2)}
                            </Text>
                        </View>
                    </View>
                    {baselineCost !== 0 &&
                        graphData.map((bar, idx) => (
                            <HorizontalBar
                                label={bar.label}
                                value={bar.value}
                                barColor={bar.barColor}
                                key={idx}
                                visible={bar.visible}
                            />
                        ))}
                </Card.Content>
            ) : (
                <Card.Title
                    title="You have no Budget yet !!!"
                    titleVariant="titleLarge"
                    subtitle="Create new budget from options on top"
                />
            )}
        </Card>
    );
};

export default BudgetGraph;
