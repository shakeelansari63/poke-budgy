import { ScrollView } from "react-native";
import { Card, Button, useTheme } from "react-native-paper";
import React from "react";
import { useLayoutEffect } from "react";
import { useNavigation } from "expo-router";
import { useSelector } from "react-redux";
import { Settings } from "../model/settings";
import { StoreState } from "../model/store";
import { Dropdown } from "react-native-paper-dropdown";
import { Currencies } from "../constants/currencies";
import { useDispatch } from "react-redux";
import { setCurrency, setTheme } from "../storage/slices/settings-slice";
import { resetStore, loadBudgetFromStore } from "../storage/slices/budget-slice";
import { loadSettingsFromStore } from "../storage/slices/settings-slice";
import SettingMenuLine from "../components/setting-menu-line";
import ConfirmationDialog from "../components/confirmation-dialog";
import { exportData, importData } from "../services/export-import-service";
import AlertViewer, { AlertType } from "../components/alert-viewer";

const SettingsScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const theme = useTheme();

    const [resetDataVisible, setResetDataVisible] = React.useState<boolean>(false);
    const [alertVisible, setAlertVisible] = React.useState<boolean>(false);
    const [alertText, setAlertText] = React.useState<string>("");
    const [alertType, setAlertType] = React.useState<AlertType>("info");

    const settings: Settings = useSelector<StoreState, Settings>((state) => state.setting);

    useLayoutEffect(() => {
        navigation.setOptions({ headerTitle: "Settings" });
    }, []);

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
            <ScrollView>
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
                            noDivider={true}
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
