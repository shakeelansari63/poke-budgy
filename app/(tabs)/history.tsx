import { SectionList, View } from "react-native";
import { Divider, Text, Icon, useTheme } from "react-native-paper";
import { useSelector } from "react-redux";
import { StoreState } from "../../model/store";
import { Budget } from "../../model/budget";
import PastBudgetCard from "../../components/past-budgets-cards";
import SafeView from "@/components/safe-area-view";
import EmptyOtherTabs from "@/components/empty-other-tabs";
import TopAppBar from "@/components/top-app-bar";

const SectionHeader = ({ label }: { label: string }) => {
  const theme = useTheme();
  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.colors.background,
      }}
    >
      <Icon source="chevron-double-down" size={30} />
      <Text variant="titleLarge">{label}</Text>
    </View>
  );
};

export default function History() {
  const pastBudgets = useSelector<StoreState, Budget[]>(
    (state) => state.budget.pastBudgets,
  );
  const sortedBudgets = [...pastBudgets].sort((a, b) => {
    const aDate = new Date(a.StartDate);
    const bDate = new Date(b.StartDate);
    return bDate.getTime() - aDate.getTime();
  });

  const sections: { title: string; data: Budget[] }[] = [];

  // Add Last Budget as First Section
  if (sortedBudgets.length > 0)
    sections.push({ title: "Last Budget", data: [sortedBudgets[0]] });

  // Add All remaining Budgets in others section
  if (sortedBudgets.length > 1)
    sections.push({
      title: "Older Budgets",
      data: [...sortedBudgets.slice(1)],
    });

  return pastBudgets.length > 0 ? (
    <SafeView except={["bottom"]}>
      <SectionList
        showsVerticalScrollIndicator={false}
        sections={sections}
        keyExtractor={(item) => item.Id}
        renderItem={({ item }) => (
          <PastBudgetCard budget={item} key={item.Id} />
        )}
        renderSectionHeader={({ section }) => (
          <SectionHeader label={section.title} />
        )}
        stickySectionHeadersEnabled={true}
        ItemSeparatorComponent={() => <Divider style={{ margin: 5 }} />}
      />
    </SafeView>
  ) : (
    <>
      {/* Top bar only to allocade dummy space so it does not look out of oder in tab change */}
      <TopAppBar />
      <EmptyOtherTabs />
    </>
  );
}
