import { ScrollView } from "react-native";
import { Button, TextInput, Surface, Card, IconButton, useTheme } from "react-native-paper";
import { useState, RefObject } from "react";
import { DatePickerInput } from "react-native-paper-dates";
import { useDispatch } from "react-redux";
import { addExpense, editExpense } from "../storage/slices/budget-slice";
import { BottomSheetModal, BottomSheetTextInput } from "@gorhom/bottom-sheet";
import Dialog from "./dialog";
import { Expense } from "../model/expense";

interface EditBudgetSpendDialogProps {
    expense?: Expense;
    categoryId: string;
    sheetRef: RefObject<BottomSheetModal | null>;
}

const EditBudgetSpendDialog = ({ expense, categoryId, sheetRef }: EditBudgetSpendDialogProps) => {
    const parsedDate = typeof expense?.ExpenseDate === "string" ? new Date(expense.ExpenseDate) : expense?.ExpenseDate;
    const [expenseComment, setExpenseComment] = useState(expense?.Comment ?? "");
    const [expenseAmount, setExpenseAmount] = useState(expense?.Amount ?? 0);
    const [expenseDate, setExpenseDate] = useState(parsedDate ?? new Date());
    const [dirty, setDirty] = useState(false);

    const dispatch = useDispatch();

    const theme = useTheme();

    const resetForm = () => {
        setExpenseComment("");
        setExpenseAmount(0);
        setExpenseDate(new Date());
    };

    const addExpenseHandler = () => {
        if (!dirty) return;
        dispatch(
            addExpense({
                expense: { Id: "", Comment: expenseComment, ExpenseDate: expenseDate, Amount: expenseAmount },
                categoryId: categoryId,
            })
        );
        sheetRef.current?.dismiss();
        resetForm();
    };

    const updateExpenseHandler = () => {
        if (!dirty) return;
        dispatch(
            editExpense({
                expense: {
                    ...expense,
                    Comment: expenseComment,
                    ExpenseDate: expenseDate,
                    Amount: expenseAmount,
                },
                categoryId: categoryId,
            })
        );
        sheetRef.current?.dismiss();
    };

    return (
        <Dialog sheetRef={sheetRef}>
            <Surface mode="flat">
                <Card.Title
                    title={expense === undefined ? "Add Expense" : "Edit Expense"}
                    titleVariant="titleLarge"
                    right={() => <IconButton icon="close" onPress={() => sheetRef.current?.dismiss()} />}
                />
                <Card.Content>
                    <ScrollView>
                        <TextInput
                            mode="outlined"
                            label="Comment"
                            defaultValue={expenseComment}
                            onChangeText={(txt) => {
                                setDirty(true);
                                setExpenseComment(txt);
                            }}
                            style={{ marginBottom: 10 }}
                            render={(props) => <BottomSheetTextInput {...props} />}
                        />
                        <TextInput
                            mode="outlined"
                            label="Amount"
                            keyboardType="numeric"
                            defaultValue={expenseAmount === 0 ? "" : expenseAmount.toString()}
                            onChangeText={(text) => {
                                const number = text.replace(/[^0-9]/g, "");
                                const updateVal = number === "" ? 0 : parseFloat(number);
                                setDirty(true);
                                setExpenseAmount(updateVal);
                            }}
                            style={{ marginBottom: 10 }}
                            render={(props) => <BottomSheetTextInput {...props} />}
                        />
                        <DatePickerInput
                            mode="outlined"
                            locale="en"
                            label="Income Date"
                            value={expenseDate}
                            onChange={(d) => {
                                if (d !== undefined) {
                                    setDirty(true);
                                    setExpenseDate(d);
                                }
                            }}
                            inputMode="start"
                            presentationStyle="pageSheet"
                            style={{ marginBottom: 10 }}
                            render={(props) => <BottomSheetTextInput {...props} />}
                        />
                    </ScrollView>
                </Card.Content>
                <Card.Actions>
                    <Button
                        mode="text"
                        textColor={theme.colors.onPrimaryContainer}
                        icon="content-save"
                        onPress={expense === undefined ? addExpenseHandler : updateExpenseHandler}
                    >
                        Save
                    </Button>
                </Card.Actions>
            </Surface>
        </Dialog>
    );
};

export default EditBudgetSpendDialog;
