import { FAB } from "react-native-paper";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { StoreState } from "../model/store";
import { Budget } from "../model/budget";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import AddBudgetDialog from "./edit-expense-category-dialog";
import EditIncomeDialog from "./edit-income-dialog";

const FabMainPage = () => {
    const [fabOpen, setFabOpen] = useState<boolean>(false);
    const newIncomeSheetRef = useRef<BottomSheetModal>(null);
    const newExpenseCategorySheetRef = useRef<BottomSheetModal>(null);
    const currentBudget = useSelector<StoreState, Budget | null>((state) => state.budget.activeBudget);

    const actions = [
        {
            icon: "cash-plus",
            label: "Add Income",
            onPress: () => newIncomeSheetRef.current?.present(),
        },
        {
            icon: "basket-plus",
            label: "Add Budget",
            onPress: () => newExpenseCategorySheetRef.current?.present(),
        },
    ];

    return (
        <>
            {currentBudget !== null && (
                <>
                    <FAB.Group
                        open={fabOpen}
                        icon={fabOpen ? "cancel" : "pencil"}
                        visible
                        style={{ position: "absolute", margin: 0, right: 0, bottom: 0, padding: 5 }}
                        onStateChange={({ open }) => setFabOpen(open)}
                        actions={actions}
                    />
                    <AddBudgetDialog sheetRef={newExpenseCategorySheetRef} />
                    <EditIncomeDialog sheetRef={newIncomeSheetRef} />
                </>
            )}
        </>
    );
};

export default FabMainPage;
