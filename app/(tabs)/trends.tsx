import { SectionList, Dimensions, View } from "react-native";
import { Card, useTheme } from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
import React from "react";
import { Period } from "../../constants/enums";
import { useSelector } from "react-redux";
import {
  getMonthWiseExpenseCategory,
  getMonthWiseExpenses,
  getMonthWiseIncome,
  getStartAndEndDateForPeriod,
  getTop5Budgets,
} from "../../helpers/trend-helper";
import { BudgetState, StoreState } from "../../model/store";
import { Budget } from "../../model/budget";
import BarGraph from "../../components/bar-graph";
import PieGraph from "../../components/pie-graph";
import CompareBarGraph from "../../components/compare-bar-graph";
import { GroupWiseValues, ComparisionBarPoints } from "../../model/shared";
import TopAppBar from "@/components/top-app-bar";
import EmptyOtherTabs from "@/components/empty-other-tabs";
import { BarComparisionColors } from "@/constants/colors";

const mergePointsByLabels = (
  data: GroupWiseValues[][],
): ComparisionBarPoints[] => {
  const merged: ComparisionBarPoints[] = [];

  data.forEach((dataPoint, idx) => {
    // For First Data Point add simply add it to list
    if (idx === 0)
      dataPoint.forEach((point) => {
        merged.push({
          label: point.key,
          values: [point.value],
        });
      });
    // Loop over other data points find appropriate key and add them to merged list
    else
      dataPoint.forEach((point) => {
        const barPt = merged.find((barPoint) => barPoint.label === point.key);
        if (barPt) barPt.values.push(point.value);
        else
          merged.push({
            label: point.key,
            values: [...Array(idx).fill(0), point.value],
          });
      });
  });

  // Return merged list
  return merged;
};

const Trends = () => {
  const trendOptions = [
    { label: "Last 3 Months", value: Period.Last_3_Months },
    { label: "Last 6 Months", value: Period.Last_6_Months },
    { label: "Last 12 Months", value: Period.Last_12_Months },
    { label: "Year to date", value: Period.YTD },
    { label: "Last Year", value: Period.Last_Year },
  ];

  const theme = useTheme();

  const [currentTrend, setCurrentTrend] = React.useState<Period>(
    Period.Last_3_Months,
  );

  const setSelectedTrendPeriod = (value: string | undefined) => {
    if (value) {
      const selectedPeriod = Period[value as keyof typeof Period];
      if (selectedPeriod) setCurrentTrend(selectedPeriod);
    }
  };

  const { startPeriod, endPeriod } = getStartAndEndDateForPeriod(currentTrend);

  // Get Past Budgets for these periods
  const allBudgets = useSelector<StoreState, BudgetState>(
    (state) => state.budget,
  );
  const periodBudgets = [
    ...allBudgets.pastBudgets.filter(
      (budget: Budget) =>
        new Date(budget.StartDate) >= startPeriod &&
        new Date(budget.EndDate) <= endPeriod,
    ),
  ];

  // Sort Period Budget
  periodBudgets.sort(
    (a, b) => new Date(a.StartDate).getTime() - new Date(b.StartDate).getTime(),
  );

  // Add Active Budget to This list
  if (allBudgets.activeBudget && currentTrend !== Period.Last_Year)
    periodBudgets.push(allBudgets.activeBudget);

  // Data For Income Graph
  const incomeData = getMonthWiseIncome(periodBudgets);
  const incomeAvailable =
    incomeData.reduce((acc, inc) => acc + inc.value, 0) > 0;
  const expenseCatData = getMonthWiseExpenseCategory(periodBudgets);
  const expenseCatAvailable =
    expenseCatData.reduce((acc, inc) => acc + inc.value, 0) > 0;
  const spentData = getMonthWiseExpenses(periodBudgets);
  const spendAvailable = spentData.reduce((acc, inc) => acc + inc.value, 0) > 0;
  const incomeExpenseCatAndSavedDataPoints = mergePointsByLabels([
    incomeData,
    expenseCatData,
  ]);

  // Calculate saving as income - budget
  incomeExpenseCatAndSavedDataPoints.forEach((point) => {
    point.values.push(
      point.values[1] > point.values[0] ? 0 : point.values[0] - point.values[1],
    );
  });

  // Extract Monthly Savings data only
  const savingsData: GroupWiseValues[] = incomeExpenseCatAndSavedDataPoints.map(
    (point) => {
      return {
        sortId: 0,
        key: point.label,
        value: point.values[2],
      };
    },
  );
  const savingAvailable =
    savingsData.reduce((acc, sav) => acc + sav.value, 0) > 0;

  // Calculate Total Income, Expense Budgets and Savings for the period
  const totalIncome = incomeData.reduce((acc, inc) => acc + inc.value, 0);
  const totalExpenseCat = expenseCatData.reduce(
    (acc, exp) => acc + exp.value,
    0,
  );
  const totalSavings = savingsData.reduce((acc, sav) => acc + sav.value, 0);
  const totalTrend = [
    {
      label: "Income",
      value: totalIncome,
      frontColor: BarComparisionColors[0],
    },
    {
      label: "Budget",
      value: totalExpenseCat,
      frontColor: BarComparisionColors[1],
    },
    {
      label: "Savings",
      value: totalSavings,
      frontColor: BarComparisionColors[2],
    },
  ];

  const top5Budgets = getTop5Budgets(periodBudgets);
  const top5BudgetsAvailable =
    top5Budgets.reduce((acc, inc) => acc + inc.value, 0) > 0;

  const screenWidth = Dimensions.get("screen");
  const graphWidthWithPadding = screenWidth.width - 40 - 60;

  const trendData: { id: number; node: React.ReactElement }[] = [];

  // Show Top 5 Budgets Graph
  if (top5BudgetsAvailable) {
    trendData.push({
      id: trendData.length,
      node: (
        <Card style={{ marginVertical: 10, marginHorizontal: 20 }}>
          <Card.Title title="Top 5 Budgets" titleVariant="titleLarge" />
          <Card.Content>
            <PieGraph
              data={top5Budgets.map((data) => ({
                label: data.key,
                value: data.value,
              }))}
            />
          </Card.Content>
        </Card>
      ),
    });
  }

  // Show graph for Income per month
  if (incomeAvailable || expenseCatAvailable) {
    trendData.push({
      id: trendData.length,
      node: (
        <Card style={{ marginVertical: 10, marginHorizontal: 20 }}>
          <Card.Title title="Finances for Period" titleVariant="titleLarge" />
          <Card.Content>
            <BarGraph
              data={totalTrend}
              width={graphWidthWithPadding}
              horizontal={false}
              showLine={false}
            />
          </Card.Content>
        </Card>
      ),
    });
  }

  // Show comparision graph between Income and Saving each month
  if (incomeAvailable || expenseCatAvailable) {
    trendData.push({
      id: trendData.length,
      node: (
        <Card style={{ marginVertical: 10, marginHorizontal: 20 }}>
          <Card.Title
            title="Income, Budgeted, Saved"
            titleVariant="titleLarge"
          />
          <Card.Content>
            <CompareBarGraph
              data={incomeExpenseCatAndSavedDataPoints}
              legend={["Income", "Budgeted", "Saved"]}
              width={graphWidthWithPadding}
            />
          </Card.Content>
        </Card>
      ),
    });
  }

  // Show comparision graph between Budget and extenditure
  if (spendAvailable || expenseCatAvailable) {
    trendData.push({
      id: trendData.length,
      node: (
        <Card style={{ marginVertical: 10, marginHorizontal: 20 }}>
          <Card.Title title="Budget vs Expenditure" titleVariant="titleLarge" />
          <Card.Content>
            <CompareBarGraph
              data={mergePointsByLabels([expenseCatData, spentData])}
              legend={["Budget", "Expenditure"]}
              width={graphWidthWithPadding}
            />
          </Card.Content>
        </Card>
      ),
    });
  }

  // Show graph for Income per month
  if (incomeAvailable) {
    trendData.push({
      id: trendData.length,
      node: (
        <Card style={{ marginVertical: 10, marginHorizontal: 20 }}>
          <Card.Title title="Monthly Income Trend" titleVariant="titleLarge" />
          <Card.Content>
            <BarGraph
              data={incomeData.map((data) => ({
                label: data.key,
                value: data.value,
              }))}
              width={graphWidthWithPadding}
            />
          </Card.Content>
        </Card>
      ),
    });
  }

  // Show graph for Savings per month
  if (savingAvailable) {
    trendData.push({
      id: trendData.length,
      node: (
        <Card style={{ marginVertical: 10, marginHorizontal: 20 }}>
          <Card.Title title="Monthly Savings Trend" titleVariant="titleLarge" />
          <Card.Content>
            <BarGraph
              data={savingsData.map((data) => ({
                label: data.key,
                value: data.value,
              }))}
              width={graphWidthWithPadding}
            />
          </Card.Content>
        </Card>
      ),
    });
  }

  const sections: { data: { id: number; node: React.ReactElement }[] }[] =
    allBudgets.pastBudgets.length === 0 && allBudgets.activeBudget === null
      ? []
      : [{ data: trendData }];

  return (
    <>
      <TopAppBar
        leftComponent={
          <View
            style={{
              backgroundColor: theme.colors.surface,
              paddingTop: 10,
              paddingLeft: 5,
              paddingRight: 15,
              paddingBottom: 10,
              zIndex: 99999,
            }}
          >
            <Dropdown
              options={trendOptions}
              onSelect={setSelectedTrendPeriod}
              mode="outlined"
              value={currentTrend}
              hideMenuHeader={true}
              disabled={sections.length === 0}
            />
          </View>
        }
      />
      {sections.length === 0 || trendData.length === 0 ? (
        <EmptyOtherTabs />
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => item.node}
          showsVerticalScrollIndicator={false}
        />
      )}
    </>
  );
};

export default Trends;
