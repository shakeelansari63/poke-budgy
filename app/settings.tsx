import { ScrollView } from "react-native";
import React from "react";
import AlertViewer, { AlertType } from "../components/alert-viewer";
import TopAppBar from "@/components/top-app-bar";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppSettingsSection from "../components/settings-app-section";
import DataSettingsSection from "../components/settings-data-section";
import HelpSettigsSection from "../components/settings-help-section";

const SettingsScreen = () => {
    const router = useRouter();

    const [alertVisible, setAlertVisible] = React.useState<boolean>(false);
    const [alertText, setAlertText] = React.useState<string>("");
    const [alertType, setAlertType] = React.useState<AlertType>("info");

    return (
        <>
            <TopAppBar backAction={router.back} title="Settings" />
            <ScrollView style={{ paddingBottom: useSafeAreaInsets().bottom }}>
                <AppSettingsSection />
                <DataSettingsSection
                    setAlertText={setAlertText}
                    setAlertType={setAlertType}
                    setAlertVisible={setAlertVisible}
                />
                <HelpSettigsSection />
            </ScrollView>
            <AlertViewer visible={alertVisible} setVisible={setAlertVisible} text={alertText} alertType={alertType} />
        </>
    );
};

export default SettingsScreen;
