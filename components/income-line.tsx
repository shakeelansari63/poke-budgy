import { useRef, useState } from "react";
import { List, Chip, IconButton, Portal, Dialog, Divider, Button, Text, useTheme } from "react-native-paper";
import { Income } from "../model/income";
import EditIncomeDialog from "./edit-income-dialog";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useDispatch } from "react-redux";
import { deleteIncome } from "../storage/slices/budget-slice";

interface IncomeProps {
    income: Income;
}

const IncomeLine = ({ income }: IncomeProps) => {
    const sheetRef = useRef<BottomSheetModal>(null);
    const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
    const theme = useTheme();
    const dispactch = useDispatch();

    const delIncome = () => {
        dispactch(deleteIncome(income.Id));
    };

    return (
        <>
            <EditIncomeDialog income={income} sheetRef={sheetRef} />
            <List.Item
                title={income.Source}
                left={() => (
                    <Chip compact={true} elevated={true}>
                        {income.Amount}
                    </Chip>
                )}
                onPress={() => sheetRef.current?.present()}
                right={(param) => (
                    <IconButton
                        icon="trash-can"
                        onPress={() => setDeleteModalVisible(true)}
                        iconColor={param.color}
                        size={20}
                        style={{ margin: 0, padding: 0 }}
                    />
                )}
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
                        <Text>Are you sure you want to delete the Income "{income.Source}"?</Text>
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
                        <Button mode="text" textColor={theme.colors.error} icon="trash-can" onPress={delIncome}>
                            Delete
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </>
    );
};

export default IncomeLine;
