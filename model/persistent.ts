import { Budget } from "./budget";
import { Settings } from "./settings";

export interface PersistentStoreModel {
    // Budget Store
    getActiveBudget: () => Budget | null;
    getInactiveBudgets: () => Budget[];
    getInactiveBudgetById: (id: string) => Budget | null;
    setActiveBudget: (budget: Budget) => void;
    updateInactiveBudgets: (budgets: Budget[]) => void;
    resetBudgetStore: () => void;

    // Settings Store
    getSettings: () => Settings | null;
    setSettings: (settings: Settings) => void;
    resetSettingStore: () => void;
}
