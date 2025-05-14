import { SectionList, View } from "react-native";
import { Card, Divider, Text, Icon, ProgressBar } from "react-native-paper";
import { useSelector } from "react-redux";
import { StoreState } from "../../model/store";
import { Budget } from "../../model/budget";
import PastBudgetCard from "../../components/past-budgets-cards";
import SafeView from "@/components/safe-area-view";

const SectionHeader = ({ label }: { label: string }) => {
    return (
        <View style={{ margin: 10, flexDirection: "row", alignItems: "center" }}>
            <Icon source="chevron-double-down" size={30} />
            <Text variant="titleLarge">{label}</Text>
        </View>
    );
};

export default function History() {
    const pastBudgets = useSelector<StoreState, Budget[]>((state) => state.budget.pastBudgets);
    const sortedBudgets = [...pastBudgets].sort((a, b) => {
        const aDate = new Date(a.StartDate);
        const bDate = new Date(b.StartDate);
        return bDate.getTime() - aDate.getTime();
    });

    const sections: { title: string; data: Budget[] }[] = [];

    // Add Last Budget as First Section
    if (sortedBudgets.length > 0) sections.push({ title: "Last Budget", data: [sortedBudgets[0]] });

    // Add All remaining Budgets in others section
    if (sortedBudgets.length > 1) sections.push({ title: "Older Budgets", data: [...sortedBudgets.slice(1)] });

    return (
        <SafeView except={["bottom"]}>
            <SectionList
                showsVerticalScrollIndicator={false}
                sections={sections}
                keyExtractor={(item) => item.Id}
                renderItem={({ item }) => <PastBudgetCard budget={item} key={item.Id} />}
                renderSectionHeader={({ section }) => <SectionHeader label={section.title} />}
                stickySectionHeadersEnabled={true}
                ItemSeparatorComponent={() => <Divider style={{ margin: 5 }} />}
                ListEmptyComponent={() => (
                    <View>
                        <Card style={{ margin: 10, padding: 10 }}>
                            <Card.Title title="No past budgets !" />
                        </Card>
                    </View>
                )}
            />
        </SafeView>
    );
}
