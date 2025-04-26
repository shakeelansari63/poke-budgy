import { Text, Card, IconButton, Avatar } from "react-native-paper";
import { useSelector } from "react-redux";
import { BudgetState } from "../model/store";
import { Budget } from "../model/budget";
import IncomeLine from "./income-line";

const IncomeSection = () => {
    const currentBudget = useSelector<BudgetState, Budget | null>((state) => state.activeBudget);
    const totalIncome = currentBudget?.Incomes.reduce((acc, income) => acc + income.Amount, 0);

    return (
        <Card mode="elevated" style={{ margin: 5 }}>
            <Card.Title
                title="Income"
                titleVariant="titleLarge"
                subtitle={"Total: " + totalIncome}
                left={() => <Avatar.Icon icon="cash" size={40} />}
                right={() => <IconButton icon="plus" onPress={() => {}} />}
            />
            <Card.Content>
                {currentBudget === null ? (
                    <Text>No active budget</Text>
                ) : (
                    <>
                        {currentBudget.Incomes.map((income) => (
                            <IncomeLine key={income.Id} income={income} />
                        ))}
                    </>
                )}
            </Card.Content>
        </Card>
    );
};

export default IncomeSection;
