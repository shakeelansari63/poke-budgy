import { View } from "react-native";
import { Text } from "react-native-paper";
import BudgetGraph from "../components/budget-graph-card";
import IncomeSection from "../components/income-section";
import ExpenseSection from "../components/expense-section";

export default function Home() {
    return (
        <View>
            <BudgetGraph />
            <IncomeSection />
            <ExpenseSection />
        </View>
    );
}
