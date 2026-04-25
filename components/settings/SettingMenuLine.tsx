import { View } from "react-native";
import { Text, Icon, Divider } from "react-native-paper";
import React from "react";

interface SettingMenuLineProps {
    icon?: string;
    settingName?: string;
    settingNode: React.ReactNode;
    noDivider?: boolean;
}

const SettingMenuLine = ({ icon, settingName, settingNode, noDivider }: SettingMenuLineProps) => {
    return (
        <>
            {settingName !== "" && settingName !== undefined ? (
                <View style={{ flexDirection: "row", paddingVertical: 10 }}>
                    <View style={{ flex: 0.6, justifyContent: "center" }}>
                        <View style={{ flexDirection: "row" }}>
                            {icon !== "" && icon !== undefined && (
                                <View style={{ marginRight: 10 }}>
                                    <Icon source={icon} size={24} />
                                </View>
                            )}
                            <Text variant="titleMedium" style={{ alignSelf: "center" }}>
                                {settingName}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flex: 0.4 }}>{settingNode}</View>
                </View>
            ) : (
                <View style={{ paddingVertical: 10 }}>{settingNode}</View>
            )}
            {!noDivider && <Divider />}
        </>
    );
};

export default SettingMenuLine;
