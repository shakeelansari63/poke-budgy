import { View } from "react-native";
import { useState } from "react";
import {
    List,
    Chip,
    IconButton,
    ProgressBar,
    useTheme,
    Portal,
    Dialog,
    Divider,
    Button,
    Text,
} from "react-native-paper";
import { ExpenseCategory } from "../model/expense";
import { useDispatch } from "react-redux";
import { deleteExpenseCategory } from "../storage/slices/budget-slice";
import { useRouter } from "expo-router";
import colors from "../constants/colors";

interface BudgetProps {
    budget: ExpenseCategory;
}

const ExpenseCategoryLine = ({ budget }: BudgetProps) => {
    const router = useRouter();
    const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
    const theme = useTheme();
    const totalExpense = budget.Expenses.reduce((acc, expense) => acc + expense.Amount, 0);
    const totalUsage = totalExpense >= budget.Amount ? 1.0 : (totalExpense * 1.0) / budget.Amount;
    const dispatch = useDispatch();

    const deleteCategory = () => {
        dispatch(deleteExpenseCategory(budget.Id));
        setDeleteModalVisible(false);
    };

    return (
        <View>
            <List.Item
                title={budget.Category}
                left={() => (
                    <Chip compact={true} elevated={true}>
                        {budget.Amount}
                    </Chip>
                )}
                right={(param) => (
                    <IconButton
                        icon="trash-can"
                        onPress={() => setDeleteModalVisible(true)}
                        iconColor={param.color}
                        size={20}
                        style={{ margin: 0, padding: 0 }}
                    />
                )}
                onPress={() => router.navigate({ pathname: "/budget-expense", params: { categoryId: budget.Id } })}
            />
            <ProgressBar
                progress={totalUsage}
                color={totalExpense > budget.Amount ? colors.SpentAboveLimit : colors.SpentInLimit}
            />
            <Divider />
            <Portal>
                <Dialog
                    visible={deleteModalVisible}
                    style={{ margin: 15 }}
                    onDismiss={() => setDeleteModalVisible(false)}
                >
                    <Dialog.Title>Are you sure?</Dialog.Title>
                    <Dialog.Content>
                        <Text>Are you sure you want to delete the Budget "{budget.Category}"?</Text>
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
                        <Button mode="text" textColor={theme.colors.error} icon="trash-can" onPress={deleteCategory}>
                            Delete
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
};

export default ExpenseCategoryLine;
