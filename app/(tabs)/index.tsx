import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BudgetGraph from "../../components/budget-graph-card";
import IncomeSection from "../../components/income-section";
import ExpenseSection from "../../components/expense-section";
import Fab from "../../components/fab";

export default function Home() {
    return (
        <>
            <SafeAreaView>
                <ScrollView>
                    <BudgetGraph />
                    <IncomeSection />
                    <ExpenseSection />
                </ScrollView>
            </SafeAreaView>
            <Fab />
        </>
    );
}
