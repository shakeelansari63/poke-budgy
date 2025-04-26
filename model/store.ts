import { Budget } from "./budget";
export interface BudgetState {
    pastBudgets: Budget[];
    activeBudget: Budget | null;
}
