import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BottomNavigator from "../components/BottomNavigator";
import { View } from "react-native";
import { Text } from "react-native-paper";
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const Main = () => {
    return (
        <Tab.Navigator
            tabBar={({ navigation, state, descriptors, insets }) => (
                <BottomNavigator
                    navigation={navigation}
                    state={state}
                    descriptors={descriptors}
                    insets={insets}
                />
            )}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: "Home",
                    //   tabBarIcon: ({ color, size }) => {
                    //     return <Icon name="home" size={size} color={color} />;
                    //   },
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    tabBarLabel: "Settings",
                    //   tabBarIcon: ({ color, size }) => {
                    //     return <Icon name="cog" size={size} color={color} />;
                    //   },
                }}
            />
        </Tab.Navigator>
    );
};

export default Main;

function HomeScreen() {
    return (
        <View>
            <Text variant="headlineMedium">Home!</Text>
        </View>
    );
}

function SettingsScreen() {
    return (
        <View>
            <Text variant="headlineMedium">Settings!</Text>
        </View>
    );
}
