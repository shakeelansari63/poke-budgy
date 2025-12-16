import { useRef } from "react";
import { View } from "react-native";
import { List, Chip, Divider } from "react-native-paper";
import { Income } from "../model/income";
import EditIncomeDialog from "./edit-income-dialog";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useCurrencySymbol } from "../hooks/use-settings";
import { numberOption } from "@/constants/app-constants";

interface IncomeProps {
  income: Income;
  isEditable: boolean;
  isLast?: boolean;
}

const IncomeLine = ({ income, isLast, isEditable }: IncomeProps) => {
  const sheetRef = useRef<BottomSheetModal>(null);
  const currencySymbol = useCurrencySymbol();

  return (
    <>
      {isEditable && <EditIncomeDialog income={income} sheetRef={sheetRef} />}
      <List.Item
        title={income.Source}
        left={() => (
          <Chip compact={true} elevated={true}>
            {currencySymbol}{" "}
            {income.Amount.toLocaleString("en-US", numberOption)}
          </Chip>
        )}
        onPress={() => isEditable && sheetRef.current?.present()}
      />
      <View style={{ padding: 5 }} />
      {!isLast && (
        <>
          <Divider />
          <View style={{ padding: 5 }} />
        </>
      )}
    </>
  );
};

export default IncomeLine;
