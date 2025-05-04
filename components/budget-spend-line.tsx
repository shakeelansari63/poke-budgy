import { Chip, Divider, List, IconButton, Portal, Dialog, Button, Text, useTheme } from "react-native-paper";
import React from "react";
import { Expense } from "../model/expense";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import EditBudgetSpendDialog from "./budget-spend-dialog";
import { useDispatch } from "react-redux";
import { deleteExpense } from "../storage/slices/budget-slice";

interface BudgetSpendLineProp {
    expense: Expense;
    categoryId: string;
}

const BudgetSpendLine = ({ expense, categoryId }: BudgetSpendLineProp) => {
    const sheetRef = React.createRef<BottomSheetModal>();

    const [deleteModalVisible, setDeleteModalVisible] = React.useState<boolean>(false);
    const theme = useTheme();
    const dispactch = useDispatch();

    const delExpense = () => {
        dispactch(deleteExpense({ expenseId: expense.Id, categoryId: categoryId }));
    };

    return (
        <>
            <EditBudgetSpendDialog expense={expense} categoryId={categoryId} sheetRef={sheetRef} />
            <List.Item
                title={expense.Comment}
                left={() => (
                    <Chip compact={true} elevated={true}>
                        {expense.Amount}
                    </Chip>
                )}
                right={(param) => (
                    <IconButton
                        icon="trash-can"
                        onPress={() => setDeleteModalVisible(true)}
                        iconColor={param.color}
                        size={20}
                        style={{ margin: 0, padding: 0 }}
                    />
                )}
                onPress={() => {
                    sheetRef.current?.present();
                }}
            />
            <Divider />
            <Portal>
                <Dialog
                    visible={deleteModalVisible}
                    style={{ margin: 15 }}
                    onDismiss={() => setDeleteModalVisible(false)}
                >
                    <Dialog.Title>Are you sure?</Dialog.Title>
                    <Dialog.Content>
                        <Text>Are you sure you want to delete the Income "{expense.Comment}"?</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button
                            mode="text"
                            textColor={theme.colors.onBackground}
                            icon="cancel"
                            onPress={() => setDeleteModalVisible(false)}
                        >
                            Cancel
                        </Button>
                        <Button mode="text" textColor={theme.colors.error} icon="trash-can" onPress={delExpense}>
                            Delete
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </>
    );
};

export default BudgetSpendLine;
