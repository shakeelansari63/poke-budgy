import { Budget } from "../../model/budget";
import { StoreState } from "../../model/store";
import { BudgetStore } from "../persistent-store";

export const persistStore = (store: any) => (next: any) => (action: any) => {
    next(action);

    // Check Actions and update persistent store accordingly
    switch (action.type) {
        case "budget/addIncome":
        case "budget/editIncome":
        case "budget/deleteIncome":
        case "budget/addExpenseCategory":
        case "budget/editExpenseCategory":
        case "budget/deleteExpenseCategory":
        case "budget/addExpense":
        case "budget/editExpense":
        case "budget/deleteExpense":
            const activeBudget: Budget | null = (store.getState() as StoreState).budget.activeBudget;
            if (activeBudget === null) break;

            BudgetStore.setActiveBudget(activeBudget);
            break;

        case "budget/createNewBudget":
            const newBudget: Budget | null = (store.getState() as StoreState).budget.activeBudget;
            const oldBudgets: Budget[] = (store.getState() as StoreState).budget.pastBudgets;
            if (newBudget === null) break;

            BudgetStore.setActiveBudget(newBudget);
            BudgetStore.updateInactiveBudgets(oldBudgets);
            break;

        case "budget/deletePastBudget":
            const pastBudgets: Budget[] = (store.getState() as StoreState).budget.pastBudgets;
            BudgetStore.updateInactiveBudgets(pastBudgets);
            break;
    }
};
