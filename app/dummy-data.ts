import { Budget } from "./model/budget";
import { v4 as UUIDv4 } from "uuid";
import dataStorage from "./storage/storage";

const budgets: Budget[] = [
    {
        Id: UUIDv4(),
        StartDate: new Date(2024, 12, 25),
        EndDate: new Date(2025, 1, 24),
        Incomes: [
            {
                Id: UUIDv4(),
                IncomeDate: new Date(2024, 12, 25),
                Amount: 20000,
                Source: "Salary",
            },
        ],
        Expenses: [
            {
                Id: UUIDv4(),
                Category: "Rent",
                Amount: 18000,
                Expenses: [
                    {
                        Id: UUIDv4(),
                        ExpenseDate: new Date(2025, 1, 1),
                        Amount: 18000,
                        Comment: "Paid",
                    },
                ],
            },
            {
                Id: UUIDv4(),
                Category: "Bai",
                Amount: 1800,
                Expenses: [
                    {
                        Id: UUIDv4(),
                        ExpenseDate: new Date(2025, 1, 1),
                        Amount: 1800,
                        Comment: "Paid",
                    },
                ],
            },
        ],
        IsCurrent: false,
    },
    {
        Id: UUIDv4(),
        StartDate: new Date(2025, 1, 25),
        EndDate: new Date(2025, 2, 24),
        Incomes: [
            {
                Id: UUIDv4(),
                IncomeDate: new Date(2025, 1, 25),
                Amount: 20000,
                Source: "Salary",
            },
            {
                Id: UUIDv4(),
                IncomeDate: new Date(2025, 2, 1),
                Amount: 2000,
                Source: "Freelance",
            },
        ],
        Expenses: [
            {
                Id: UUIDv4(),
                Category: "Rent",
                Amount: 18000,
                Expenses: [
                    {
                        Id: UUIDv4(),
                        ExpenseDate: new Date(2025, 2, 1),
                        Amount: 18000,
                        Comment: "Paid",
                    },
                ],
            },
            {
                Id: UUIDv4(),
                Category: "Bai",
                Amount: 1600,
                Expenses: [
                    {
                        Id: UUIDv4(),
                        ExpenseDate: new Date(2025, 2, 1),
                        Amount: 1600,
                        Comment: "Paid",
                    },
                ],
            },
        ],
        IsCurrent: false,
    },
    {
        Id: UUIDv4(),
        StartDate: new Date(2025, 2, 25),
        EndDate: new Date(2025, 3, 24),
        Incomes: [
            {
                Id: UUIDv4(),
                IncomeDate: new Date(2025, 2, 25),
                Amount: 20000,
                Source: "Salary",
            },
            {
                Id: UUIDv4(),
                IncomeDate: new Date(2025, 3, 1),
                Amount: 1200,
                Source: "Freelance",
            },
        ],
        Expenses: [
            {
                Id: UUIDv4(),
                Category: "Rent",
                Amount: 18000,
                Expenses: [
                    {
                        Id: UUIDv4(),
                        ExpenseDate: new Date(2025, 3, 1),
                        Amount: 18000,
                        Comment: "Paid",
                    },
                ],
            },
            {
                Id: UUIDv4(),
                Category: "Bai",
                Amount: 1800,
                Expenses: [
                    {
                        Id: UUIDv4(),
                        ExpenseDate: new Date(2025, 3, 1),
                        Amount: 1600,
                        Comment: "Paid",
                    },
                ],
            },
        ],
        IsCurrent: true,
    },
];

export default budgets;
