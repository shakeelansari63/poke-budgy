import { View } from "react-native";
import { Text } from "react-native-paper";
import React from "react";
import { useLayoutEffect } from "react";
import { useNavigation } from "expo-router";

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
