import { useRef } from "react";
import { View } from "react-native";
import { Text, Button } from "react-native-paper";
import { Image } from "expo-image";
import NewBudgetDialog from "./new-budget-dialog";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const EmptyFirstPage = () => {
  const newBudgetRef = useRef<BottomSheetModal>(null);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
        marginHorizontal: 20,
      }}
    >
      <Image
        source={require("../assets/images/no-data.png")}
        contentFit="cover"
        style={{ width: 200, height: 200 }}
      />
      <Text variant="bodyLarge" style={{ color: "gray", marginVertical: 10 }}>
        No Budgets!!
      </Text>
      <Button
        icon="plus"
        mode="elevated"
        onPress={() => newBudgetRef.current?.present()}
      >
        Create your first budget.
      </Button>
      <NewBudgetDialog sheetRef={newBudgetRef} />
    </View>
  );
};

export default EmptyFirstPage;
