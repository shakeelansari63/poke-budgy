import { FAB } from "react-native-paper";
import React from "react";
import { ExpenseCategory } from "../model/expense";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import EditBudgetSpendDialog from "./budget-spend-dialog";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface FabBudgetPageProps {
    expenseCat: ExpenseCategory;
}

const FabBudgetPage = ({ expenseCat }: FabBudgetPageProps) => {
    const insets = useSafeAreaInsets();
    const sheetRef = React.useRef<BottomSheetModal>(null);
    return (
        <>
            <FAB
                icon="plus-thick"
                onPress={() => sheetRef.current?.present()}
                style={{ position: "absolute", margin: 10, right: insets.right, bottom: insets.bottom }}
            />
            <EditBudgetSpendDialog categoryId={expenseCat.Id} sheetRef={sheetRef} />
        </>
    );
};

export default FabBudgetPage;
