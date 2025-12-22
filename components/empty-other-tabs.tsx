import { View } from "react-native";
import { Text } from "react-native-paper";
import { Image } from "expo-image";

const EmptyOtherTabs = () => {
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
        source={require("../assets/images/no-data-available.png")}
        contentFit="cover"
        style={{ width: 200, height: 200 }}
      />
      <Text variant="bodyLarge" style={{ color: "gray", marginVertical: 10 }}>
        No Data Available
      </Text>
    </View>
  );
};

export default EmptyOtherTabs;
