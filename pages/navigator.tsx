import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabLayout from "./main";
import Settings from "./settings";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="home">
            <Stack.Screen name="home" component={TabLayout} />
            <Stack.Screen name="settings" component={Settings} />
        </Stack.Navigator>
    );
};

export default AppNavigator;
