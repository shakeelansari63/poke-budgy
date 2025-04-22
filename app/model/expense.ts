export interface ExpenseCategory {
    Id: string;
    Category: string;
    Amount: number;
    Expenses: Expense[];
}

export interface Expense {
    Id: string;
    ExpenseDate: Date;
    Amount: number;
    Comment: string;
}
