import { Chip, Divider, List, IconButton } from "react-native-paper";
import React from "react";
import { Expense } from "../model/expense";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import EditBudgetSpendDialog from "./budget-spend-dialog";

interface BudgetSpendLineProp {
    expense: Expense;
    categoryId: string;
}

const BudgetSpendLine = ({ expense, categoryId }: BudgetSpendLineProp) => {
    const sheetRef = React.createRef<BottomSheetModal>();

    return (
        <>
            <List.Item
                title={expense.Comment}
                left={() => (
                    <Chip compact={true} elevated={true}>
                        {expense.Amount}
                    </Chip>
                )}
                right={(param) => (
                    <IconButton
                        icon="pencil"
                        onPress={() => {
                            sheetRef.current?.present();
                        }}
                        iconColor={param.color}
                        size={20}
                        style={{ margin: 0, padding: 0 }}
                    />
                )}
            />
            <Divider />
            <EditBudgetSpendDialog expense={expense} categoryId={categoryId} sheetRef={sheetRef} />
        </>
    );
};

export default BudgetSpendLine;
