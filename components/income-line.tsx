import { useRef, useState } from "react";
import { List, Chip, Divider } from "react-native-paper";
import { Income } from "../model/income";
import EditIncomeDialog from "./edit-income-dialog";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useCurrencySymbol } from "../hooks/use-settings";

interface IncomeProps {
    income: Income;
    isLast?: boolean;
}

const IncomeLine = ({ income, isLast }: IncomeProps) => {
    const sheetRef = useRef<BottomSheetModal>(null);
    const currencySymbol = useCurrencySymbol();

    return (
        <>
            <EditIncomeDialog income={income} sheetRef={sheetRef} />
            <List.Item
                title={income.Source}
                left={() => (
                    <Chip compact={true} elevated={true}>
                        {currencySymbol} {income.Amount}
                    </Chip>
                )}
                onPress={() => sheetRef.current?.present()}
            />
            {!isLast && <Divider />}
        </>
    );
};

export default IncomeLine;
