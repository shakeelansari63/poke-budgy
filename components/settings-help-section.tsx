import { View } from "react-native";
import { useTheme, Button, Text, Card } from "react-native-paper";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import * as Linking from "expo-linking";
import { githubUrl } from "../constants/app-constants";
import SettingMenuLine from "./setting-menu-line";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { setOnBoarded } from "@/storage/slices/settings-slice";

const HelpSettigsSection = () => {
    const theme = useTheme();
    const router = useRouter();
    const dispatch = useDispatch();

    const showTutorial = () => {
        // Enable Onboarding Mode
        dispatch(setOnBoarded(false));

        // Go Back to Home for Re-running onboarding screen
        router.back();
    };

    const openUrl = async (url: string) => {
        const isUrlSupported = await Linking.canOpenURL(url);

        if (isUrlSupported) await Linking.openURL(url);
    };

    return (
        <>
            <Card style={{ marginVertical: 10, marginHorizontal: 20 }}>
                <Card.Title title="Help" titleVariant="titleLarge" />
                <Card.Content>
                    <SettingMenuLine
                        noDivider={true}
                        settingNode={
                            <Button
                                icon="lightbulb"
                                onPress={showTutorial}
                                buttonColor={theme.colors.tertiaryContainer}
                                textColor={theme.colors.onTertiaryContainer}
                            >
                                Show Help Tutorial
                            </Button>
                        }
                    />
                </Card.Content>
            </Card>
            <View style={{ marginVertical: 20, marginHorizontal: 20 }}>
                <Button
                    onPress={() => openUrl(githubUrl)}
                    icon={({ color }: { color: string }) => (
                        <Feather name="github" size={18} color={color} />
                    )}
                >
                    <Text style={{ fontSize: 15, color: theme.colors.primary }}>
                        Need further help? Reach out to us
                    </Text>
                </Button>
            </View>
        </>
    );
};

export default HelpSettigsSection;
