import { Settings } from "../../model/settings";
import { Budget } from "../../model/budget";
import { StoreState } from "../../model/store";
import { DataStore } from "../persistent-store";

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
      const activeBudget: Budget | null = (store.getState() as StoreState)
        .budget.activeBudget;
      if (activeBudget === null) break;

      DataStore.setActiveBudget(activeBudget);
      break;

    case "budget/createNewBudget":
      const newBudget: Budget | null = (store.getState() as StoreState).budget
        .activeBudget;
      const oldBudgets: Budget[] = (store.getState() as StoreState).budget
        .pastBudgets;
      if (newBudget === null) break;

      DataStore.setActiveBudget(newBudget);
      DataStore.updateInactiveBudgets(oldBudgets);
      break;

    case "budget/deletePastBudget":
      const pastBudgets: Budget[] = (store.getState() as StoreState).budget
        .pastBudgets;
      DataStore.updateInactiveBudgets(pastBudgets);
      break;

    case "budget/resetStore":
      DataStore.resetBudgetStore();
      break;

    case "setting/setCurrency":
    case "setting/setTheme":
    case "setting/setColor":
    case "setting/setOnBoarded":
      const settings: Settings = (store.getState() as StoreState).setting;
      DataStore.setSettings(settings);
      break;

    case "setting/resetSetting":
      DataStore.resetSettingStore();
      break;
  }
};
