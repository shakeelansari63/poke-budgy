import { Text, Card, IconButton, Avatar } from "react-native-paper";
import { useSelector } from "react-redux";
import { BudgetState } from "../model/store";
import { Budget } from "../model/budget";
import ExpenseCategoryLine from "./expense-category-line";
import AddBudgetDialog from "./add-budget-dialog";
import { useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const ExpenseSection = () => {
    const currentBudget = useSelector<BudgetState, Budget | null>((state) => state.activeBudget);
    const totalBudgeted = currentBudget?.Expenses.reduce((acc, category) => acc + category.Amount, 0);
    const sheetRef = useRef<BottomSheetModal>(null);

    return (
        <>
            <AddBudgetDialog sheetRef={sheetRef} />
            <Card mode="elevated" style={{ margin: 10 }}>
                <Card.Title
                    title="Budgets"
                    titleVariant="titleLarge"
                    subtitle={"Total: " + totalBudgeted}
                    left={() => <Avatar.Icon icon="cart-arrow-up" size={40} />}
                    right={() => (
                        <IconButton
                            icon="plus"
                            onPress={() => {
                                sheetRef.current?.present();
                            }}
                        />
                    )}
                />
                <Card.Content>
                    {currentBudget === null ? (
                        <Text>No active budget</Text>
                    ) : (
                        <>
                            {currentBudget.Expenses.map((expense) => (
                                <ExpenseCategoryLine key={expense.Id} budget={expense} />
                            ))}
                        </>
                    )}
                </Card.Content>
            </Card>
        </>
    );
};

export default ExpenseSection;
