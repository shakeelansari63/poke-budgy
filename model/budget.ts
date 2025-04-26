import { ExpenseCategory } from "./expense";
import { Income } from "./income";

export interface Budget {
    Id: string;
    StartDate: Date;
    EndDate: Date;
    Incomes: Income[];
    Expenses: ExpenseCategory[];
}
