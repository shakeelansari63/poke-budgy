import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Menu, Divider } from "react-native-paper";
import { useHeaderHeight } from "@react-navigation/elements";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { useState, createRef } from "react";
import NewBudgetDialog from "./new-budget-dialog";
import { StoreState } from "../model/store";
import { Budget } from "../model/budget";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

interface MenuProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

const SettingsMenu = ({ visible, setVisible }: MenuProps) => {
    const navigations = useNavigation<StackNavigationProp<any>>();

    const insets = useSafeAreaInsets();
    const headerHeight = useHeaderHeight();

    const x = Dimensions.get("screen").width - insets.right;
    const y = headerHeight;

    const newBudgetRef = createRef<BottomSheetModal>();
    const currentBudget = useSelector<StoreState, Budget | null>((state) => state.budget.activeBudget);
    const [cloneId, setCloneId] = useState<string | null>(null);

    const cloneActiveBudget = () => {
        setCloneId(currentBudget?.Id ?? null);
        newBudgetRef.current?.present();
        setVisible(false);
    };

    const createBlankBudget = () => {
        setCloneId(null);
        newBudgetRef.current?.present();
        setVisible(false);
    };

    const gotoSettings = () => {
        navigations.navigate("settings");
        setVisible(false);
    };

    return (
        <>
            <Menu visible={visible} onDismiss={() => setVisible(false)} anchor={{ x: x, y: y }}>
                <Menu.Item onPress={createBlankBudget} title="Create new Empty Plan" leadingIcon="plus" />
                <Divider />
                {currentBudget !== null ? (
                    <>
                        <Menu.Item
                            onPress={cloneActiveBudget}
                            title="Clone current Plan"
                            leadingIcon="content-duplicate"
                        />
                        <Divider />
                    </>
                ) : null}
                <Menu.Item onPress={gotoSettings} title="Settings" leadingIcon="cog" />
            </Menu>
            <NewBudgetDialog cloneId={cloneId} sheetRef={newBudgetRef} />
        </>
    );
};

export default SettingsMenu;
