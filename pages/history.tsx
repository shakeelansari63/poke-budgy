import { ScrollView } from "react-native";
import { Card, Text } from "react-native-paper";
import SafeView from "../components/safe-area-view";
import { useSelector } from "react-redux";
import { StoreState } from "../model/store";
import { Budget } from "../model/budget";
import PastBudgetCard from "../components/past-budgets-cards";

export default function History() {
    const pastBudgets = useSelector<StoreState, Budget[]>((state) => state.budget.pastBudgets);

    return (
        <SafeView>
            <ScrollView>
                {pastBudgets.length > 0 ? (
                    <>
                        {pastBudgets.map((budget) => (
                            <PastBudgetCard budget={budget} key={budget.Id} />
                        ))}
                    </>
                ) : (
                    <Card style={{ margin: 10 }}>
                        {/* <Card.Content>

                        </Card.Content> */}
                        <Card.Title title="No past budgets !" />
                    </Card>
                )}
            </ScrollView>
        </SafeView>
    );
}
