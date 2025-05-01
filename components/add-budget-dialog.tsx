import { Button, TextInput, Card, IconButton, useTheme } from "react-native-paper";
import { useState, RefObject } from "react";
import { ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { addExpenseCategory } from "../storage/slices/budget-slice";
import { ExpenseCategory } from "../model/expense";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import Dialog from "./dialog";

interface AddBudgetDialogProps {
    sheetRef: RefObject<BottomSheetModal | null>;
}

const AddBudgetDialog = ({ sheetRef }: AddBudgetDialogProps) => {
    const [category, setCategory] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);

    const dispatch = useDispatch();

    const resetForm = () => {
        setCategory("");
        setAmount(0);
    };

    const saveForm = () => {
        if (category !== "" && amount !== 0) {
            const cat: ExpenseCategory = {
                Id: "",
                Category: category,
                Amount: amount,
                Expenses: [],
            };

            dispatch(addExpenseCategory(cat));
            resetForm();
            sheetRef?.current?.dismiss();
        }
    };

    const theme = useTheme();

    return (
        <Dialog sheetRef={sheetRef}>
            <Card>
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
                            onChangeText={(txt) => setCategory(txt)}
                            style={{ marginBottom: 10 }}
                        />
                        <TextInput
                            mode="outlined"
                            label="Amount"
                            keyboardType="numeric"
                            defaultValue={amount.toString()}
                            onChangeText={(txt) => {
                                const number = txt.replace(/[^0-9]/g, "");
                                const updateVal = number === "" ? 0 : parseFloat(number);
                                setAmount(updateVal);
                            }}
                            style={{ marginBottom: 10 }}
                        />
                    </ScrollView>
                </Card.Content>
                <Card.Actions>
                    <Button mode="text" textColor={theme.colors.primary} icon="content-save" onPress={saveForm}>
                        Save
                    </Button>
                </Card.Actions>
            </Card>
        </Dialog>
    );
};

export default AddBudgetDialog;
