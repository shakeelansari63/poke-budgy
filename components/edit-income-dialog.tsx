import { ScrollView } from "react-native";
import { Button, TextInput, Surface, Card, IconButton, useTheme } from "react-native-paper";
import { useState, RefObject } from "react";
import { Income } from "../model/income";
import { DatePickerInput } from "react-native-paper-dates";
import { useDispatch } from "react-redux";
import { editIncome, addIncome } from "../storage/slices/budget-slice";
import { BottomSheetModal, BottomSheetTextInput } from "@gorhom/bottom-sheet";
import Dialog from "./dialog";
import { useCurrencySymbol } from "../hooks/use-settings";

interface EditIncomeDialogProps {
    income?: Income;
    sheetRef: RefObject<BottomSheetModal | null>;
}

const EditIncomeDialog = ({ income, sheetRef }: EditIncomeDialogProps) => {
    const parsedDate = typeof income?.IncomeDate === "string" ? new Date(income.IncomeDate) : income?.IncomeDate;
    const [incomeSource, setIncomeSource] = useState(income?.Source ?? "");
    const [incomeAmount, setIncomeAmount] = useState(income?.Amount ?? 0);
    const [incomeDate, setIncomeDate] = useState(parsedDate ?? new Date());
    const [dirty, setDirty] = useState(false);
    const currencySymbol = useCurrencySymbol();

    const dispatch = useDispatch();

    const theme = useTheme();

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
        <Dialog sheetRef={sheetRef}>
            <Surface mode="flat" style={{ marginVertical: 10, marginHorizontal: 20 }}>
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
                            defaultValue={incomeSource}
                            onChangeText={(txt) => {
                                setDirty(true);
                                setIncomeSource(txt);
                            }}
                            style={{ marginBottom: 10 }}
                            render={(props) => <BottomSheetTextInput {...props} />}
                        />
                        <TextInput
                            mode="outlined"
                            label="Amount"
                            keyboardType="numeric"
                            defaultValue={incomeAmount === 0 ? "" : incomeAmount.toString()}
                            onChangeText={(text) => {
                                const number = text.replace(/[^0-9\.]/g, "");
                                const updateVal = number === "" ? 0 : parseFloat(number);
                                setDirty(true);
                                setIncomeAmount(updateVal);
                            }}
                            style={{ marginBottom: 10 }}
                            render={(props) => <BottomSheetTextInput {...props} />}
                            left={<TextInput.Affix text={currencySymbol} />}
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
                            render={(props) => <BottomSheetTextInput {...props} />}
                        />
                    </ScrollView>
                </Card.Content>
                <Card.Actions>
                    <Button
                        mode="text"
                        textColor={theme.colors.onPrimaryContainer}
                        icon="content-save"
                        onPress={income === undefined ? addIncomeHandler : updateIncomeHandler}
                    >
                        Save
                    </Button>
                </Card.Actions>
            </Surface>
        </Dialog>
    );
};

export default EditIncomeDialog;
