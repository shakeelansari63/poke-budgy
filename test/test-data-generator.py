from datetime import datetime, timedelta
from nanoid import generate
import random
import json


# Helper functions
def random_income_source():
    return random.choice(
        ["Salary", "Freelance", "Investment", "Gift", "Bonus", "Stocks"]
    )


def random_expense_category() -> str:
    return random.choice(
        [
            "Rent",
            "Groceries",
            "Utilities",
            "Entertainment",
            "Transportation",
            "Healthcare",
            "Insurance",
            "Gift",
            "Maid",
        ]
    )


def generate_income(start_date):
    fmt_date = f"{start_date.strftime('%Y-%m-%d')}T18:30:00.000Z"
    return {
        "Id": generate(),
        "IncomeDate": fmt_date,
        "Source": random_income_source(),
        "Amount": round(random.uniform(2000, 7000), 2),
    }


def generate_expense(expense_date):
    fmt_date = f"{expense_date.strftime('%Y-%m-%d')}T18:30:00.000Z"
    return {
        "Id": generate(),
        "ExpenseDate": fmt_date,
        "Amount": round(random.uniform(10, 500), 2),
        "Comment": random.choice(
            [
                "Grocery shopping",
                "Movie night",
                "Utility bill",
                "Transport cost",
                "Doctor visit",
                "Gifted",
                "Insurance Premium",
                "School Fees",
                "Mortgage",
            ]
        ),
    }


def generate_expense_category(start_date):
    category = random_expense_category()
    num_expenses = random.randint(3, 6)
    expenses = [
        generate_expense(start_date + timedelta(days=random.randint(0, 27)))
        for _ in range(num_expenses)
    ]
    total_amount = round(sum(e["Amount"] for e in expenses), 2)
    return {
        "Id": generate(),
        "Category": category,
        "Amount": total_amount,
        "Expenses": expenses,
    }


def generate_monthly_budgets(
    start_month: int, start_year: int, end_month: int, end_year: int
):
    budgets = []
    current = datetime(start_year, start_month, 1)
    end = datetime(end_year, end_month, 1)

    while current <= end:
        next_month = current.replace(day=28) + timedelta(days=4)
        last_day = (next_month - timedelta(days=next_month.day)).day
        start_date = current
        end_date = current.replace(day=last_day)
        incomes = [generate_income(start_date)]
        expense_categories = [generate_expense_category(start_date) for _ in range(3)]

        fmt_s_date = f"{start_date.strftime('%Y-%m-%d')}T18:30:00.000Z"
        fmt_e_date = f"{end_date.strftime('%Y-%m-%d')}T18:30:00.000Z"

        budgets.append(
            {
                "Id": generate(),
                "StartDate": fmt_s_date,
                "EndDate": fmt_e_date,
                "Incomes": incomes,
                "Expenses": expense_categories,
            }
        )

        current = next_month.replace(day=1)

    return budgets


# Create StoreState object
budgets = generate_monthly_budgets(1, 2024, 5, 2025)

store_state = {
    "budget": {"activeBudget": budgets[-1], "pastBudgets": budgets[:-1]},
    "setting": {"currency": "USD", "theme": "dark"},
}

# Print or save the result
print(json.dumps(store_state, indent=2))
