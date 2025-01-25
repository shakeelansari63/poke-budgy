import { BottomNavigation } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";

interface Props {
    navigation: any;
    state: any;
    descriptors: any;
    insets: any;
}

const BottomNavigator = ({ navigation, state, descriptors, insets }: Props) => {
    return (
        <BottomNavigation.Bar
            navigationState={state}
            safeAreaInsets={insets}
            onTabPress={({ route, preventDefault }) => {
                const event = navigation.emit({
                    type: "tabPress",
                    target: route.key,
                    canPreventDefault: true,
                });

                if (event.defaultPrevented) {
                    preventDefault();
                } else {
                    navigation.dispatch({
                        ...CommonActions.navigate(route.name, route.params),
                        target: state.key,
                    });
                }
            }}
            renderIcon={({ route, focused, color }) => {
                const { options } = descriptors[route.key];
                if (options.tabBarIcon) {
                    return options.tabBarIcon({ focused, color, size: 24 });
                }

                return null;
            }}
            getLabelText={({ route }) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel.toString()
                        : options.title !== undefined
                        ? options.title
                        : "";

                return label;
            }}
        />
    );
};

export default BottomNavigator;
