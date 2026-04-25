import { Text, Portal, Dialog, Button, useTheme } from "react-native-paper";
import React from "react";

interface ConfirmationDialogProps {
    visible: boolean;
    title: string;
    confirmText: string;
    primaryActionName: string;
    primaryActionColor: string;
    primaryActionHandler: () => void;
    cancelActionHandler: () => void;
}

const ConfirmationDialog = ({
    visible,
    title,
    confirmText,
    primaryActionName,
    primaryActionColor,
    primaryActionHandler,
    cancelActionHandler,
}: ConfirmationDialogProps) => {
    const theme = useTheme();
    return (
        <Portal>
            <Dialog visible={visible} style={{ margin: 15 }} onDismiss={cancelActionHandler}>
                <Dialog.Title>{title}</Dialog.Title>
                <Dialog.Content>
                    <Text>{confirmText}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button
                        mode="text"
                        textColor={theme.colors.onBackground}
                        icon="cancel"
                        onPress={cancelActionHandler}
                    >
                        Cancel
                    </Button>
                    <Button mode="text" textColor={primaryActionColor} icon="trash-can" onPress={primaryActionHandler}>
                        {primaryActionName}
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

export default ConfirmationDialog;
