import { Card, Chip } from "react-native-paper";
import React from "react";
import { Budget } from "../model/budget";

interface PastBudgetCardProp {
    budget: Budget;
}

const PastBudgetCard = ({ budget }: PastBudgetCardProp) => {
    const dateOption: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
    };

    const startDate: string =
        typeof budget.StartDate == "string"
            ? new Date(budget.StartDate).toLocaleDateString("en-US", dateOption)
            : budget.StartDate.toLocaleDateString("en-US", dateOption);
    const endDate: string =
        typeof budget.EndDate == "string"
            ? new Date(budget.EndDate).toLocaleDateString("en-US", dateOption)
            : budget.EndDate.toLocaleDateString("en-US", dateOption);

    const totalIncome = budget?.Incomes.reduce((acc, inc) => acc + inc.Amount, 0) ?? 0;
    const totalBudgeted = budget?.Expenses.reduce((acc, exp) => acc + exp.Amount, 0) ?? 0;
    const totalSpent =
        budget?.Expenses.reduce(
            (acc, exp) => acc + exp.Expenses.reduce((accIn, expIn) => accIn + expIn.Amount, 0),
            0
        ) ?? 0;
    const totalSaved = totalIncome - totalBudgeted;

    return (
        <Card style={{ margin: 10 }}>
            <Card.Title
                title={<Chip>From: {startDate}</Chip>}
                right={() => <Chip>To: {endDate}</Chip>}
                titleVariant="titleSmall"
            />
        </Card>
    );
};

export default PastBudgetCard;
