import { Dialog, Button, MD3Colors, TextInput } from "react-native-paper";
import { useState, useCallback } from "react";
import { Income } from "../model/income";
import { DatePickerInput } from "react-native-paper-dates";

interface EditIncomeDialogProps {
    income: Income;
    visible: boolean;
    setVisible: (visible: boolean) => void;
}
const EditIncomeDialog = ({ income, visible, setVisible }: EditIncomeDialogProps) => {
    const [incomeSource, setIncomeSource] = useState(income.Source);
    const [incomeAmount, setIncomeAmount] = useState(income.Amount);
    const [incomeDate, setIncomeDate] = useState(income.IncomeDate);
    const [datePickerOpen, setDatePickerOpen] = useState(false);

    const onDateConfirm = useCallback(
        (params) => {
            setDatePickerOpen(false);
            setIncomeDate(params.date);
        },
        [setDatePickerOpen, setIncomeDate]
    );

    return (
        <Dialog visible={visible} dismissable={false}>
            <Dialog.Title>Edit Income</Dialog.Title>
            <Dialog.Content>
                <TextInput mode="outlined" label="Source" value={incomeSource} onChangeText={setIncomeSource} />
                <TextInput
                    mode="outlined"
                    label="Amount"
                    value={incomeAmount.toString()}
                    onChangeText={(text) => setIncomeAmount(parseFloat(text))}
                />
                <DatePickerInput
                    mode="outlined"
                    locale="en"
                    label="Income Date"
                    value={incomeDate}
                    onChange={(d) => setIncomeDate(d)}
                    inputMode="start"
                    presentationStyle="pageSheet"
                    inputEnabled={false}
                />
            </Dialog.Content>
            <Dialog.Actions>
                <Button textColor={MD3Colors.error70} icon="trash-can" onPress={() => setVisible(false)}>
                    Delete
                </Button>
                <Button textColor={MD3Colors.primary70} icon="content-save" onPress={() => setVisible(false)}>
                    Save
                </Button>
                <Button textColor={MD3Colors.secondary70} icon="cancel" onPress={() => setVisible(false)}>
                    Cancel
                </Button>
            </Dialog.Actions>
        </Dialog>
    );
};

export default EditIncomeDialog;
