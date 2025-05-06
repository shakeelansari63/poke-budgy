import React from "react";
import { Text, Card, IconButton, Avatar, Portal, Dialog, Button, useTheme } from "react-native-paper";
import { useSelector } from "react-redux";
import { StoreState } from "../model/store";
import { Budget } from "../model/budget";
import IncomeLine from "./income-line";
import EditIncomeDialog from "./edit-income-dialog";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import SwipeableFlatList from "rn-gesture-swipeable-flatlist";
import { Income } from "../model/income";
import { useDispatch } from "react-redux";
import { deleteIncome } from "../storage/slices/budget-slice";
import { View } from "react-native";
import { useCurrencySymbol } from "../hooks/use-settings";

const IncomeSection = () => {
    const currencySymbol = useCurrencySymbol();
    const currentBudget = useSelector<StoreState, Budget | null>((state) => state.budget.activeBudget);
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
            <Card mode="elevated" style={{ margin: 10 }}>
                <Card.Title
                    title="Incomes"
                    titleVariant="titleLarge"
                    subtitle={`Total: ${currencySymbol} ${totalIncome}`}
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
                        <SwipeableFlatList
                            swipeableProps={{
                                dragOffsetFromRightEdge: 50,
                            }}
                            data={currentBudget.Incomes}
                            keyExtractor={(income: Income) => income.Id}
                            renderItem={({ item }: { item: Income }) => <IncomeLine key={item.Id} income={item} />}
                            enableOpenMultipleRows={false}
                            renderRightActions={(item: Income) => (
                                <View style={{ backgroundColor: theme.colors.errorContainer }}>
                                    <IconButton icon="trash-can-outline" onPress={() => deletePressHandler(item)} />
                                </View>
                            )}
                        />
                    )}
                </Card.Content>
            </Card>
            <Portal>
                <Dialog
                    visible={deleteModalVisible}
                    style={{ margin: 15 }}
                    onDismiss={() => setDeleteModalVisible(false)}
                >
                    <Dialog.Title>Are you sure?</Dialog.Title>
                    <Dialog.Content>
                        <Text>Are you sure you want to delete the Income "{incomeToDelete?.Source}"?</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button
                            mode="text"
                            textColor={theme.colors.onBackground}
                            icon="cancel"
                            onPress={() => setDeleteModalVisible(false)}
                        >
                            Cancel
                        </Button>
                        <Button mode="text" textColor={theme.colors.error} icon="trash-can" onPress={delIncome}>
                            Delete
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </>
    );
};

export default IncomeSection;
