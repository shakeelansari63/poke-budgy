import { FAB, Portal } from "react-native-paper";
import React, { useState, useCallback } from "react";
import { StyleSheet } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

interface FABState {
    open: boolean;
}

interface Props {
    visible: boolean;
    newBudgetRef: React.RefObject<BottomSheetModal>;
}

const FloatingAction = ({ visible, newBudgetRef }: Props) => {
    const [state, setState] = useState<FABState>({ open: false });

    const onStateChange = ({ open }: FABState) => setState({ open });

    const { open } = state;

    const handlePresentModalPress = useCallback(() => {
        newBudgetRef.current?.present();
    }, []);

    return (
        <Portal>
            <FAB.Group
                open={open}
                visible={visible}
                icon={open ? "minus" : "pen"}
                style={styles.fab}
                actions={[
                    {
                        icon: "file",
                        label: "Create New Budget",
                        onPress: handlePresentModalPress,
                    },
                    {
                        icon: "content-copy",
                        label: "Clone Current Budget",
                        onPress: () => console.log("Pressed star"),
                    },
                ]}
                onStateChange={onStateChange}
            />
        </Portal>
    );
};

export default FloatingAction;

const styles = StyleSheet.create({
    fab: {
        position: "absolute",
        margin: 16,
        right: 0,
        bottom: 0,
    },
});
