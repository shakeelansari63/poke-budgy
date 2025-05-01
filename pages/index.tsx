import { ScrollView, View } from "react-native";
import SafeView from "../components/safe-area-view";
import BudgetGraph from "../components/budget-graph-card";
import IncomeSection from "../components/income-section";
import ExpenseSection from "../components/expense-section";
import Fab from "../components/fab";

export default function Home() {
    const EmptySpace = () => <View style={{ padding: 24 }}></View>;

    return (
        <>
            <SafeView>
                <ScrollView>
                    <BudgetGraph />
                    <IncomeSection />
                    <ExpenseSection />
                    <EmptySpace />
                </ScrollView>
            </SafeView>
            <Fab />
        </>
    );
}
