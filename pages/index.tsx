import { ScrollView, View } from "react-native";
import BudgetGraph from "../components/budget-graph-card";
import IncomeSection from "../components/income-section";
import ExpenseSection from "../components/expense-section";
import Fab from "../components/fab";

export default function Home() {
    const EmptySpace = () => <View style={{ padding: 36 }}></View>;

    return (
        <>
            <ScrollView>
                <BudgetGraph />
                <IncomeSection />
                <ExpenseSection />
                <EmptySpace />
            </ScrollView>
            <Fab />
        </>
    );
}
