import { Budget } from "@/model/budget";
import { Period } from "../constants/enums";
import {
    getPastMonthDate,
    getStartOfMonthDate,
    getStartOfPastYearDate,
    getStartOfThisYearDate,
    getEndOfMonthDate,
    getEndOfPastYearDate,
} from "./date-manipulation";
import { monthFromDateOption } from "../constants/app-constants";
import { GroupWiseValues } from "../model/shared";

interface ReturnType {
    startPeriod: Date;
    endPeriod: Date;
}

export const getStartAndEndDateForPeriod = (period: Period): ReturnType => {
    let startPeriod = new Date();
    let endPeriod = new Date();

    switch (period) {
        case Period.Last_3_Months:
            startPeriod = getStartOfMonthDate(getPastMonthDate(3));
            endPeriod = getEndOfMonthDate(new Date());
            break;

        case Period.Last_6_Months:
            startPeriod = getStartOfMonthDate(getPastMonthDate(6));
            endPeriod = getEndOfMonthDate(new Date());
            break;

        case Period.Last_12_Months:
            startPeriod = getStartOfMonthDate(getPastMonthDate(12));
            endPeriod = getEndOfMonthDate(new Date());
            break;

        case Period.YTD:
            startPeriod = getStartOfThisYearDate();
            endPeriod = getEndOfMonthDate(new Date());
            break;

        case Period.Last_Year:
            startPeriod = getStartOfPastYearDate(1);
            endPeriod = getEndOfPastYearDate(1);
            break;
    }

    return {
        startPeriod: startPeriod,
        endPeriod: endPeriod,
    };
};

const _reduceRawData = (rawDataset: GroupWiseValues[]): GroupWiseValues[] => {
    const finalDataset: GroupWiseValues[] = [];

    // Group data by SortID reduce
    const groupedData = rawDataset.reduce((acc: Record<string, GroupWiseValues[]>, dataset: GroupWiseValues) => {
        const key = dataset.key;
        if (Object.keys(acc).includes(key)) acc[key].push(dataset);
        else acc[key] = [dataset];

        return acc;
    }, {});

    Object.entries(groupedData).forEach(([key, value]) => {
        if (!value) return;

        const summedValue = value?.reduce((acc, raw) => acc + raw.value, 0) ?? 0;

        finalDataset.push({
            key: value[0].key,
            sortId: value[0].sortId,
            value: summedValue,
        });
    });

    // Return
    return finalDataset.sort((a, b) => a.sortId - b.sortId);
};

const _getMonthwiseDataTemplate = (date: Date): GroupWiseValues => {
    const monthId = date.getFullYear() * 100 + date.getMonth();
    const month = `${date.toLocaleString("en-US", monthFromDateOption)}, ${date.getFullYear()}`;

    return {
        sortId: monthId,
        key: month,
        value: 0,
    };
};

export const getMonthWiseIncome = (budgets: Budget[]): GroupWiseValues[] => {
    const monthwiseRawData: GroupWiseValues[] = [];

    // Extract Incomes
    budgets.forEach((budget) => {
        budget.Incomes.forEach((income) => {
            const incomeDate = new Date(income.IncomeDate);
            const monthWiseTemplate = _getMonthwiseDataTemplate(incomeDate);

            monthwiseRawData.push({
                ...monthWiseTemplate,
                value: income.Amount,
            });
        });
    });

    // Reduce and return final values
    return _reduceRawData(monthwiseRawData);
};

export const getMonthWiseExpenseCategory = (budgets: Budget[]): GroupWiseValues[] => {
    const monthwiseRawData: GroupWiseValues[] = [];

    // Extract Expense Categories
    budgets.forEach((budget) => {
        budget.Expenses.forEach((expenseCat) => {
            const expenseCatDate = new Date(budget.StartDate);
            const monthWiseTemplate = _getMonthwiseDataTemplate(expenseCatDate);

            monthwiseRawData.push({
                ...monthWiseTemplate,
                value: expenseCat.Amount,
            });
        });
    });

    // Reduce and return final values
    return _reduceRawData(monthwiseRawData);
};

export const getMonthWiseExpenses = (budgets: Budget[]): GroupWiseValues[] => {
    const monthwiseRawData: GroupWiseValues[] = [];

    // Extract Expenses
    budgets.forEach((budget) => {
        budget.Expenses.forEach((expenseCat) => {
            expenseCat.Expenses.forEach((expense) => {
                const expenseDate = new Date(expense.ExpenseDate);
                const monthWiseTemplate = _getMonthwiseDataTemplate(expenseDate);

                monthwiseRawData.push({
                    ...monthWiseTemplate,
                    value: expense.Amount,
                });
            });
        });
    });

    // Reduce and return final values
    return _reduceRawData(monthwiseRawData);
};

export const getTop5Budgets = (budgets: Budget[]): GroupWiseValues[] => {
    const budgetsRawData: GroupWiseValues[] = [];

    // Extract Expense Categories
    budgets.forEach((budget) => {
        budget.Expenses.forEach((expenseCat) => {
            budgetsRawData.push({
                sortId: 1,
                key: expenseCat.Category,
                value: expenseCat.Amount,
            });
        });
    });

    // Reduce and return final values
    const finalData = _reduceRawData(budgetsRawData);

    // Sort data by Amount
    finalData.sort((a, b) => b.value - a.value);

    // Take top 5 if more than 5
    return finalData.length > 5 ? finalData.slice(0, 5) : finalData;
};
