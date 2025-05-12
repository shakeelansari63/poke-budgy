import { SectionList, View } from "react-native";
import BudgetGraph from "../../components/budget-graph-card";
import IncomeSection from "../../components/income-section";
import ExpenseSection from "../../components/expense-section";
import FabMainPage from "../../components/fab-main-page";
import SettingsMenu from "../../components/settings-menu";
import { useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { IconButton } from "react-native-paper";
import { useSelector } from "react-redux";
import { StoreState } from "../../model/store";
import { Budget } from "../../model/budget";

const EmptySpace = () => <View style={{ padding: 50 }}></View>;

export default function Home() {
    const navigation = useNavigation();
    const [menuVisible, setMenuVisible] = useState<boolean>(false);
    const currentBudget = useSelector<StoreState, Budget | null>((state) => state.budget.activeBudget);

    const toggelMenuVisible = () => setMenuVisible(!menuVisible);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <IconButton icon="dots-vertical" size={24} onPress={toggelMenuVisible} />,
        });
    }, [navigation]);

    const sections = [
        {
            data: [{ id: 0, node: <BudgetGraph currentBudget={currentBudget} isActive={true} /> }],
        },
        {
            data: [{ id: 1, node: <IncomeSection currentBudget={currentBudget} isActive={true} /> }],
        },
        {
            data: [{ id: 2, node: <ExpenseSection currentBudget={currentBudget} isActive={true} /> }],
        },

        {
            data: [{ id: 3, node: <EmptySpace /> }],
        },
    ];

    return (
        <>
            <SettingsMenu visible={menuVisible} setVisible={setMenuVisible} />
            <SectionList
                sections={sections}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => item.node}
                showsVerticalScrollIndicator={false}
            />
            <FabMainPage />
        </>
    );
}
