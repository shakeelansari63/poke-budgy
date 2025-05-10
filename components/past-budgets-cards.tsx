import { ScrollView, View } from "react-native";
import { Card, Icon, Text, Button, useTheme, Divider } from "react-native-paper";
import React from "react";
import { Budget } from "../model/budget";
import { useDispatch } from "react-redux";
import { deletePastBudget } from "../storage/slices/budget-slice";
import { dateOption } from "../constants/app-constants";
import DateChip from "./date-chip";
import NewBudgetDialog from "./new-budget-dialog";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useCurrencySymbol } from "../hooks/use-settings";
import ConfirmationDialog from "./confirmation-dialog";

interface PastBudgetCardProp {
    budget: Budget;
}

const PastBudgetCard = ({ budget }: PastBudgetCardProp) => {
    const theme = useTheme();
    const currencySymbol = useCurrencySymbol();
    const dispatch = useDispatch();
    const sheetRef = React.useRef<BottomSheetModal | null>(null);
    const [deleteModalVisible, setDeleteModalVisible] = React.useState<boolean>(false);

    const startDate: string =
        typeof budget.StartDate == "string"
            ? new Date(budget.StartDate).toLocaleDateString("en-US", dateOption)
            : budget.StartDate.toLocaleDateString("en-US", dateOption);
    const endDate: string =
        typeof budget.EndDate == "string"
            ? new Date(budget.EndDate).toLocaleDateString("en-US", dateOption)
            : budget.EndDate.toLocaleDateString("en-US", dateOption);

    const totalIncome = budget?.Incomes.reduce((acc, inc) => acc + inc.Amount, 0) ?? 0;
    const totalBudgeted = budget?.Expenses.reduce((acc, exp) => acc + exp.Amount, 0) ?? 0;

    const delPastBudget = () => {
        dispatch(deletePastBudget(budget.Id));
        setDeleteModalVisible(false);
    };

    return (
        <>
            <Card style={{ margin: 10 }}>
                <Card.Content>
                    <ScrollView>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
                            <DateChip>From: {startDate}</DateChip>
                            <DateChip>To: {endDate}</DateChip>
                        </View>
                        <View style={{ flexDirection: "row", marginBottom: 10 }}>
                            <View style={{ flex: 0.5, justifyContent: "flex-start" }}>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ marginRight: 5 }}>
                                        <Icon source="bank-plus" color={theme.colors.onPrimaryContainer} size={24} />
                                    </View>
                                    <Text variant="titleMedium" style={{ color: theme.colors.onPrimaryContainer }}>
                                        Income
                                    </Text>
                                </View>
                                <Text variant="headlineMedium" style={{ color: theme.colors.onPrimaryContainer }}>
                                    {currencySymbol} {totalIncome.toFixed(2)}
                                </Text>
                            </View>
                            <View style={{ flex: 0.5, justifyContent: "flex-end" }}>
                                <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                                    <View style={{ marginRight: 5 }}>
                                        <Icon source="cash-minus" color={theme.colors.error} size={24} />
                                    </View>
                                    <Text
                                        variant="titleMedium"
                                        style={{ alignSelf: "flex-end", color: theme.colors.error }}
                                    >
                                        Budget
                                    </Text>
                                </View>
                                <Text
                                    variant="headlineMedium"
                                    style={{ alignSelf: "flex-end", color: theme.colors.error }}
                                >
                                    {currencySymbol} {totalBudgeted.toFixed(2)}
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                </Card.Content>
                <Card.Actions style={{ justifyContent: "space-between" }}>
                    <Button
                        icon="trash-can"
                        mode="text"
                        textColor={theme.colors.onErrorContainer}
                        compact={true}
                        onPress={() => setDeleteModalVisible(true)}
                    >
                        Delete
                    </Button>
                    <Button
                        icon="content-duplicate"
                        mode="text"
                        textColor={theme.colors.onPrimaryContainer}
                        compact={true}
                        onPress={() => sheetRef.current?.present()}
                    >
                        Clone
                    </Button>
                </Card.Actions>
            </Card>
            <Divider style={{ marginVertical: 5 }} />
            <NewBudgetDialog cloneId={budget.Id} sheetRef={sheetRef} />
            <ConfirmationDialog
                visible={deleteModalVisible}
                title="Are you sure?"
                confirmText={`Are you sure you want to delete the history plan for "${startDate}" - "${endDate}"?`}
                primaryActionName="Delete"
                primaryActionColor={theme.colors.error}
                primaryActionHandler={delPastBudget}
                cancelActionHandler={() => setDeleteModalVisible(false)}
            />
        </>
    );
};

export default PastBudgetCard;
