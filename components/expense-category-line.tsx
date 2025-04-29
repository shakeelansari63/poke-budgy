import { View } from "react-native";
import { useState, useRef } from "react";
import { List, Chip, IconButton, ProgressBar, useTheme } from "react-native-paper";
import { ExpenseCategory } from "../model/expense";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

interface BudgetProps {
    budget: ExpenseCategory;
}

const ExpenseCategoryLine = ({ budget }: BudgetProps) => {
    const theme = useTheme();
    const sheetRef = useRef<BottomSheetModal>(null);
    const totalExpense = budget.Expenses.reduce((acc, expense) => acc + expense.Amount, 0);
    const totalUsage = totalExpense >= budget.Amount ? 1.0 : (totalExpense * 1.0) / budget.Amount;

    return (
        <View>
            <List.Item
                title={budget.Category}
                left={() => (
                    <Chip compact={true} elevated={true}>
                        {budget.Amount}
                    </Chip>
                )}
                right={(param) => (
                    <IconButton
                        icon="pencil"
                        onPress={() => sheetRef.current?.present()}
                        iconColor={param.color}
                        size={20}
                        style={{ margin: 0, padding: 0 }}
                    />
                )}
            />
            <ProgressBar progress={totalUsage} color={totalUsage === 1.0 ? theme.colors.error : theme.colors.primary} />
        </View>
    );
};

export default ExpenseCategoryLine;
