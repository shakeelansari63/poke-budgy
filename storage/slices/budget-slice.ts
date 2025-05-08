import { BudgetState } from "../../model/store";
import { createSlice, nanoid } from "@reduxjs/toolkit";
import { Budget } from "../../model/budget";
import { Income } from "../../model/income";
import { ExpenseCategory, Expense } from "../../model/expense";

const initialState: BudgetState = {
    pastBudgets: [],
    activeBudget: null,
};

const budgetSlice = createSlice({
    name: "budget",
    initialState: initialState,
    reducers: {
        resetStore: (state, action) => {
            state.activeBudget = null;
            state.pastBudgets = [];
        },

        loadBudgets: (state, action) => {
            const savedState = action.payload as BudgetState;
            state.activeBudget = savedState.activeBudget;
            state.pastBudgets = savedState.pastBudgets;
        },

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
                let copyBudget: Budget | null = null;

                // Check if Clone budget in Past Bdgets
                if (budget) {
                    copyBudget = JSON.parse(JSON.stringify(budget)) as Budget;
                }

                // Check if Clone budget is active budgte
                else if (state.activeBudget?.Id === cloneId) {
                    copyBudget = JSON.parse(JSON.stringify(state.activeBudget)) as Budget;
                }

                // Copy Income and Expense categories if Found budget to copy
                if (copyBudget) {
                    // Remove expense from budgetCategories
                    copyBudget.Expenses.forEach((category) => {
                        category.Expenses = [];
                    });

                    // Change dates for Incomes
                    copyBudget.Incomes.forEach((income) => {
                        income.IncomeDate = startDate;
                    });

                    newBudget.Incomes = copyBudget.Incomes;
                    newBudget.Expenses = copyBudget.Expenses;
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
            income.Id = nanoid();
            if (state.activeBudget) {
                state.activeBudget.Incomes.push(income);
            }
        },

        editIncome: (state, action) => {
            const updatedIncome = action.payload as Income;
            if (state.activeBudget) {
                state.activeBudget.Incomes = state.activeBudget.Incomes.filter(
                    (income) => income.Id !== updatedIncome.Id
                );
                state.activeBudget.Incomes.push(updatedIncome);
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
            expenseCategory.Id = nanoid();
            if (state.activeBudget) {
                state.activeBudget.Expenses.push(expenseCategory);
            }
        },

        editExpenseCategory: (state, action) => {
            const expenseCategory = action.payload as ExpenseCategory;
            if (state.activeBudget) {
                state.activeBudget.Expenses = state.activeBudget.Expenses.filter(
                    (category) => category.Id !== expenseCategory.Id
                );
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
            expense.Id = nanoid();
            if (state.activeBudget) {
                const category = state.activeBudget.Expenses.find((category) => category.Id === categoryId);
                if (category) {
                    category.Expenses.push(expense);
                }
            }
        },

        editExpense: (state, action) => {
            const { expense, categoryId } = action.payload as { expense: Expense; categoryId: string };
            if (state.activeBudget) {
                const category = state.activeBudget.Expenses.find((category) => category.Id === categoryId);
                if (category) {
                    category.Expenses = category.Expenses.filter((exp) => expense.Id !== exp.Id);
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
    resetStore,
    loadBudgets,
    createNewBudget,
    deletePastBudget,
    deleteActiveBudget,
    setActiveBudget,
    addIncome,
    editIncome,
    deleteIncome,
    addExpenseCategory,
    editExpenseCategory,
    deleteExpenseCategory,
    addExpense,
    editExpense,
    deleteExpense,
} = budgetSlice.actions;

export default budgetSlice.reducer;
