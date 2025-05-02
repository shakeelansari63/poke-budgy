import { ScrollView, View } from "react-native";
import { Card, Chip, Icon, Text, Button, ProgressBar, IconButton, useTheme } from "react-native-paper";
import React from "react";
import { Budget } from "../model/budget";
import colors from "../constants/colors";
import { useDispatch } from "react-redux";
import { deletePastBudget } from "../storage/slices/budget-slice";

interface PastBudgetCardProp {
    budget: Budget;
}

const PastBudgetCard = ({ budget }: PastBudgetCardProp) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const dateOption: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
        timeZone: "UTC",
    };

    const startDate: string =
        typeof budget.StartDate == "string"
            ? new Date(budget.StartDate).toLocaleDateString("en-US", dateOption)
            : budget.StartDate.toLocaleDateString("en-US", dateOption);
    const endDate: string =
        typeof budget.EndDate == "string"
            ? new Date(budget.EndDate).toLocaleDateString("en-US", dateOption)
            : budget.EndDate.toLocaleDateString("en-US", dateOption);

    const totalIncome = budget?.Incomes.reduce((acc, inc) => acc + inc.Amount, 0) ?? 0;
    const totalBudgeted = budget?.Expenses.reduce((acc, exp) => acc + exp.Amount, 0) ?? 0;
    const totalSaved = totalIncome - totalBudgeted;

    const DateChip = ({ children }: { children: React.ReactNode }) => (
        <Chip
            icon={({ size }) => <Icon source="calendar" color={theme.colors.onBackground} size={size} />}
            compact={true}
            textStyle={{ fontSize: 10 }}
            style={{ marginRight: 16, backgroundColor: theme.colors.tertiaryContainer }}
        >
            {children}
        </Chip>
    );

    const BudgetLine = ({
        icon,
        type,
        value,
        progress,
        color,
    }: {
        icon: string;
        type: string;
        value: number;
        progress: number;
        color: string;
    }) => (
        <View style={{ flexDirection: "row", marginVertical: 5 }}>
            <View style={{ flex: 0.1, justifyContent: "flex-start" }}>
                <Icon source={icon} size={24} />
            </View>
            <View style={{ flex: 0.25, justifyContent: "flex-start" }}>
                <Text variant="titleSmall">{type}: </Text>
            </View>
            <View style={{ flex: 0.25, justifyContent: "flex-start" }}>
                <Text variant="titleSmall">{value}</Text>
            </View>
            <View style={{ flex: 0.4, justifyContent: "flex-start", alignSelf: "center" }}>
                <ProgressBar progress={progress} color={color} />
            </View>
        </View>
    );

    return (
        <Card style={{ margin: 10 }}>
            <Card.Content>
                <ScrollView>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <DateChip>From: {startDate}</DateChip>
                        <DateChip>To: {endDate}</DateChip>
                        <IconButton icon="trash-can" onPress={() => dispatch(deletePastBudget(budget.Id))}></IconButton>
                    </View>
                    <BudgetLine icon="bank-plus" type="Income" value={totalIncome} progress={1} color={colors.Income} />
                    <BudgetLine
                        icon="cash-minus"
                        type="Budget"
                        value={totalBudgeted}
                        progress={
                            totalBudgeted <= totalIncome ? totalBudgeted / (totalIncome === 0 ? 1 : totalIncome) : 1
                        }
                        color={totalBudgeted <= totalIncome ? colors.BudgetInLimit : colors.BudgetAboveLimit}
                    />
                    <BudgetLine
                        icon="bank-check"
                        type="Saving"
                        value={totalSaved}
                        progress={totalSaved >= 0 ? totalSaved / (totalIncome === 0 ? 1 : totalIncome) : 1}
                        color={totalSaved >= 0 ? colors.SavingPositive : colors.SavingNegative}
                    />
                </ScrollView>
            </Card.Content>
            <Card.Actions>
                <Button
                    icon="content-duplicate"
                    mode="contained"
                    buttonColor={theme.colors.primaryContainer}
                    textColor={theme.colors.onPrimaryContainer}
                >
                    Copy to new Budget
                </Button>
            </Card.Actions>
        </Card>
    );
};

export default PastBudgetCard;
