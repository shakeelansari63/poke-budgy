import { ScrollView } from "react-native";
import React from "react";
import AlertViewer, { AlertType } from "@/components/shared/AlertViewer";
import TopAppBar from "@/components/shared/TopAppBar";
import AppSettingsSection from "@/components/settings/SettingsAppSection";
import DataSettingsSection from "@/components/settings/SettingsDataSection";
import HelpSettigsSection from "@/components/settings/SettingsHelpSection";

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
            <AlertViewer
                visible={alertVisible}
                setVisible={setAlertVisible}
                text={alertText}
                alertType={alertType}
            />
        </>
    );
};

export default SettingsScreen;
