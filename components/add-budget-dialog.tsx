import { Button, TextInput, Card, IconButton, useTheme } from "react-native-paper";
import { useState, RefObject } from "react";
import { ScrollView } from "react-native";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useDispatch } from "react-redux";
import { addExpenseCategory } from "../storage/slices/budget-slice";
import { ExpenseCategory } from "@/model/expense";

interface AddBudgetDialogProps {
    sheetRef: RefObject<BottomSheetModal>;
}

const AddBudgetDialog = ({ sheetRef }: AddBudgetDialogProps) => {
    const [category, setCategory] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [dirty, setDirty] = useState<boolean>(false);

    const dispatch = useDispatch();

    const resetForm = () => {
        setCategory("");
        setAmount(0);
    };

    const saveForm = () => {
        if (dirty && category !== "" && amount !== 0) {
            const cat: ExpenseCategory = {
                Id: "",
                Category: category,
                Amount: amount,
                Expenses: [],
            };

            dispatch(addExpenseCategory(cat));
            resetForm();
            sheetRef.current?.dismiss();
        }
    };

    const theme = useTheme();

    return (
        <BottomSheetModal ref={sheetRef} enableDynamicSizing={true}>
            <BottomSheetView style={{ backgroundColor: theme.colors.background }}>
                <Card>
                    <Card.Title
                        title="Add Budget"
                        titleVariant="titleLarge"
                        right={() => <IconButton icon="close" onPress={() => sheetRef.current?.dismiss()} />}
                    />
                    <Card.Content>
                        <ScrollView>
                            <TextInput
                                mode="outlined"
                                label="Budget"
                                value={category}
                                onChangeText={(txt) => {
                                    setDirty(true);
                                    setCategory(txt);
                                }}
                                style={{ marginBottom: 10 }}
                            />
                            <TextInput
                                mode="outlined"
                                label="Amount"
                                keyboardType="numeric"
                                value={amount.toString()}
                                onChangeText={(text) => {
                                    const number = text.replace(/[^0-9]/g, "");
                                    const updateVal = number === "" ? 0 : parseFloat(number);
                                    setDirty(true);
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
            </BottomSheetView>
        </BottomSheetModal>
    );
};

export default AddBudgetDialog;
