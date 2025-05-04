import Storage from "expo-sqlite/kv-store";
import { BudgetStoreModel } from "../model/persistent";
import { Budget } from "../model/budget";

const ActiveBudgetKey = "active";
const InactiveBudgetKeyPrefix = "past/";

export const BudgetStore: BudgetStoreModel = {
    resetStore: () => {
        Storage.clearSync();
    },

    getActiveBudget: () => {
        const budgetKeyExist = Storage.getAllKeysSync().find((key) => key === ActiveBudgetKey);
        if (budgetKeyExist) {
            const item = Storage.getItemSync(ActiveBudgetKey);
            return item === null ? null : (JSON.parse(item) as Budget);
        }
        return null;
    },

    getInactiveBudgets: () => {
        const allKeys = Storage.getAllKeysSync().filter((key) => key !== ActiveBudgetKey);
        return allKeys
            .map((key) => {
                const item = Storage.getItemSync(key);
                return item === null ? null : (JSON.parse(item) as Budget);
            })
            .filter((budget) => budget !== null);
    },

    getInactiveBudgetById: (id: string) => {
        const item = Storage.getItemSync(id);
        return item === null ? null : (JSON.parse(item) as Budget);
    },

    setActiveBudget: (budget: Budget) => {
        Storage.setItemSync(ActiveBudgetKey, JSON.stringify(budget));
    },

    updateInactiveBudgets: (budgets: Budget[]) => {
        const stateKeys = budgets.map((budget) => `${InactiveBudgetKeyPrefix}${budget.Id}`);
        const storeKeys = Storage.getAllKeysSync().filter((key) => key !== ActiveBudgetKey);

        // Add budgets in State but not in Store
        budgets.forEach((budget) => {
            const budgetKey = `${InactiveBudgetKeyPrefix}${budget.Id}`;
            if (!storeKeys.includes(budgetKey)) Storage.setItemSync(budgetKey, JSON.stringify(budget));
        });

        // Delete budgets not in state
        storeKeys.forEach((key) => {
            if (!stateKeys.includes(key)) Storage.removeItemSync(key);
        });
    },
};
