import { useRef } from "react";
import { Text, Card, IconButton, Avatar } from "react-native-paper";
import { useSelector } from "react-redux";
import { StoreState } from "../model/store";
import { Budget } from "../model/budget";
import IncomeLine from "./income-line";
import EditIncomeDialog from "./edit-income-dialog";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const IncomeSection = () => {
    const currentBudget = useSelector<StoreState, Budget | null>((state) => state.budget.activeBudget);
    const totalIncome = currentBudget?.Incomes.reduce((acc, income) => acc + income.Amount, 0);
    const sheetRef = useRef<BottomSheetModal>(null);

    return (
        <>
            <EditIncomeDialog sheetRef={sheetRef} />
            <Card mode="elevated" style={{ margin: 10 }}>
                <Card.Title
                    title="Incomes"
                    titleVariant="titleLarge"
                    subtitle={"Total: " + totalIncome}
                    left={() => <Avatar.Icon icon="cash" size={40} />}
                    right={() => (
                        <IconButton
                            icon="plus"
                            onPress={() => {
                                sheetRef.current?.present();
                            }}
                        />
                    )}
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
        </>
    );
};

export default IncomeSection;
