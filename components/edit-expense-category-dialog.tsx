import { Button, TextInput, Surface, Card, IconButton, useTheme } from "react-native-paper";
import { useState, RefObject } from "react";
import { ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { addExpenseCategory, editExpenseCategory } from "../storage/slices/budget-slice";
import { ExpenseCategory } from "../model/expense";
import { BottomSheetModal, BottomSheetTextInput } from "@gorhom/bottom-sheet";
import Dialog from "./dialog";

interface EditExpenseCategoryDialogProps {
    expenseCat?: ExpenseCategory;
    sheetRef: RefObject<BottomSheetModal | null>;
}

const EditExpenseCategoryDialog = ({ expenseCat, sheetRef }: EditExpenseCategoryDialogProps) => {
    const [category, setCategory] = useState<string>(expenseCat?.Category ?? "");
    const [amount, setAmount] = useState<number>(expenseCat?.Amount ?? 0);
    const [dirty, setDirty] = useState<boolean>(false);

    const dispatch = useDispatch();

    const resetForm = () => {
        setCategory("");
        setAmount(0);
    };

    const saveExpenseCategory = () => {
        if (category !== "" && amount !== 0) {
            const cat: ExpenseCategory = {
                Id: "",
                Category: category,
                Amount: amount,
                Expenses: [],
            };

            dispatch(addExpenseCategory(cat));
            sheetRef?.current?.dismiss();
            resetForm();
        }
    };

    const updateExpenseCategory = () => {
        if (!dirty) return;

        if (category !== "" && amount !== 0 && expenseCat) {
            const cat: ExpenseCategory = {
                ...expenseCat,
                Category: category,
                Amount: amount,
            };

            dispatch(editExpenseCategory(cat));
            sheetRef?.current?.dismiss();
        }
    };

    const theme = useTheme();

    return (
        <Dialog sheetRef={sheetRef}>
            <Surface mode="flat">
                <Card.Title
                    title="Add Budget"
                    titleVariant="titleLarge"
                    right={() => <IconButton icon="close" onPress={() => sheetRef?.current?.dismiss()} />}
                />
                <Card.Content>
                    <ScrollView>
                        <TextInput
                            mode="outlined"
                            label="Budget"
                            defaultValue={category}
                            onChangeText={(txt) => {
                                setDirty(true);
                                setCategory(txt);
                            }}
                            style={{ marginBottom: 10 }}
                            render={(props) => <BottomSheetTextInput {...props} />}
                        />
                        <TextInput
                            mode="outlined"
                            label="Amount"
                            keyboardType="numeric"
                            defaultValue={amount === 0 ? "" : amount.toString()}
                            onChangeText={(txt) => {
                                const number = txt.replace(/[^0-9]/g, "");
                                const updateVal = number === "" ? 0 : parseFloat(number);
                                setDirty(true);
                                setAmount(updateVal);
                            }}
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
                        onPress={expenseCat ? updateExpenseCategory : saveExpenseCategory}
                    >
                        Save
                    </Button>
                </Card.Actions>
            </Surface>
        </Dialog>
    );
};

export default EditExpenseCategoryDialog;
