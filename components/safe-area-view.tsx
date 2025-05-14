import { View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface SafeViewProps {
    children: React.ReactNode | React.ReactNode[];
    except?: ("left" | "right" | "top" | "bottom")[];
}

const SafeView = ({ children, except }: SafeViewProps) => {
    const insets = useSafeAreaInsets();

    const top = !except?.includes("top") ? insets.top : 0;
    const bottom = !except?.includes("bottom") ? insets.bottom : 0;
    const left = !except?.includes("left") ? insets.left : 0;
    const right = !except?.includes("right") ? insets.right : 0;

    return (
        <View
            style={[
                {
                    paddingTop: top,
                    paddingBottom: bottom,
                    paddingLeft: left,
                    paddingRight: right,
                },
            ]}
        >
            {children}
        </View>
    );
};

export default SafeView;
