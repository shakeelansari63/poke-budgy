import AsyncStorage from "@react-native-async-storage/async-storage";
import { DataStore } from "../models/DataStore";
import { Budget } from "../models/Budgets";
import { v4 as UUID } from "uuid";

const Store: DataStore = {
    getCurrentBudget: async () => {
        const budget = await AsyncStorage.getItem("CurrentBudget");
        return budget === null ? budget : JSON.parse(budget);
    },

    getPastBudgets: async () => {
        const budget = await AsyncStorage.getItem("PastBudgets");
        return budget === null ? budget : JSON.parse(budget);
    },

    saveCurrentBudget: async (budget: Budget) => {
        await AsyncStorage.setItem("CurrentBudget", JSON.stringify(budget));
    },

    createNewBudget: (
        startDate: Date,
        endDate: Date,
        cloneBudget: Budget | undefined
    ) => {
        const newBudget: Budget = {
            StartDate: startDate,
            EndDate: endDate,
            Incomes: [],
            Expenses: [],
        };

        // Update Expenses and Incomes if asked to clone budget
        if (cloneBudget) {
            // Update Incomes
            newBudget.Incomes = cloneBudget.Incomes.map((income) => {
                income.Id = UUID();
                return income;
            });

            // Updates Expenses
            newBudget.Expenses = cloneBudget.Expenses.map((expense) => {
                expense.Id = UUID();
                return expense;
            });
        }

        // Return Budget
        return newBudget;
    },
};

export default Store;
