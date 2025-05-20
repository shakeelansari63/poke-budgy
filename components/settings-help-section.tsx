import { View } from "react-native";
import { useTheme, Button, Text } from "react-native-paper";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import * as Linking from "expo-linking";
import { githubUrl, donationUrl } from "../constants/app-constants";

const HelpSettigsSection = () => {
    const theme = useTheme();

    const openUrl = async (url: string) => {
        const isUrlSupported = await Linking.canOpenURL(url);

        if (isUrlSupported) await Linking.openURL(url);
    };

    return (
        <View style={{ marginVertical: 10, marginHorizontal: 20 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Button onPress={() => openUrl(githubUrl)}>
                    <View style={{ alignItems: "center" }}>
                        <Feather name="github" size={24} color={theme.colors.onBackground} />
                        <Text style={{ fontSize: 10 }}>Need Help?</Text>
                        <Text style={{ fontSize: 10 }}>Reach out to us here</Text>
                    </View>
                </Button>

                <Button onPress={() => openUrl(donationUrl)}>
                    <View style={{ alignItems: "center" }}>
                        <Feather name="coffee" size={24} color={theme.colors.onBackground} />
                        <Text style={{ fontSize: 10 }}>Liked the app?</Text>
                        <Text style={{ fontSize: 10 }}>Say thanks and buy us a coffee!</Text>
                    </View>
                </Button>
            </View>
        </View>
    );
};

export default HelpSettigsSection;
