import React from "react";
import { Text, Card, IconButton, Avatar, useTheme } from "react-native-paper";
import { Budget } from "../model/budget";
import IncomeLine from "./income-line";
import EditIncomeDialog from "./edit-income-dialog";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Income } from "../model/income";
import { useDispatch } from "react-redux";
import { deleteIncome } from "../storage/slices/budget-slice";
import { useCurrencySymbol } from "../hooks/use-settings";
import ConfirmationDialog from "./confirmation-dialog";
import SwipeableFlatList from "rn-gesture-swipeable-flatlist";
import SwipeQuickActions, { SwipeQuickActionData } from "./swipe-quick-actions";

interface IncomeSectionProps {
    currentBudget: Budget | null;
    isActive: boolean;
}

const IncomeSection = ({ currentBudget, isActive }: IncomeSectionProps) => {
    const currencySymbol = useCurrencySymbol();
    const totalIncome = currentBudget?.Incomes.reduce((acc, income) => acc + income.Amount, 0);
    const sheetRef = React.useRef<BottomSheetModal>(null);
    const [incomeToDelete, setIncomeToDelete] = React.useState<Income | null>(null);
    const [deleteModalVisible, setDeleteModalVisible] = React.useState<boolean>(false);
    const theme = useTheme();
    const dispactch = useDispatch();

    const delIncome = () => {
        if (incomeToDelete) dispactch(deleteIncome(incomeToDelete.Id));
        setDeleteModalVisible(false);
        setIncomeToDelete(null);
    };

    const deletePressHandler = (income: Income) => {
        setIncomeToDelete(income);
        setDeleteModalVisible(true);
    };

    return (
        <>
            <EditIncomeDialog sheetRef={sheetRef} />
            <Card mode="elevated" style={{ marginVertical: 10, marginHorizontal: 20 }}>
                <Card.Title
                    title="Incomes"
                    titleVariant="titleLarge"
                    subtitle={currentBudget !== null && `Total: ${currencySymbol} ${totalIncome?.toFixed(2)}`}
                    left={() => <Avatar.Icon icon="wallet" size={40} />}
                    right={() => {
                        return (
                            currentBudget !== null &&
                            isActive && (
                                <IconButton
                                    icon="plus"
                                    onPress={() => {
                                        sheetRef.current?.present();
                                    }}
                                />
                            )
                        );
                    }}
                />
                <Card.Content>
                    {currentBudget === null ? (
                        <Text>No active budget</Text>
                    ) : (
                        <SwipeableFlatList
                            swipeableProps={{
                                dragOffsetFromRightEdge: 50,
                            }}
                            data={currentBudget.Incomes}
                            keyExtractor={(income: Income) => income.Id}
                            renderItem={({ item, index }: { item: Income; index: number }) => (
                                <IncomeLine
                                    key={item.Id}
                                    income={item}
                                    isLast={index === currentBudget.Incomes.length - 1}
                                    isEditable={isActive}
                                />
                            )}
                            enableOpenMultipleRows={false}
                            renderRightActions={(item: Income) => {
                                const data: SwipeQuickActionData[] = [
                                    {
                                        icon: "trash-can-outline",
                                        action: () => deletePressHandler(item),
                                        iconColor: theme.colors.error,
                                    },
                                ];
                                return isActive && <SwipeQuickActions data={data} />;
                            }}
                        />
                    )}
                </Card.Content>
            </Card>
            <ConfirmationDialog
                visible={deleteModalVisible}
                title="Are you sure?"
                confirmText={`Are you sure you want to delete the Income "${incomeToDelete?.Source}"?`}
                primaryActionName="Delete"
                primaryActionColor={theme.colors.error}
                primaryActionHandler={delIncome}
                cancelActionHandler={() => setDeleteModalVisible(false)}
            />
        </>
    );
};

export default IncomeSection;
