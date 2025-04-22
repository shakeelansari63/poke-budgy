import { Budget } from "./budget";
import { Expense, ExpenseCategory } from "./expense";
import { Income } from "./income";

export interface BudgetStore {
    getAllBudgets: () => Budget[];
    getActiveBudget: () => Budget;
    getInactiveBudgets: () => Budget[];
    getBudgetById: (id: string) => Budget | null;
    createNewBudget: (cloneId: string | null, startDate: Date, endDate: Date) => Budget;
    addIncome: (income: Income) => Budget;
    addExpenseCategory: (expenseCategory: ExpenseCategory) => Budget;
    addExpense: (expense: Expense, categoryId: string) => Budget;
    deleteExpense: (expenseId: string, categoryId: string) => Budget;
    deleteExpenseCategory: (categoryId: string) => Budget;
    deleteIncome: (incomeId: string) => Budget;
    deleteBudget: (budgetId: string) => boolean;
}
