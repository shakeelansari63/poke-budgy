import { Chip, Icon, useTheme } from "react-native-paper";
import React from "react";

const DateChip = ({ children }: { children: React.ReactNode }) => {
    const theme = useTheme();

    return (
        <Chip
            icon={({ size }) => (
                <Icon
                    source="calendar"
                    color={theme.colors.onBackground}
                    size={size}
                />
            )}
            textStyle={{ fontSize: 10 }}
            style={{ backgroundColor: theme.colors.tertiaryContainer }}
        >
            {children}
        </Chip>
    );
};

export default DateChip;
