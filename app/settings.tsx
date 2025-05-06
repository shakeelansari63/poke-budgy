import { View } from "react-native";
import { Card, Text, Divider, Icon } from "react-native-paper";
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
import SettingMenuLine from "@/components/setting-menu-line";

const SettingsScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

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

    return (
        <Card style={{ margin: 10 }}>
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
                <Divider />
            </Card.Content>
        </Card>
    );
};

export default SettingsScreen;
