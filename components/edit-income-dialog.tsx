import { ScrollView } from "react-native";
import { Button, TextInput, Card, IconButton, useTheme } from "react-native-paper";
import { useState, RefObject } from "react";
import { Income } from "../model/income";
import { DatePickerInput } from "react-native-paper-dates";
import { useDispatch } from "react-redux";
import { deleteIncome, editIncome, addIncome } from "../storage/slices/budget-slice";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";

interface EditIncomeDialogProps {
    income?: Income;
    sheetRef: RefObject<BottomSheetModal>;
}

const EditIncomeDialog = ({ income, sheetRef }: EditIncomeDialogProps) => {
    const parsedDate = typeof income?.IncomeDate === "string" ? new Date(income.IncomeDate) : income?.IncomeDate;
    const [incomeSource, setIncomeSource] = useState(income?.Source ?? "");
    const [incomeAmount, setIncomeAmount] = useState(income?.Amount ?? 0);
    const [incomeDate, setIncomeDate] = useState(parsedDate ?? new Date());
    const [dirty, setDirty] = useState(false);

    const theme = useTheme();

    const dispatch = useDispatch();

    const resetForm = () => {
        setIncomeSource("");
        setIncomeAmount(0);
        setIncomeDate(new Date());
    };

    const addIncomeHandler = () => {
        if (!dirty) return;
        dispatch(
            addIncome({
                Id: "",
                Source: incomeSource,
                IncomeDate: incomeDate,
                Amount: incomeAmount,
            })
        );
        sheetRef.current?.dismiss();
        resetForm();
    };

    const deleteIncomeHandler = () => {
        dispatch(deleteIncome(income?.Id));
        sheetRef.current?.dismiss();
    };

    const updateIncomeHandler = () => {
        if (!dirty) return;
        dispatch(
            editIncome({
                ...income,
                Source: incomeSource,
                IncomeDate: incomeDate,
                Amount: incomeAmount,
            })
        );
        sheetRef.current?.dismiss();
    };

    return (
        <BottomSheetModal ref={sheetRef} enableDynamicSizing={true}>
            <BottomSheetView style={{ backgroundColor: theme.colors.background }}>
                <Card>
                    <Card.Title
                        title={income == undefined ? "Add Income" : "Edit Income"}
                        titleVariant="titleLarge"
                        right={() => <IconButton icon="close" onPress={() => sheetRef.current?.dismiss()} />}
                    />
                    <Card.Content>
                        <ScrollView>
                            <TextInput
                                mode="outlined"
                                label="Source"
                                value={incomeSource}
                                onChangeText={(txt) => {
                                    setDirty(true);
                                    setIncomeSource(txt);
                                }}
                                style={{ marginBottom: 10 }}
                            />
                            <TextInput
                                mode="outlined"
                                label="Amount"
                                keyboardType="numeric"
                                value={incomeAmount.toString()}
                                onChangeText={(text) => {
                                    const number = text.replace(/[^0-9]/g, "");
                                    const updateVal = number === "" ? 0 : parseFloat(number);
                                    setDirty(true);
                                    setIncomeAmount(updateVal);
                                }}
                                style={{ marginBottom: 10 }}
                            />
                            <DatePickerInput
                                mode="outlined"
                                locale="en"
                                label="Income Date"
                                value={incomeDate}
                                onChange={(d) => {
                                    if (d !== undefined) {
                                        setDirty(true);
                                        setIncomeDate(d);
                                    }
                                }}
                                inputMode="start"
                                presentationStyle="pageSheet"
                                style={{ marginBottom: 10 }}
                            />
                        </ScrollView>
                    </Card.Content>
                    <Card.Actions>
                        {income !== null ? (
                            <Button
                                mode="text"
                                textColor={theme.colors.error}
                                icon="trash-can"
                                onPress={deleteIncomeHandler}
                            >
                                Delete
                            </Button>
                        ) : null}
                        <Button
                            mode="text"
                            textColor={theme.colors.primary}
                            icon="content-save"
                            onPress={income === undefined ? addIncomeHandler : updateIncomeHandler}
                        >
                            Save
                        </Button>
                    </Card.Actions>
                </Card>
            </BottomSheetView>
        </BottomSheetModal>
    );
};

export default EditIncomeDialog;
