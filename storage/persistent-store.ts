// import { MMKV } from "react-native-mmkv";
// import { BudgetStore } from "../model/persistent";
// import { Budget } from "../model/budget";
// import { Income } from "../model/income";
// import { ExpenseCategory, Expense } from "../model/expense";
// import { nanoid } from "@reduxjs/toolkit";

// const store = new MMKV();

// class MMKVStore implements BudgetStore {
//     getAllBudgets() {
//         const allBudgetKeys = store.getAllKeys();
//         const allBudgets = allBudgetKeys.map((id) => this.getBudgetById(id));
//         return allBudgets.filter((budget) => budget !== null);
//     }

//     getActiveBudget() {
//         const allBudgets = this.getAllBudgets();
//         const activeBudget = allBudgets.find((budget) => budget.IsCurrent);
//         return activeBudget!;
//     }

//     getInactiveBudgets() {
//         const allBudgets = this.getAllBudgets();
//         return allBudgets.filter((budget) => !budget.IsCurrent);
//     }

//     getBudgetById(id: string) {
//         const budget = store.getString(id);
//         if (budget === undefined) return null;
//         return JSON.parse(budget!) as Budget;
//     }

//     setActiveBudget(id: string) {
//         const activeBudget = this.getActiveBudget();
//         if (activeBudget.Id === id) return activeBudget;

//         activeBudget.IsCurrent = false;
//         const newActiveBudget = this.getBudgetById(id);
//         if (newActiveBudget === null) return activeBudget;

//         // Set This budget as active
//         newActiveBudget!.IsCurrent = true;

//         store.set(activeBudget.Id, JSON.stringify(activeBudget));
//         store.set(newActiveBudget!.Id, JSON.stringify(newActiveBudget));

//         // Return active budget
//         return newActiveBudget;
//     }

//     createNewBudget(cloneId: string | null, startDate: Date, endDate: Date) {
//         let newBudget: Budget = {
//             Id: nanoid(),
//             StartDate: startDate,
//             EndDate: endDate,
//             IsCurrent: true,
//             Incomes: [],
//             Expenses: [],
//         };

//         // Clone Budget if needed
//         if (cloneId !== null) {
//             const cloneBudget = this.getBudgetById(cloneId);

//             if (cloneBudget !== null) {
//                 // Add Incomes
//                 cloneBudget.Incomes.forEach((income) => {
//                     income.Id = nanoid();
//                     newBudget.Incomes.push(income);
//                 });

//                 // Add Expense Categories
//                 cloneBudget.Expenses.forEach((expense) => {
//                     expense.Expenses = [];
//                     expense.Id = nanoid();
//                     newBudget.Expenses.push(expense);
//                 });
//             }
//         }

//         // Update previous Current Budget
//         const previousCurrentBudget = this.getActiveBudget();
//         previousCurrentBudget.IsCurrent = false;
//         store.set(previousCurrentBudget.Id, JSON.stringify(previousCurrentBudget));

//         // Save New Budget
//         store.set(newBudget.Id, JSON.stringify(newBudget));

//         return newBudget;
//     }

//     addIncome(income: Income) {
//         const currentBudget = this.getActiveBudget();
//         income.Id = nanoid();
//         currentBudget.Incomes.push(income);

//         // Save Budget
//         store.set(currentBudget.Id, JSON.stringify(currentBudget));

//         return currentBudget;
//     }

//     addExpenseCategory(expenseCategory: ExpenseCategory) {
//         const currentBudget = this.getActiveBudget();
//         expenseCategory.Id = nanoid();
//         currentBudget.Expenses.push(expenseCategory);

//         // Save Budget
//         store.set(currentBudget.Id, JSON.stringify(currentBudget));

//         return currentBudget;
//     }

//     addExpense(expense: Expense, categoryId: string) {
//         const currentBudget = this.getActiveBudget();
//         expense.Id = nanoid();

//         // Find the Expense Category
//         const expenseCategory = currentBudget.Expenses.find((category) => category.Id === categoryId);
//         if (expenseCategory === undefined) return currentBudget;

//         expenseCategory.Expenses.push(expense);

//         // Save Budget
//         store.set(currentBudget.Id, JSON.stringify(currentBudget));

//         return currentBudget;
//     }

//     deleteIncome(incomeId: string) {
//         const currentBudget = this.getActiveBudget();
//         currentBudget.Incomes = currentBudget.Incomes.filter((income) => income.Id !== incomeId);

//         // Save Budget
//         store.set(currentBudget.Id, JSON.stringify(currentBudget));

//         return currentBudget;
//     }

//     deleteExpenseCategory(categoryId: string) {
//         const currentBudget = this.getActiveBudget();
//         currentBudget.Expenses = currentBudget.Expenses.filter((category) => category.Id !== categoryId);

//         // Save Budget
//         store.set(currentBudget.Id, JSON.stringify(currentBudget));

//         return currentBudget;
//     }

//     deleteExpense(expenseId: string, categoryId: string) {
//         const currentBudget = this.getActiveBudget();

//         // Find the Expense Category
//         const expenseCategory = currentBudget.Expenses.find((category) => category.Id === categoryId);
//         if (expenseCategory === undefined) return currentBudget;

//         expenseCategory.Expenses = expenseCategory.Expenses.filter((expense) => expense.Id !== expenseId);

//         // Save Budget
//         store.set(currentBudget.Id, JSON.stringify(currentBudget));

//         return currentBudget;
//     }

//     deleteBudget(budgetId: string) {
//         const budget = this.getBudgetById(budgetId);

//         if (budget === null) return false;

//         store.delete(budgetId);
//         return true;
//     }

//     loadBudgets(budgets: Budget[]) {
//         budgets.forEach((budget) => {
//             store.set(budget.Id, JSON.stringify(budget));
//         });
//     }
// }

// const dataStorage = new MMKVStore();

// export default dataStorage;
