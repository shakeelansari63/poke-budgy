import { FAB } from "react-native-paper";
import { useState, createRef } from "react";
import NewBudgetDialog from "./new-budget-dialog";
import { useSelector } from "react-redux";
import { StoreState } from "../model/store";
import { Budget } from "../model/budget";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const Fab = () => {
    const [fabOpen, setFabOpen] = useState<boolean>(false);
    const newBudgetRef = createRef<BottomSheetModal>();
    const currentBudget = useSelector<StoreState, Budget | null>((state) => state.budget.activeBudget);
    const [cloneId, setCloneId] = useState<string | null>(null);

    const cloneActiveBudget = () => {
        setCloneId(currentBudget?.Id ?? null);
        newBudgetRef.current?.present();
    };

    const createBlankBudget = () => {
        setCloneId(null);
        newBudgetRef.current?.present();
    };

    const actions = [
        {
            icon: "plus",
            label: "Create new budget",
            onPress: createBlankBudget,
        },
    ];

    if (currentBudget)
        actions.push({
            icon: "content-duplicate",
            label: "Clone to new budget",
            onPress: cloneActiveBudget,
        });

    return (
        <>
            <FAB.Group
                open={fabOpen}
                icon={fabOpen ? "cancel" : "pencil"}
                visible
                style={{ position: "absolute", margin: 0, right: 0, bottom: 0, padding: 5 }}
                onStateChange={({ open }) => setFabOpen(open)}
                actions={actions}
            />
            <NewBudgetDialog cloneId={cloneId} sheetRef={newBudgetRef} />
        </>
    );
};

export default Fab;
