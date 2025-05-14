import { ScrollView, View } from "react-native";
import { Card, Button, useTheme, IconButton } from "react-native-paper";
import React from "react";
import { useLayoutEffect } from "react";
import { useNavigation } from "expo-router";
import { useSelector } from "react-redux";
import { Settings } from "../model/settings";
import { StoreState } from "../model/store";
import { Dropdown } from "react-native-paper-dropdown";
import { Currencies } from "../constants/currencies";
import { useDispatch } from "react-redux";
import { setCurrency, setTheme, setColor } from "../storage/slices/settings-slice";
import { resetStore, loadBudgetFromStore } from "../storage/slices/budget-slice";
import { loadSettingsFromStore } from "../storage/slices/settings-slice";
import SettingMenuLine from "../components/setting-menu-line";
import ConfirmationDialog from "../components/confirmation-dialog";
import { exportData, importData } from "../services/export-import-service";
import AlertViewer, { AlertType } from "../components/alert-viewer";
import { ThemeColors } from "@/constants/colors";
import { useCurrentColor } from "@/hooks/use-settings";
import SafeView from "@/components/safe-area-view";
import TopAppBar from "@/components/top-app-bar";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SettingsScreen = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const theme = useTheme();
    const currColor = useCurrentColor().toUpperCase();

    const [resetDataVisible, setResetDataVisible] = React.useState<boolean>(false);
    const [alertVisible, setAlertVisible] = React.useState<boolean>(false);
    const [alertText, setAlertText] = React.useState<string>("");
    const [alertType, setAlertType] = React.useState<AlertType>("info");

    const settings: Settings = useSelector<StoreState, Settings>((state) => state.setting);

    const currencies = Currencies.map((currency) => {
        return {
            label: `${currency.name} (${currency.symbol})`,
            value: currency.name,
        };
    });

    const themes = [
        { label: "Dark", value: "dark" },
        { label: "Light", value: "light" },
        { label: "System", value: "device" },
    ];

    const setNewCurrency = (crncy: string | undefined) => {
        if (crncy) dispatch(setCurrency(crncy));
    };

    const setNewTheme = (thm: string | undefined) => {
        if (thm) dispatch(setTheme(thm));
    };

    const resetBudgetData = () => {
        dispatch(resetStore({}));
        setResetDataVisible(false);
    };

    const exportHandler = async () => {
        const exportSuccess = await exportData();

        if (exportSuccess) {
            setAlertText("Export Successful");
            setAlertType("success");
            setAlertVisible(true);
        } else {
            setAlertText("Export Failed");
            setAlertType("fail");
            setAlertVisible(true);
        }
    };

    const importHandler = async () => {
        const importSuccess = await importData();

        if (importSuccess) {
            dispatch(loadBudgetFromStore({}));
            dispatch(loadSettingsFromStore({}));
            setAlertText("Import Successful");
            setAlertType("success");
            setAlertVisible(true);
        } else {
            setAlertText("Import Failed");
            setAlertType("fail");
            setAlertVisible(true);
        }
    };

    return (
        <>
            <TopAppBar backAction={router.back} title="Settings" />
            <ScrollView style={{ paddingBottom: useSafeAreaInsets().bottom }}>
                <Card style={{ margin: 10 }}>
                    <Card.Title title="App Settings" titleVariant="titleLarge" />
                    <Card.Content>
                        <SettingMenuLine
                            icon="currency-sign"
                            settingName="Currency"
                            settingNode={
                                <Dropdown
                                    label="Currency"
                                    placeholder="Select Currency"
                                    options={currencies}
                                    value={settings.currency}
                                    onSelect={setNewCurrency}
                                    mode="outlined"
                                    hideMenuHeader={true}
                                />
                            }
                        />
                        <SettingMenuLine
                            icon="brightness-6"
                            settingName="Theme"
                            settingNode={
                                <Dropdown
                                    label="Theme"
                                    placeholder="Select Theme"
                                    options={themes}
                                    value={settings.theme}
                                    onSelect={setNewTheme}
                                    mode="outlined"
                                    hideMenuHeader={true}
                                />
                            }
                        />
                        <SettingMenuLine
                            icon="format-color-fill"
                            settingName="Colors"
                            noDivider={true}
                            settingNode={<View />}
                        />
                        <SettingMenuLine
                            noDivider={true}
                            settingNode={
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    {ThemeColors.map((col) => (
                                        <IconButton
                                            containerColor={col.base}
                                            iconColor={currColor === col.base.toUpperCase() ? "white" : col.base}
                                            icon="check"
                                            size={20}
                                            mode="contained"
                                            key={col.base}
                                            onPress={() => dispatch(setColor(col.base))}
                                        />
                                    ))}
                                </View>
                            }
                        />
                    </Card.Content>
                </Card>
                <Card style={{ margin: 10 }}>
                    <Card.Title title="Data Settings" titleVariant="titleLarge" />
                    <Card.Content>
                        <SettingMenuLine
                            noDivider={true}
                            settingNode={
                                <Button
                                    icon="application-import"
                                    onPress={importHandler}
                                    buttonColor={theme.colors.secondaryContainer}
                                    textColor={theme.colors.onSecondaryContainer}
                                >
                                    Import Data
                                </Button>
                            }
                        />

                        <SettingMenuLine
                            settingNode={
                                <Button
                                    icon="application-export"
                                    onPress={exportHandler}
                                    buttonColor={theme.colors.secondaryContainer}
                                    textColor={theme.colors.onSecondaryContainer}
                                >
                                    Export Data
                                </Button>
                            }
                        />

                        <SettingMenuLine
                            noDivider={true}
                            settingNode={
                                <Button
                                    icon="delete-forever"
                                    onPress={() => setResetDataVisible(true)}
                                    buttonColor={theme.colors.errorContainer}
                                    textColor={theme.colors.onErrorContainer}
                                >
                                    Reset all Data
                                </Button>
                            }
                        />
                        {/* THis is for testing */}
                        <SettingMenuLine
                            noDivider={true}
                            settingNode={
                                <Button
                                    icon="delete-forever"
                                    onPress={() => setResetDataVisible(true)}
                                    buttonColor={theme.colors.errorContainer}
                                    textColor={theme.colors.onErrorContainer}
                                >
                                    Reset all Data
                                </Button>
                            }
                        />
                        <SettingMenuLine
                            noDivider={true}
                            settingNode={
                                <Button
                                    icon="delete-forever"
                                    onPress={() => setResetDataVisible(true)}
                                    buttonColor={theme.colors.errorContainer}
                                    textColor={theme.colors.onErrorContainer}
                                >
                                    Reset all Data
                                </Button>
                            }
                        />
                        <SettingMenuLine
                            noDivider={true}
                            settingNode={
                                <Button
                                    icon="delete-forever"
                                    onPress={() => setResetDataVisible(true)}
                                    buttonColor={theme.colors.errorContainer}
                                    textColor={theme.colors.onErrorContainer}
                                >
                                    Reset all Data
                                </Button>
                            }
                        />
                        <SettingMenuLine
                            noDivider={true}
                            settingNode={
                                <Button
                                    icon="delete-forever"
                                    onPress={() => setResetDataVisible(true)}
                                    buttonColor={theme.colors.errorContainer}
                                    textColor={theme.colors.onErrorContainer}
                                >
                                    Reset all Data
                                </Button>
                            }
                        />
                        <SettingMenuLine
                            noDivider={true}
                            settingNode={
                                <Button
                                    icon="delete-forever"
                                    onPress={() => setResetDataVisible(true)}
                                    buttonColor={theme.colors.errorContainer}
                                    textColor={theme.colors.onErrorContainer}
                                >
                                    Reset all Data
                                </Button>
                            }
                        />
                        <SettingMenuLine
                            noDivider={true}
                            settingNode={
                                <Button
                                    icon="delete-forever"
                                    onPress={() => setResetDataVisible(true)}
                                    buttonColor={theme.colors.errorContainer}
                                    textColor={theme.colors.onErrorContainer}
                                >
                                    Reset all Data
                                </Button>
                            }
                        />
                        <SettingMenuLine
                            noDivider={true}
                            settingNode={
                                <Button
                                    icon="delete-forever"
                                    onPress={() => setResetDataVisible(true)}
                                    buttonColor={theme.colors.errorContainer}
                                    textColor={theme.colors.onErrorContainer}
                                >
                                    Reset all Data
                                </Button>
                            }
                        />
                        <SettingMenuLine
                            noDivider={true}
                            settingNode={
                                <Button
                                    icon="delete-forever"
                                    onPress={() => setResetDataVisible(true)}
                                    buttonColor={theme.colors.errorContainer}
                                    textColor={theme.colors.onErrorContainer}
                                >
                                    Reset all Data
                                </Button>
                            }
                        />
                        <SettingMenuLine
                            noDivider={true}
                            settingNode={
                                <Button
                                    icon="delete-forever"
                                    onPress={() => setResetDataVisible(true)}
                                    buttonColor={theme.colors.errorContainer}
                                    textColor={theme.colors.onErrorContainer}
                                >
                                    Reset all Data
                                </Button>
                            }
                        />
                        <SettingMenuLine
                            noDivider={true}
                            settingNode={
                                <Button
                                    icon="delete-forever"
                                    onPress={() => setResetDataVisible(true)}
                                    buttonColor={theme.colors.errorContainer}
                                    textColor={theme.colors.onErrorContainer}
                                >
                                    Reset all Data
                                </Button>
                            }
                        />
                        <SettingMenuLine
                            noDivider={true}
                            settingNode={
                                <Button
                                    icon="delete-forever"
                                    onPress={() => setResetDataVisible(true)}
                                    buttonColor={theme.colors.errorContainer}
                                    textColor={theme.colors.onErrorContainer}
                                >
                                    Reset all Data
                                </Button>
                            }
                        />
                        <SettingMenuLine
                            noDivider={true}
                            settingNode={
                                <Button
                                    icon="delete-forever"
                                    onPress={() => setResetDataVisible(true)}
                                    buttonColor={theme.colors.errorContainer}
                                    textColor={theme.colors.onErrorContainer}
                                >
                                    Reset all Data
                                </Button>
                            }
                        />
                        <SettingMenuLine
                            noDivider={true}
                            settingNode={
                                <Button
                                    icon="delete-forever"
                                    onPress={() => setResetDataVisible(true)}
                                    buttonColor={theme.colors.errorContainer}
                                    textColor={theme.colors.onErrorContainer}
                                >
                                    Reset all Data
                                </Button>
                            }
                        />
                        <SettingMenuLine
                            noDivider={true}
                            settingNode={
                                <Button
                                    icon="delete-forever"
                                    onPress={() => setResetDataVisible(true)}
                                    buttonColor={theme.colors.errorContainer}
                                    textColor={theme.colors.onErrorContainer}
                                >
                                    Reset all Data
                                </Button>
                            }
                        />
                        <SettingMenuLine
                            noDivider={true}
                            settingNode={
                                <Button
                                    icon="delete-forever"
                                    onPress={() => setResetDataVisible(true)}
                                    buttonColor={theme.colors.errorContainer}
                                    textColor={theme.colors.onErrorContainer}
                                >
                                    Reset all Data
                                </Button>
                            }
                        />
                        <SettingMenuLine
                            noDivider={true}
                            settingNode={
                                <Button
                                    icon="delete-forever"
                                    onPress={() => setResetDataVisible(true)}
                                    buttonColor={theme.colors.errorContainer}
                                    textColor={theme.colors.onErrorContainer}
                                >
                                    Reset all Data
                                </Button>
                            }
                        />
                        <SettingMenuLine
                            noDivider={true}
                            settingNode={
                                <Button
                                    icon="delete-forever"
                                    onPress={() => setResetDataVisible(true)}
                                    buttonColor={theme.colors.errorContainer}
                                    textColor={theme.colors.onErrorContainer}
                                >
                                    Reset all Data
                                </Button>
                            }
                        />
                        <SettingMenuLine
                            noDivider={true}
                            settingNode={
                                <Button
                                    icon="delete-forever"
                                    onPress={() => setResetDataVisible(true)}
                                    buttonColor={theme.colors.errorContainer}
                                    textColor={theme.colors.onErrorContainer}
                                >
                                    Reset all Data
                                </Button>
                            }
                        />
                        <SettingMenuLine
                            noDivider={true}
                            settingNode={
                                <Button
                                    icon="delete-forever"
                                    onPress={() => setResetDataVisible(true)}
                                    buttonColor={theme.colors.errorContainer}
                                    textColor={theme.colors.onErrorContainer}
                                >
                                    Reset all Data
                                </Button>
                            }
                        />
                        <SettingMenuLine
                            noDivider={true}
                            settingNode={
                                <Button
                                    icon="delete-forever"
                                    onPress={() => setResetDataVisible(true)}
                                    buttonColor={theme.colors.errorContainer}
                                    textColor={theme.colors.onErrorContainer}
                                >
                                    Reset all Data
                                </Button>
                            }
                        />
                    </Card.Content>
                </Card>
                <ConfirmationDialog
                    title="Are you Sure"
                    confirmText="Are you sure you want to reset the app Data? "
                    visible={resetDataVisible}
                    primaryActionColor={theme.colors.error}
                    primaryActionName="Reset"
                    primaryActionHandler={resetBudgetData}
                    cancelActionHandler={() => setResetDataVisible(false)}
                />
            </ScrollView>
            <AlertViewer visible={alertVisible} setVisible={setAlertVisible} text={alertText} alertType={alertType} />
        </>
    );
};

export default SettingsScreen;
