import { Budget } from "./budget";
import { Settings } from "./settings";

export interface PersistentStoreModel {
    resetStore: () => void;

    // Budget Store
    getActiveBudget: () => Budget | null;
    getInactiveBudgets: () => Budget[];
    getInactiveBudgetById: (id: string) => Budget | null;
    setActiveBudget: (budget: Budget) => void;
    updateInactiveBudgets: (budgets: Budget[]) => void;

    // Settings Store
    getSettings: () => Settings | null;
    setSettings: (settings: Settings) => void;
}
