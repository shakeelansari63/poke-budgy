import { Budget } from "./budget";
import { Settings } from "./settings";
export interface BudgetState {
  pastBudgets: Budget[];
  activeBudget: Budget | null;
}

export interface StoreState {
  budget: BudgetState;
  setting: Settings;
}
