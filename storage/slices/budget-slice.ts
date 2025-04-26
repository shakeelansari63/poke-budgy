import { BudgetState } from "../../model/store";
import { createSlice, nanoid } from "@reduxjs/toolkit";
import { Budget } from "../../model/budget";
import { Income } from "../../model/income";
import { ExpenseCategory, Expense } from "../../model/expense";
import budgets from "../../dummy-data";

const initialState: BudgetState = {
    pastBudgets: budgets.slice(0, -1) || [],
    activeBudget: budgets[0] || null,
};

const budgetSlice = createSlice({
    name: "budget",
    initialState: initialState,
    reducers: {
        createNewBudget: (state, action) => {
            const { cloneId, startDate, endDate } = action.payload as {
                cloneId: string | null;
                startDate: Date;
                endDate: Date;
            };
            const newBudget: Budget = {
                Id: nanoid(),
                StartDate: startDate,
                EndDate: endDate,
                Incomes: [],
                Expenses: [],
            };

            if (cloneId) {
                // clone budget
                const budget = state.pastBudgets.find((budget) => budget.Id === cloneId);
                if (budget) {
                    // Remove expense from budgetCategories
                    budget.Expenses.forEach((category) => {
                        category.Expenses = [];
                    });

                    newBudget.Incomes = budget.Incomes;
                    newBudget.Expenses = budget.Expenses;
                }
            }
            // Move current active Budget to past Budgets
            if (state.activeBudget) state.pastBudgets.push(state.activeBudget);

            // Set new budget as active
            state.activeBudget = newBudget;
        },

        deletePastBudget: (state, action) => {
            const budgetId = action.payload as string;
            state.pastBudgets = state.pastBudgets.filter((budget) => budget.Id !== budgetId);
        },

        deleteActiveBudget: (state, action) => {
            if (state.pastBudgets.length > 0) {
                state.activeBudget = state.pastBudgets.pop()!;
            } else {
                state.activeBudget = null;
            }
        },

        setActiveBudget: (state, action) => {
            const budgetId = action.payload as string;

            const budgetToBeActive = state.pastBudgets.find((budget) => budget.Id === budgetId);
            if (budgetToBeActive) {
                // If currently there is active budget, move it to past budgets
                if (state.activeBudget) state.pastBudgets.push(state.activeBudget);

                // Set new budget as active
                state.activeBudget = budgetToBeActive;
            }
        },

        addIncome: (state, action) => {
            const income = action.payload as Income;
            if (state.activeBudget) {
                state.activeBudget.Incomes.push(income);
            }
        },

        deleteIncome: (state, action) => {
            const incomeId = action.payload as string;
            if (state.activeBudget) {
                state.activeBudget.Incomes = state.activeBudget.Incomes.filter((income) => income.Id !== incomeId);
            }
        },

        addExpenseCategory: (state, action) => {
            const expenseCategory = action.payload as ExpenseCategory;
            if (state.activeBudget) {
                state.activeBudget.Expenses.push(expenseCategory);
            }
        },

        deleteExpenseCategory: (state, action) => {
            const expenseCategoryId = action.payload as string;
            if (state.activeBudget) {
                state.activeBudget.Expenses = state.activeBudget.Expenses.filter(
                    (expenseCategory) => expenseCategory.Id !== expenseCategoryId
                );
            }
        },

        addExpense: (state, action) => {
            const { expense, categoryId } = action.payload as { expense: Expense; categoryId: string };
            if (state.activeBudget) {
                const category = state.activeBudget.Expenses.find((category) => category.Id === categoryId);
                if (category) {
                    category.Expenses.push(expense);
                }
            }
        },

        deleteExpense: (state, action) => {
            const { expenseId, categoryId } = action.payload as { expenseId: string; categoryId: string };
            if (state.activeBudget) {
                const category = state.activeBudget.Expenses.find((category) => category.Id === categoryId);
                if (category) {
                    category.Expenses = category.Expenses.filter((expense) => expense.Id !== expenseId);
                }
            }
        },
    },
});

export const {
    createNewBudget,
    deletePastBudget,
    deleteActiveBudget,
    setActiveBudget,
    addIncome,
    deleteIncome,
    addExpenseCategory,
    deleteExpenseCategory,
    addExpense,
    deleteExpense,
} = budgetSlice.actions;

export default budgetSlice.reducer;
