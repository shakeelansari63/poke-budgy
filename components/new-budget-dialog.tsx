import { ScrollView } from "react-native";
import { useTheme, Card, IconButton, Button } from "react-native-paper";
import { useState, RefObject } from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { DatePickerInput } from "react-native-paper-dates";
import { createNewBudget } from "../storage/slices/budget-slice";
import { useDispatch } from "react-redux";

interface NewBudgetDialogProps {
    cloneId?: string | null;
    sheetRef: RefObject<BottomSheetModal>;
}

const NewBudgetDialog = ({ cloneId, sheetRef }: NewBudgetDialogProps) => {
    const theme = useTheme();
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [dirty, setDirty] = useState<boolean>(false);

    const dispatch = useDispatch();

    const saveNewBudget = () => {
        if (endDate <= startDate || !dirty) return;

        dispatch(
            createNewBudget({
                cloneId: cloneId,
                startDate: startDate,
                endDate: endDate,
            })
        );
    };

    return (
        <BottomSheetModal ref={sheetRef} enableDynamicSizing={true}>
            <BottomSheetView style={{ backgroundColor: theme.colors.background }}>
                <Card>
                    <Card.Title
                        title={cloneId === null ? "Create new budget" : "Clone to new budget"}
                        titleVariant="titleLarge"
                        right={() => <IconButton icon="close" onPress={() => sheetRef.current?.dismiss()} />}
                    />
                    <Card.Content>
                        <ScrollView>
                            <DatePickerInput
                                mode="outlined"
                                locale="en"
                                label="Start Date"
                                value={startDate}
                                onChange={(d) => {
                                    if (d !== undefined) {
                                        setDirty(true);
                                        setStartDate(d);
                                    }
                                }}
                                inputMode="start"
                                presentationStyle="pageSheet"
                                style={{ marginBottom: 10 }}
                            />
                            <DatePickerInput
                                mode="outlined"
                                locale="en"
                                label="End Date"
                                value={endDate}
                                onChange={(d) => {
                                    if (d !== undefined) {
                                        setDirty(true);
                                        setEndDate(d);
                                    }
                                }}
                                inputMode="start"
                                presentationStyle="pageSheet"
                                style={{ marginBottom: 10 }}
                            />
                        </ScrollView>
                    </Card.Content>
                    <Card.Actions>
                        <Button
                            mode="text"
                            textColor={theme.colors.primary}
                            icon="content-save"
                            onPress={saveNewBudget}
                        >
                            Save
                        </Button>
                    </Card.Actions>
                </Card>
            </BottomSheetView>
        </BottomSheetModal>
    );
};

export default NewBudgetDialog;
