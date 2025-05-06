import { Chip, Divider, List } from "react-native-paper";
import React from "react";
import { Expense } from "../model/expense";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import EditBudgetSpendDialog from "./budget-spend-dialog";
import { useCurrencySymbol } from "../hooks/use-settings";

interface BudgetSpendLineProp {
    expense: Expense;
    categoryId: string;
}

const BudgetSpendLine = ({ expense, categoryId }: BudgetSpendLineProp) => {
    const sheetRef = React.useRef<BottomSheetModal>(null);
    const currencySymbol = useCurrencySymbol();

    return (
        <>
            <EditBudgetSpendDialog expense={expense} categoryId={categoryId} sheetRef={sheetRef} />
            <List.Item
                title={expense.Comment}
                left={() => (
                    <Chip compact={true} elevated={true}>
                        {currencySymbol} {expense.Amount}
                    </Chip>
                )}
                onPress={() => {
                    sheetRef.current?.present();
                }}
            />
            <Divider />
        </>
    );
};

export default BudgetSpendLine;
