import { ScrollView } from "react-native";
import SafeView from "../components/safe-area-view";
import BudgetGraph from "../components/budget-graph-card";
import IncomeSection from "../components/income-section";
import ExpenseSection from "../components/expense-section";
import Fab from "../components/fab";

export default function Home() {
    return (
        <>
            <SafeView>
                <ScrollView>
                    <BudgetGraph />
                    <IncomeSection />
                    <ExpenseSection />
                </ScrollView>
            </SafeView>
            <Fab />
        </>
    );
}
