import { ScrollView } from "react-native";
import { Text } from "react-native-paper";
import SafeView from "../components/safe-area-view";
import { useSelector } from "react-redux";
import { BudgetState } from "../model/store";
import { Budget } from "../model/budget";
import PastBudgetCard from "../components/past-budgets-cards";

export default function History() {
    const pastBudgets = useSelector<BudgetState, Budget[]>((state) => state.pastBudgets);

    return (
        <SafeView>
            <ScrollView>
                {pastBudgets.map((budget) => (
                    <PastBudgetCard budget={budget} key={budget.Id} />
                ))}
            </ScrollView>
        </SafeView>
    );
}
