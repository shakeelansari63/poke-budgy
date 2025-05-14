import { SectionList, View } from "react-native";
import BudgetGraph from "../../components/budget-graph-card";
import IncomeSection from "../../components/income-section";
import ExpenseSection from "../../components/expense-section";
import FabMainPage from "../../components/fab-main-page";
import SettingsMenu from "../../components/settings-menu";
import { useState } from "react";
import { useSelector } from "react-redux";
import { StoreState } from "../../model/store";
import { Budget } from "../../model/budget";
import TopAppBar from "@/components/top-app-bar";
import { Avatar } from "react-native-paper";

const EmptySpace = () => <View style={{ padding: 5 }}></View>;

export default function Home() {
    const [menuVisible, setMenuVisible] = useState<boolean>(false);
    const toggelMenuVisible = () => setMenuVisible(!menuVisible);

    const currentBudget = useSelector<StoreState, Budget | null>((state) => state.budget.activeBudget);

    const sections = [
        {
            data: [{ id: 1, node: <BudgetGraph currentBudget={currentBudget} isActive={true} /> }],
        },
        {
            data: [{ id: 2, node: <IncomeSection currentBudget={currentBudget} isActive={true} /> }],
        },
        {
            data: [{ id: 3, node: <ExpenseSection currentBudget={currentBudget} isActive={true} /> }],
        },

        {
            data: [{ id: 4, node: <EmptySpace /> }],
        },
    ];

    return (
        <>
            <SettingsMenu visible={menuVisible} setVisible={setMenuVisible} />
            <TopAppBar
                rightIcon="dots-vertical"
                rightAction={toggelMenuVisible}
                leftComponent={
                    <Avatar.Image
                        size={48}
                        source={require("../../assets/images/icon-circle.png")}
                        style={{ backgroundColor: "transparent" }}
                    />
                }
            />
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
