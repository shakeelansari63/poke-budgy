import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import BottomNavigator from "../components/BottomNavigator";
import { View } from "react-native";
import { Text } from "react-native-paper";

const Tab = createMaterialBottomTabNavigator();

const Main = () => {
    return (
        <Tab.Navigator>
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
