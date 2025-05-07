import { View } from "react-native";
import { IconButton } from "react-native-paper";
import React from "react";

export interface SwipeQuickActionData {
    icon: string;
    action: () => void;
    size?: number;
    backgroundColor?: string;
    iconColor?: string;
}

interface SwipeQuickActionsProps {
    data: SwipeQuickActionData[];
}

const ActionButton = ({ icon, action, size, iconColor, backgroundColor }: SwipeQuickActionData) => {
    const extraIconProps: Record<string, any> = {};
    const extraViewProps: Record<string, any> = {};

    // Add Size Prop
    if (size) extraIconProps["size"] = size;

    // Add Icon Color Prop
    if (iconColor) extraIconProps["color"] = iconColor;

    // Add Background Color Prop
    if (backgroundColor) extraViewProps["style"] = { backgroundColor: backgroundColor };

    return (
        <View {...extraViewProps}>
            <IconButton icon={icon} onPress={action} {...extraIconProps} />
        </View>
    );
};

const SwipeQuickActions = ({ data }: SwipeQuickActionsProps) => {
    return (
        <View style={{ flexDirection: "row" }}>
            {data.map((item, idx) => (
                <ActionButton {...item} key={idx.toString()} />
            ))}
        </View>
    );
};

export default SwipeQuickActions;
