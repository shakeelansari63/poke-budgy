import { View } from "react-native";
import { Badge, Text, useTheme } from "react-native-paper";
import React from "react";
import { PieChart } from "react-native-gifted-charts";
import { PieChartColors } from "../constants/colors";
import { useCurrencySymbol } from "@/hooks/use-settings";

interface Point {
    label: string;
    value: number;
}

interface BarGraphProp {
    data: Point[];
}

interface PieDataPoint {
    text: string;
    color: string;
    value: number;
}

interface LegendProps {
    data: PieDataPoint[];
}
const RenderLegend = ({ data }: LegendProps) => {
    const theme = useTheme();
    const currencySymbol = useCurrencySymbol();

    // Considering 2 legend item per row
    const legendItemPerRow = 2;
    const rows = Math.ceil(data.length / legendItemPerRow);
    const dataInRows: PieDataPoint[][] = [];

    for (let i = 0; i < rows; i++) {
        const startIdx = i * legendItemPerRow;
        const endIdx =
            i * legendItemPerRow + legendItemPerRow > data.length
                ? data.length
                : i * legendItemPerRow + legendItemPerRow;
        const dataSlice = data.slice(startIdx, endIdx);
        dataInRows.push(dataSlice);
    }

    return (
        <View style={{ marginTop: 8 }}>
            {dataInRows.map((dataRow, indx) => (
                <View key={indx} style={{ flexDirection: "row", justifyContent: "space-evenly", marginBottom: 8 }}>
                    {dataRow.map((legend, idx) => (
                        <View key={idx} style={{ flexDirection: "row", marginBottom: 12, alignItems: "center" }}>
                            <View
                                style={{
                                    height: 12,
                                    width: 12,
                                    marginRight: 8,
                                    borderRadius: 4,
                                    backgroundColor: legend.color || theme.colors.onBackground,
                                }}
                            />
                            <View>
                                <Text style={{ fontSize: 12 }}>{legend.text || ""}</Text>
                                <Text style={{ fontSize: 12 }}>{`${currencySymbol} ${legend.value || ""}`}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            ))}
        </View>
    );
};

const PieGraph = ({ data }: BarGraphProp) => {
    const pieData: { value: number; color: string }[] = data.map((point, index) => ({
        value: point.value,
        color: PieChartColors[index],
    }));

    const theme = useTheme();

    return (
        <View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <PieChart
                    data={pieData}
                    focusOnPress
                    showTooltip
                    tooltipComponent={(index: number) => {
                        const label = data[index].label;

                        return (
                            <Badge
                                style={{
                                    backgroundColor: theme.colors.tertiaryContainer,
                                    color: theme.colors.onTertiaryContainer,
                                }}
                            >
                                {label}
                            </Badge>
                        );
                    }}
                />
            </View>
            <RenderLegend
                data={data.map((point, idx) => ({
                    text: point.label,
                    value: point.value,
                    color: PieChartColors[idx],
                }))}
            />
        </View>
    );
};

export default PieGraph;
