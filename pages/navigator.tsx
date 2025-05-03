import { createStackNavigator } from "@react-navigation/stack";
import TabLayout from "./main";
import Settings from "./settings";
import BudgetExpenses from "./budget-expense";
import { appName } from "../constants/app-constants";

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="home" screenOptions={{ headerTitleAlign: "center" }}>
            <Stack.Screen name="home" component={TabLayout} options={{ title: appName }} />
            <Stack.Screen name="settings" component={Settings} options={{ title: "Settings" }} />
            <Stack.Screen name="budget-expense" component={BudgetExpenses} />
        </Stack.Navigator>
    );
};

export default AppNavigator;
