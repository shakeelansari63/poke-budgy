import { Card, Button, useTheme } from "react-native-paper";
import React from "react";
import { useDispatch } from "react-redux";
import {
  resetStore,
  loadBudgetFromStore,
} from "../storage/slices/budget-slice";
import { loadSettingsFromStore } from "../storage/slices/settings-slice";
import SettingMenuLine from "../components/setting-menu-line";
import ConfirmationDialog from "../components/confirmation-dialog";
import { exportData, importData } from "../services/export-import-service";
import { AlertType } from "../components/alert-viewer";

interface DataSettingsSectionProps {
  setAlertText: (_: string) => void;
  setAlertType: (_: AlertType) => void;
  setAlertVisible: (_: boolean) => void;
}

const DataSettingsSection = ({
  setAlertText,
  setAlertType,
  setAlertVisible,
}: DataSettingsSectionProps) => {
  const [resetDataVisible, setResetDataVisible] =
    React.useState<boolean>(false);

  const dispatch = useDispatch();
  const theme = useTheme();

  const resetBudgetData = () => {
    dispatch(resetStore({}));
    setResetDataVisible(false);
    setAlertText("Data Reset Successful");
    setAlertType("success");
    setAlertVisible(true);
  };

  const exportHandler = async () => {
    const exportSuccess = await exportData();

    if (exportSuccess) {
      setAlertText("Export Successful");
      setAlertType("success");
      setAlertVisible(true);
    } else {
      setAlertText("Export Failed");
      setAlertType("fail");
      setAlertVisible(true);
    }
  };

  const importHandler = async () => {
    const importSuccess = await importData();

    if (importSuccess) {
      dispatch(loadBudgetFromStore({}));
      dispatch(loadSettingsFromStore({}));
      setAlertText("Import Successful");
      setAlertType("success");
      setAlertVisible(true);
    } else {
      setAlertText("Import Failed");
      setAlertType("fail");
      setAlertVisible(true);
    }
  };

  return (
    <>
      <Card style={{ marginVertical: 10, marginHorizontal: 20 }}>
        <Card.Title title="Data Settings" titleVariant="titleLarge" />
        <Card.Content>
          <SettingMenuLine
            noDivider={true}
            settingNode={
              <Button
                icon="application-import"
                onPress={importHandler}
                buttonColor={theme.colors.secondaryContainer}
                textColor={theme.colors.onSecondaryContainer}
              >
                Import Data
              </Button>
            }
          />

          <SettingMenuLine
            settingNode={
              <Button
                icon="application-export"
                onPress={exportHandler}
                buttonColor={theme.colors.secondaryContainer}
                textColor={theme.colors.onSecondaryContainer}
              >
                Export Data
              </Button>
            }
          />

          <SettingMenuLine
            noDivider={true}
            settingNode={
              <Button
                icon="delete-forever"
                onPress={() => setResetDataVisible(true)}
                buttonColor={theme.colors.errorContainer}
                textColor={theme.colors.onErrorContainer}
              >
                Reset all Data
              </Button>
            }
          />
        </Card.Content>
      </Card>
      <ConfirmationDialog
        title="Are you Sure"
        confirmText="Are you sure you want to reset the app Data? "
        visible={resetDataVisible}
        primaryActionColor={theme.colors.error}
        primaryActionName="Reset"
        primaryActionHandler={resetBudgetData}
        cancelActionHandler={() => setResetDataVisible(false)}
      />
    </>
  );
};

export default DataSettingsSection;
