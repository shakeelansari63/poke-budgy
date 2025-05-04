import { Budget } from "./budget";

export interface BudgetStoreModel {
    resetStore: () => void;
    getActiveBudget: () => Budget | null;
    getInactiveBudgets: () => Budget[];
    getInactiveBudgetById: (id: string) => Budget | null;
    setActiveBudget: (budget: Budget) => void;
    updateInactiveBudgets: (budgets: Budget[]) => void;
}
