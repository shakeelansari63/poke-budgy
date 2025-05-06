import { View } from "react-native";
import { Text, Icon, Divider } from "react-native-paper";
import React from "react";

interface SettingMenuLineProps {
    icon: string;
    settingName: string;
    settingNode: React.ReactNode;
}

const SettingMenuLine = ({ icon, settingName, settingNode }: SettingMenuLineProps) => {
    return (
        <>
            <View style={{ flexDirection: "row", paddingVertical: 10 }}>
                <View style={{ flex: 0.6, justifyContent: "center" }}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ marginRight: 10 }}>
                            <Icon source={icon} size={36} />
                        </View>
                        <Text variant="titleLarge" style={{ alignSelf: "center" }}>
                            {settingName}
                        </Text>
                    </View>
                </View>
                <View style={{ flex: 0.4 }}>{settingNode}</View>
            </View>
            <Divider />
        </>
    );
};

export default SettingMenuLine;
