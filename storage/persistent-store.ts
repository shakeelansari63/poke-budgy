import Storage from "expo-sqlite/kv-store";
import { PersistentStoreModel } from "../model/persistent";
import { Budget } from "../model/budget";
import { Settings } from "@/model/settings";

const ActiveBudgetKey = "active";
const InactiveBudgetKeyPrefix = "past/";
const SettingsKey = "settings";

export const DataStore: PersistentStoreModel = {
    resetStore: () => {
        Storage.clearSync();
    },

    // Budget Related Options
    getActiveBudget: () => {
        const budgetKeyExist = Storage.getAllKeysSync().find((key) => key === ActiveBudgetKey);
        if (budgetKeyExist) {
            const item = Storage.getItemSync(ActiveBudgetKey);
            return item === null ? null : (JSON.parse(item) as Budget);
        }
        return null;
    },

    getInactiveBudgets: () => {
        const allKeys = Storage.getAllKeysSync().filter((key) => key.startsWith(InactiveBudgetKeyPrefix));
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
        const storeKeys = Storage.getAllKeysSync().filter((key) => key.startsWith(InactiveBudgetKeyPrefix));

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

    // Settings relation methods
    getSettings: () => {
        const settingsKeyExist = Storage.getAllKeysSync().find((key) => key === SettingsKey);
        if (settingsKeyExist) {
            const item = Storage.getItemSync(SettingsKey);
            return item === null ? null : (JSON.parse(item) as Settings);
        }
        return null;
    },

    setSettings: (settings: Settings) => {
        Storage.setItemSync(SettingsKey, JSON.stringify(settings));
    },
};
