import { useState } from "react";
import { List, Chip, Portal } from "react-native-paper";
import { Income } from "../model/income";
import EditIncomeDialog from "./edit-income-dialog";

interface IncomeProps {
    income: Income;
}

const IncomeLine = ({ income }: IncomeProps) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <Portal>
                <EditIncomeDialog income={income} visible={modalVisible} setVisible={setModalVisible} />
            </Portal>
            <List.Item
                title={income.Source}
                left={() => <Chip>{income.Amount}</Chip>}
                right={() => <Chip mode="outlined">{income.IncomeDate.toDateString()}</Chip>}
                onLongPress={() => setModalVisible(true)}
            />
        </>
    );
};

export default IncomeLine;
