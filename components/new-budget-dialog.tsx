import { ScrollView } from "react-native";
import {
  useTheme,
  Card,
  IconButton,
  Button,
  Surface,
} from "react-native-paper";
import { useState, RefObject } from "react";
import { DatePickerInput } from "react-native-paper-dates";
import { createNewBudget } from "../storage/slices/budget-slice";
import { useDispatch } from "react-redux";
import { BottomSheetModal, BottomSheetTextInput } from "@gorhom/bottom-sheet";
import Dialog from "./dialog";

interface NewBudgetDialogProps {
  cloneId?: string | null;
  sheetRef: RefObject<BottomSheetModal | null>;
}

const NewBudgetDialog = ({ cloneId, sheetRef }: NewBudgetDialogProps) => {
  const theme = useTheme();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [dirty, setDirty] = useState<boolean>(false);

  const dispatch = useDispatch();

  const saveNewBudget = () => {
    if (endDate <= startDate || !dirty) return;

    dispatch(
      createNewBudget({
        cloneId: cloneId,
        startDate: startDate,
        endDate: endDate,
      }),
    );

    sheetRef.current?.dismiss();
  };

  return (
    <Dialog sheetRef={sheetRef}>
      <Surface mode="flat" style={{ marginVertical: 10, marginHorizontal: 20 }}>
        <Card.Title
          title={
            cloneId === null || cloneId === undefined
              ? "Create new budget"
              : "Clone to new budget"
          }
          titleVariant="titleLarge"
          right={() => (
            <IconButton
              icon="close"
              onPress={() => sheetRef.current?.dismiss()}
            />
          )}
        />
        <Card.Content>
          <ScrollView>
            <DatePickerInput
              mode="outlined"
              locale="en"
              label="Start Date"
              value={startDate}
              onChange={(d) => {
                if (d !== undefined) {
                  setDirty(true);
                  setStartDate(d);
                }
              }}
              inputMode="start"
              presentationStyle="pageSheet"
              style={{ marginBottom: 10 }}
              render={(props) => <BottomSheetTextInput {...props} />}
            />
            <DatePickerInput
              mode="outlined"
              locale="en"
              label="End Date"
              value={endDate}
              onChange={(d) => {
                if (d !== undefined) {
                  setDirty(true);
                  setEndDate(d);
                }
              }}
              inputMode="end"
              presentationStyle="pageSheet"
              style={{ marginBottom: 10 }}
              render={(props) => <BottomSheetTextInput {...props} />}
            />
          </ScrollView>
        </Card.Content>
        <Card.Actions>
          <Button
            mode="text"
            textColor={theme.colors.onPrimaryContainer}
            icon="content-save"
            onPress={saveNewBudget}
          >
            Save
          </Button>
        </Card.Actions>
      </Surface>
    </Dialog>
  );
};

export default NewBudgetDialog;
