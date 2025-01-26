export interface Income {
    Id: string;
    Source: string;
    Amount: number;
}

export interface Expense {
    Id: string;
    Name: string;
    Amount: number;
}

export interface Transaction {
    Id: string;
    ExpenseId: string;
    Name: string;
    Amount: number;
}

export interface Budget {
    StartDate: Date;
    EndDate: Date;
    Incomes: Income[];
    Expenses: Expense[];
}

export interface PastBudget {
    Seq: number;
    StartDate: Date;
    EndDate: Date;
    Incomes: Income[];
    Expenses: Expense[];
}
