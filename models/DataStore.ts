import { Budget, PastBudget } from "./Budgets";

export interface DataStore {
    getCurrentBudget: () => Promise<Budget | null>;
    getPastBudgets: () => Promise<PastBudget[] | null>;
    saveCurrentBudget: (budget: Budget) => Promise<void>;
    createNewBudget: (
        startDate: Date,
        endDate: Date,
        cloneBudget: Budget | undefined
    ) => Budget;
}
