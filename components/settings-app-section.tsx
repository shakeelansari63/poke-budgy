import { View } from "react-native";
import { Card, IconButton } from "react-native-paper";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Settings } from "../model/settings";
import { StoreState } from "../model/store";
import { Dropdown } from "react-native-paper-dropdown";
import { Currencies } from "../constants/currencies";
import {
    setCurrency,
    setTheme,
    setColor,
} from "../storage/slices/settings-slice";
import SettingMenuLine from "../components/setting-menu-line";
import { ThemeColors } from "@/constants/colors";
import { useCurrentColor } from "@/hooks/use-settings";

const AppSettingsSection = () => {
    const dispatch = useDispatch();
    const currColor = useCurrentColor().toUpperCase();

    const settings: Settings = useSelector<StoreState, Settings>(
        (state) => state.setting,
    );

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
        <Card style={{ marginVertical: 10, marginHorizontal: 20 }}>
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
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            {ThemeColors.map((col) => (
                                <IconButton
                                    containerColor={col.base}
                                    iconColor={
                                        currColor === col.base.toUpperCase()
                                            ? "white"
                                            : col.base
                                    }
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
    );
};

export default AppSettingsSection;
