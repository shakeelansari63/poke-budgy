import { SectionList, Dimensions, View } from "react-native";
import { Card, Text } from "react-native-paper";
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

const Trends = () => {
    const trendOptions = [
        { label: "Last 3 Months", value: Period.Last_3_Months },
        { label: "Last 6 Months", value: Period.Last_6_Months },
        { label: "Last 12 Months", value: Period.Last_12_Months },
        { label: "Year to date", value: Period.YTD },
        { label: "Last Year", value: Period.Last_Year },
    ];

    const [currentTrend, setCurrentTrend] = React.useState<Period>(Period.Last_3_Months);

    const setSelectedTrendPeriod = (value: string | undefined) => {
        if (value) {
            const selectedPeriod = Period[value as keyof typeof Period];
            if (selectedPeriod) setCurrentTrend(selectedPeriod);
        }
    };

    const { startPeriod, endPeriod } = getStartAndEndDateForPeriod(currentTrend);

    // Get Past Budgets for these periods
    const allBudgets = useSelector<StoreState, BudgetState>((state) => state.budget);
    const periodBudgets = [
        ...allBudgets.pastBudgets.filter(
            (budget: Budget) => new Date(budget.StartDate) >= startPeriod && new Date(budget.EndDate) <= endPeriod
        ),
    ];

    // Sort Period Budget
    periodBudgets.sort((a, b) => new Date(a.StartDate).getTime() - new Date(b.StartDate).getTime());

    // Add Active Budget to This list
    if (allBudgets.activeBudget && currentTrend !== Period.Last_Year) periodBudgets.push(allBudgets.activeBudget);

    // Data For Income Graph
    const incomeData = getMonthWiseIncome(periodBudgets);
    const incomeAvailable = incomeData.reduce((acc, inc) => acc + inc.value, 0) > 0;
    const expenseCatData = getMonthWiseExpenseCategory(periodBudgets);
    const expenseCatAvailable = expenseCatData.reduce((acc, inc) => acc + inc.value, 0) > 0;
    const spentData = getMonthWiseExpenses(periodBudgets);
    const spendAvailable = spentData.reduce((acc, inc) => acc + inc.value, 0) > 0;
    const top5Budgets = getTop5Budgets(periodBudgets);
    const top5BudgetsAvailable = top5Budgets.reduce((acc, inc) => acc + inc.value, 0) > 0;

    const screenWidth = Dimensions.get("screen");
    const graphWidthWithPadding = screenWidth.width - 20 - 50;

    const sections: { data: { id: number; node: React.ReactElement }[] }[] = [];

    if (periodBudgets.length <= 0 || (!incomeAvailable && !expenseCatAvailable && !spentData && !top5BudgetsAvailable))
        sections.push({
            data: [
                {
                    id: 0,
                    node: (
                        <Card style={{ margin: 10 }}>
                            <Card.Title
                                title="No Data available"
                                titleVariant="titleLarge"
                                subtitle="Create new budgets to see trends here"
                            />
                        </Card>
                    ),
                },
            ],
        });
    else {
        sections.push({
            data: [
                {
                    id: 0,
                    node: (
                        <Card style={{ margin: 10 }}>
                            <Card.Content>
                                <Dropdown
                                    options={trendOptions}
                                    onSelect={setSelectedTrendPeriod}
                                    mode="outlined"
                                    value={currentTrend}
                                    hideMenuHeader={true}
                                />
                            </Card.Content>
                        </Card>
                    ),
                },
            ],
        });

        // Show Top 5 Budgets Graph
        if (top5BudgetsAvailable)
            sections.push({
                data: [
                    {
                        id: sections.length,
                        node: (
                            <Card style={{ margin: 10 }}>
                                <Card.Title title="Top 5 Budgets" titleVariant="titleLarge" />
                                <Card.Content>
                                    <PieGraph
                                        data={top5Budgets.map((data) => ({ label: data.key, value: data.value }))}
                                    />
                                </Card.Content>
                            </Card>
                        ),
                    },
                ],
            });

        // Show graph for Income per month
        if (incomeAvailable)
            sections.push({
                data: [
                    {
                        id: sections.length,
                        node: (
                            <Card style={{ margin: 10 }}>
                                <Card.Title title="Income Trend" titleVariant="titleLarge" />
                                <Card.Content>
                                    {/* <Text>Hello</Text> */}
                                    <BarGraph
                                        data={incomeData.map((data) => ({ label: data.key, value: data.value }))}
                                        width={graphWidthWithPadding}
                                    />
                                </Card.Content>
                            </Card>
                        ),
                    },
                ],
            });

        // Show graph for Expense Categories per month
        if (expenseCatAvailable)
            sections.push({
                data: [
                    {
                        id: sections.length,
                        node: (
                            <Card style={{ margin: 10 }}>
                                <Card.Title title="Budget Trend" titleVariant="titleLarge" />
                                <Card.Content>
                                    <BarGraph
                                        data={expenseCatData.map((data) => ({ label: data.key, value: data.value }))}
                                        width={graphWidthWithPadding}
                                    />
                                </Card.Content>
                            </Card>
                        ),
                    },
                ],
            });

        // Show graph for Expense per month
        if (spendAvailable)
            sections.push({
                data: [
                    {
                        id: sections.length,
                        node: (
                            <Card style={{ margin: 10 }}>
                                <Card.Title title="Spend Trend" titleVariant="titleLarge" />
                                <Card.Content>
                                    <BarGraph
                                        data={spentData.map((data) => ({ label: data.key, value: data.value }))}
                                        width={graphWidthWithPadding}
                                    />
                                </Card.Content>
                            </Card>
                        ),
                    },
                ],
            });
    }

    return (
        <SectionList
            sections={sections}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => item.node}
            showsVerticalScrollIndicator={false}
        />
    );
};

export default Trends;
