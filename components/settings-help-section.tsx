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
            <Button
                onPress={() => openUrl(githubUrl)}
                icon={({ color }: { color: string }) => <Feather name="github" size={18} color={color} />}
            >
                <Text style={{ fontSize: 15, color: theme.colors.primary }}>Need Help? Reach out to us here</Text>
            </Button>

            {/* <Button
                onPress={() => openUrl(donationUrl)}
                icon={({ color }: { color: string }) => <Feather name="coffee" size={16} color={color} />}
            >
                <Text style={{ fontSize: 12, color: theme.colors.primary }}>
                    Liked the app? Say thanks and buy us a coffee!
                </Text>
            </Button> */}
        </View>
    );
};

export default HelpSettigsSection;
