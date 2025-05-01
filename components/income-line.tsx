import { useState, createRef } from "react";
import { List, Chip, IconButton } from "react-native-paper";
import { Income } from "../model/income";
import EditIncomeDialog from "./edit-income-dialog";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

interface IncomeProps {
    income: Income;
}

const IncomeLine = ({ income }: IncomeProps) => {
    const sheetRef = createRef<BottomSheetModal>();

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
                right={(param) => (
                    <IconButton
                        icon="pencil"
                        onPress={() => {
                            sheetRef.current?.present();
                        }}
                        iconColor={param.color}
                        size={20}
                        style={{ margin: 0, padding: 0 }}
                    />
                )}
            />
        </>
    );
};

export default IncomeLine;
