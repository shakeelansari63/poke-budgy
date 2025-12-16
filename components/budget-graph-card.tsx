import { View } from "react-native";
import { Card, Text, Icon } from "react-native-paper";
import React from "react";
import { Budget } from "../model/budget";
import { dateOption, numberOption } from "../constants/app-constants";
import DateChip from "./date-chip";
import { useCurrencySymbol } from "../hooks/use-settings";
import { useAppTheme } from "../hooks/use-app-theme";

interface BudgetGraphProps {
  currentBudget: Budget | null;
  isActive: boolean;
}

const BudgetGraph = ({ currentBudget, isActive }: BudgetGraphProps) => {
  const theme = useAppTheme();
  const currencySymbol = useCurrencySymbol();
  const totalIncome =
    currentBudget?.Incomes.reduce((acc, inc) => acc + inc.Amount, 0) ?? 0;
  const totalBudgeted =
    currentBudget?.Expenses.reduce((acc, exp) => acc + exp.Amount, 0) ?? 0;
  const totalSpent =
    currentBudget?.Expenses.reduce(
      (acc, exp) =>
        acc + exp.Expenses.reduce((accIn, expIn) => accIn + expIn.Amount, 0),
      0,
    ) ?? 0;
  const totalSaving = totalIncome - totalBudgeted;
  const totalSpendRemain = totalBudgeted - totalSpent;

  const startDate: string | undefined =
    typeof currentBudget?.StartDate == "string"
      ? new Date(currentBudget.StartDate).toLocaleDateString(
          "en-US",
          dateOption,
        )
      : currentBudget?.StartDate.toLocaleDateString("en-US", dateOption);
  const endDate: string | undefined =
    typeof currentBudget?.EndDate == "string"
      ? new Date(currentBudget.EndDate).toLocaleDateString("en-US", dateOption)
      : currentBudget?.EndDate.toLocaleDateString("en-US", dateOption);

  return (
    <Card
      mode="elevated"
      style={{
        marginVertical: 10,
        marginHorizontal: 20,
        backgroundColor: theme.colors.primaryContainer,
      }}
    >
      {currentBudget !== null ? (
        <Card.Content>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <DateChip>From: {startDate ?? ""}</DateChip>
            <DateChip>To: {endDate ?? ""}</DateChip>
          </View>
          <Text variant="headlineSmall">Savings</Text>
          <Text variant="displaySmall">
            {currencySymbol} {totalSaving.toLocaleString("en-US", numberOption)}
          </Text>
          <View style={{ padding: 10 }}></View>
          <View style={{ flexDirection: "row", marginBottom: 20 }}>
            <View style={{ flex: 0.5, justifyContent: "flex-start" }}>
              <View style={{ flexDirection: "row" }}>
                <Icon
                  source="menu-up"
                  color={theme.colors.onPrimaryContainer}
                  size={24}
                />
                <Text
                  variant="titleMedium"
                  style={{ color: theme.colors.onPrimaryContainer }}
                >
                  Income
                </Text>
              </View>
              <Text
                variant="titleMedium"
                style={{ color: theme.colors.onPrimaryContainer }}
              >
                {currencySymbol}{" "}
                {totalIncome.toLocaleString("en-US", numberOption)}
              </Text>
            </View>
            <View style={{ flex: 0.5, justifyContent: "flex-end" }}>
              <View
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
              >
                <Icon source="menu-down" color={theme.colors.error} size={24} />
                <Text
                  variant="titleMedium"
                  style={{ alignSelf: "flex-end", color: theme.colors.error }}
                >
                  Budget
                </Text>
              </View>
              <Text
                variant="titleMedium"
                style={{ alignSelf: "flex-end", color: theme.colors.error }}
              >
                {currencySymbol}{" "}
                {totalBudgeted.toLocaleString("en-US", numberOption)}
              </Text>
            </View>
          </View>
          <View style={{ padding: 5 }}></View>
          <View style={{ flexDirection: "row", marginBottom: 20 }}>
            <View style={{ flex: 0.5, justifyContent: "flex-start" }}>
              <View style={{ flexDirection: "row" }}>
                <Icon
                  source="menu-up"
                  color={theme.colors.onPrimaryContainer}
                  size={24}
                />
                <Text
                  variant="titleMedium"
                  style={{ color: theme.colors.onPrimaryContainer }}
                >
                  Spent
                </Text>
              </View>
              <Text
                variant="titleMedium"
                style={{ color: theme.colors.onPrimaryContainer }}
              >
                {currencySymbol}{" "}
                {totalSpent.toLocaleString("en-US", numberOption)}
              </Text>
            </View>
            <View style={{ flex: 0.5, justifyContent: "flex-end" }}>
              <View
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
              >
                <Icon
                  source="menu-down"
                  color={theme.colors.onTertiaryContainer}
                  size={24}
                />
                <Text
                  variant="titleMedium"
                  style={{
                    alignSelf: "flex-end",
                    color: theme.colors.onTertiaryContainer,
                  }}
                >
                  Expense Left
                </Text>
              </View>
              <Text
                variant="titleMedium"
                style={{
                  alignSelf: "flex-end",
                  color: theme.colors.onTertiaryContainer,
                }}
              >
                {currencySymbol}{" "}
                {totalSpendRemain.toLocaleString("en-US", numberOption)}
              </Text>
            </View>
          </View>
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
