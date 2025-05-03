import { View, Text } from "react-native";
import React from "react";
import { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const Settings = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({ headerTitle: "Settings" });
    }, []);

    return (
        <View>
            <Text>Settings</Text>
        </View>
    );
};

export default Settings;
