import { ScrollView, View } from "react-native";
import BudgetGraph from "../../components/budget-graph-card";
import IncomeSection from "../../components/income-section";
import ExpenseSection from "../../components/expense-section";
import FabMainPage from "../../components/fab-main-page";
import SettingsMenu from "../../components/settings-menu";
import { useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { IconButton } from "react-native-paper";

const EmptySpace = () => <View style={{ padding: 50 }}></View>;

export default function Home() {
    const navigation = useNavigation();
    const [menuVisible, setMenuVisible] = useState<boolean>(false);

    const toggelMenuVisible = () => setMenuVisible(!menuVisible);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <IconButton icon="dots-vertical" size={24} onPress={toggelMenuVisible} />,
        });
    }, [navigation]);

    return (
        <>
            <SettingsMenu visible={menuVisible} setVisible={setMenuVisible} />
            <ScrollView>
                <BudgetGraph />
                <IncomeSection />
                <ExpenseSection />
                <EmptySpace />
            </ScrollView>
            <FabMainPage />
        </>
    );
}
