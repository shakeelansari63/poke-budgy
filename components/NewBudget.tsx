import React, { useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { DatePickerInput } from "react-native-paper-dates";

interface Props {
    bottomSheetRef: React.RefObject<BottomSheetModal>;
}

const NewBudget = ({ bottomSheetRef }: Props) => {
    const [startDate, setStartDate] = useState<Date | undefined>(new Date());
    const [endDate, setEndDate] = useState<Date | undefined>(new Date());

    // Callback
    const handleSheetChanges = useCallback((index: number) => {
        console.log("handleSheetChanges", index);
    }, []);

    return (
        <BottomSheetModal ref={bottomSheetRef} onChange={handleSheetChanges}>
            <BottomSheetScrollView>
                <View style={styles.container}>
                    <DatePickerInput
                        locale="en"
                        label="Start Date"
                        onChange={(d) => setStartDate(d)}
                        value={startDate}
                        inputMode="start"
                        editable={false}
                        style={styles.formField}
                    />
                    <DatePickerInput
                        locale="en"
                        label="End Date"
                        onChange={(d) => setEndDate(d)}
                        value={endDate}
                        inputMode="start"
                        editable={false}
                        style={styles.formField}
                    />
                    <Button
                        mode="contained"
                        icon="content-save"
                        style={styles.formField}
                    >
                        Save
                    </Button>
                </View>
            </BottomSheetScrollView>
        </BottomSheetModal>
    );
};

export default NewBudget;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        flex: 1,
        alignItems: "center",
        padding: 24,
    },
    formField: {
        marginVertical: 10,
    },
});
