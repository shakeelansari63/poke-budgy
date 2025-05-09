import { ScrollView } from "react-native";
import { Card } from "react-native-paper";
import { useSelector } from "react-redux";
import { StoreState } from "../../model/store";
import { Budget } from "../../model/budget";
import PastBudgetCard from "../../components/past-budgets-cards";

export default function History() {
    const pastBudgets = useSelector<StoreState, Budget[]>((state) => state.budget.pastBudgets);

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {pastBudgets.length > 0 ? (
                <>
                    {pastBudgets.map((budget) => (
                        <PastBudgetCard budget={budget} key={budget.Id} />
                    ))}
                </>
            ) : (
                <Card style={{ margin: 10, padding: 10 }}>
                    <Card.Title title="No past budgets !" />
                </Card>
            )}
        </ScrollView>
    );
}
