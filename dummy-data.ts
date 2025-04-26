import { Budget } from "./model/budget";
import { nanoid } from "@reduxjs/toolkit";

const budgets: Budget[] = [
    {
        Id: nanoid(),
        StartDate: new Date(2024, 12, 25),
        EndDate: new Date(2025, 1, 24),
        Incomes: [
            {
                Id: nanoid(),
                IncomeDate: new Date(2024, 12, 25),
                Amount: 20000,
                Source: "Salary",
            },
        ],
        Expenses: [
            {
                Id: nanoid(),
                Category: "Rent",
                Amount: 18000,
                Expenses: [
                    {
                        Id: nanoid(),
                        ExpenseDate: new Date(2025, 1, 1),
                        Amount: 18000,
                        Comment: "Paid",
                    },
                ],
            },
            {
                Id: nanoid(),
                Category: "Bai",
                Amount: 1800,
                Expenses: [
                    {
                        Id: nanoid(),
                        ExpenseDate: new Date(2025, 1, 1),
                        Amount: 1800,
                        Comment: "Paid",
                    },
                ],
            },
        ],
    },
    {
        Id: nanoid(),
        StartDate: new Date(2025, 1, 25),
        EndDate: new Date(2025, 2, 24),
        Incomes: [
            {
                Id: nanoid(),
                IncomeDate: new Date(2025, 1, 25),
                Amount: 20000,
                Source: "Salary",
            },
            {
                Id: nanoid(),
                IncomeDate: new Date(2025, 2, 1),
                Amount: 2000,
                Source: "Freelance",
            },
        ],
        Expenses: [
            {
                Id: nanoid(),
                Category: "Rent",
                Amount: 18000,
                Expenses: [
                    {
                        Id: nanoid(),
                        ExpenseDate: new Date(2025, 2, 1),
                        Amount: 18000,
                        Comment: "Paid",
                    },
                ],
            },
            {
                Id: nanoid(),
                Category: "Bai",
                Amount: 1600,
                Expenses: [
                    {
                        Id: nanoid(),
                        ExpenseDate: new Date(2025, 2, 1),
                        Amount: 1600,
                        Comment: "Paid",
                    },
                ],
            },
        ],
    },
    {
        Id: nanoid(),
        StartDate: new Date(2025, 2, 25),
        EndDate: new Date(2025, 3, 24),
        Incomes: [
            {
                Id: nanoid(),
                IncomeDate: new Date(2025, 2, 25),
                Amount: 20000,
                Source: "Salary",
            },
            {
                Id: nanoid(),
                IncomeDate: new Date(2025, 3, 1),
                Amount: 1200,
                Source: "Freelance",
            },
        ],
        Expenses: [
            {
                Id: nanoid(),
                Category: "Rent",
                Amount: 18000,
                Expenses: [
                    {
                        Id: nanoid(),
                        ExpenseDate: new Date(2025, 3, 1),
                        Amount: 18000,
                        Comment: "Paid",
                    },
                ],
            },
            {
                Id: nanoid(),
                Category: "Bai",
                Amount: 1800,
                Expenses: [
                    {
                        Id: nanoid(),
                        ExpenseDate: new Date(2025, 3, 1),
                        Amount: 1600,
                        Comment: "Paid",
                    },
                ],
            },
        ],
    },
];

export default budgets;
