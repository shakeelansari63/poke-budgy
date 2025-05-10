import { Snackbar, Text, Icon, useTheme } from "react-native-paper";
import { View } from "react-native";
import React from "react";

export type AlertType = "success" | "fail" | "warn" | "info";

interface AlertViewerProps {
    text: string;
    visible: boolean;
    setVisible: (visible: boolean) => void;
    alertType: AlertType;
}

const AlertViewer = ({ visible, text, setVisible, alertType }: AlertViewerProps) => {
    const theme = useTheme();
    let icon = "";
    let backgroundColor = theme.colors.primaryContainer;
    let textColor = theme.colors.onPrimaryContainer;

    switch (alertType) {
        case "success":
            icon = "check";
            break;

        case "fail":
            icon = "cancel";
            backgroundColor = theme.colors.errorContainer;
            textColor = theme.colors.onErrorContainer;
            break;

        case "warn":
            icon = "alert";
            backgroundColor = theme.colors.tertiaryContainer;
            textColor = theme.colors.onTertiaryContainer;
            break;

        case "info":
            icon = "information";
            backgroundColor = theme.colors.secondaryContainer;
            textColor = theme.colors.onSecondaryContainer;
            break;
    }

    return (
        <Snackbar
            visible={visible}
            onDismiss={() => setVisible(false)}
            duration={3000}
            style={{ backgroundColor: backgroundColor }}
        >
            <View style={{ flexDirection: "row", backgroundColor: backgroundColor }}>
                <View style={{ marginRight: 10 }}>
                    <Icon source={icon} size={24} color={textColor} />
                </View>
                <Text style={{ color: textColor }}>{text}</Text>
            </View>
        </Snackbar>
    );
};

export default AlertViewer;
