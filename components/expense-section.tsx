import { View } from "react-native";
import { Text, Card, IconButton } from "react-native-paper";
import { useSelector } from "react-redux";
import { BudgetState } from "../model/store";
import { Budget } from "../model/budget";
import Icon from "../constants/icons";

const ExpenseSection = () => {
    const currentBudget = useSelector<BudgetState, Budget | null>((state) => state.activeBudget);

    return (
        <Card mode="elevated" style={{ margin: 5 }}>
            <Card.Title
                title="Budgets"
                titleVariant="titleLarge"
                left={() => <Icon source="cash" size={20} />}
                right={() => <IconButton icon="plus" onPress={() => {}} />}
            />
            <Card.Content>
                {currentBudget === null ? <Text>No active budget</Text> : <Text>Some Expenses exist</Text>}
            </Card.Content>
        </Card>
    );
};

export default ExpenseSection;
