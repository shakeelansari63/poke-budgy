import { View } from "react-native";
import { Badge, Text, useTheme } from "react-native-paper";
import React from "react";
import { BarChart } from "react-native-gifted-charts";
import { BarComparisionColors } from "../constants/colors";
import { ComparisionBarPoints } from "../model/shared";

interface BarPoint {
    value: number;
    frontColor: string;
    label?: string;
    spacing?: number;
    labelWidth?: number;
}

interface CompareBarGraphProp {
    data: ComparisionBarPoints[];
    legend: [string, string];
    width?: number;
    height?: number;
}

const getMaxVal = (points: ComparisionBarPoints, accumulator: number) => {
    if (points.value1 > points.value2 && points.value1 > accumulator) return points.value1;

    if (points.value2 > accumulator) return points.value2;
    return accumulator;
};

const generateBarPoints = (data: ComparisionBarPoints[]): BarPoint[] => {
    const barPoints: BarPoint[] = [];
    data.forEach((point) => {
        // Push first Point
        barPoints.push({
            value: point.value1,
            label: point.label,
            spacing: 5,
            labelWidth: 45,
            frontColor: BarComparisionColors[0],
        });

        // Push second Point
        barPoints.push({
            value: point.value2,
            frontColor: BarComparisionColors[1],
            spacing: 20,
        });
    });
    return barPoints;
};

interface LegendProps {
    color: string;
    text: string;
}

const RenderLegend = ({ color, text }: LegendProps) => {
    const theme = useTheme();
    return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
                style={{
                    height: 12,
                    width: 12,
                    marginRight: 8,
                    borderRadius: 4,
                    backgroundColor: color || theme.colors.onBackground,
                }}
            />
            <Text style={{ fontSize: 12 }}>{text || ""}</Text>
        </View>
    );
};

const CompareBarGraph = ({ data, width, height, legend }: CompareBarGraphProp) => {
    const maxVal = data.reduce((acc: number, points: ComparisionBarPoints) => getMaxVal(points, acc), 0);
    const maxValWithBufferSpace = maxVal + maxVal / 5;
    const nSteps = 5;

    const formatY = (label: string): string => {
        const labelVal = parseInt(label);

        if (maxValWithBufferSpace > 1000000) return `${Math.floor(labelVal / 1000000).toString()}M`;

        if (maxValWithBufferSpace > 1000) return `${Math.floor(labelVal / 1000).toString()}K`;

        return label;
    };

    const theme = useTheme();

    return (
        <View>
            <BarChart
                isAnimated
                noOfSections={nSteps}
                barBorderRadius={4}
                frontColor={theme.colors.onPrimaryContainer}
                data={generateBarPoints(data)}
                yAxisThickness={0}
                xAxisThickness={0}
                yAxisTextStyle={{ color: theme.colors.onBackground, fontSize: 10 }}
                xAxisLabelTextStyle={{ color: theme.colors.onBackground, fontSize: 10 }}
                yAxisTextNumberOfLines={2}
                hideRules
                barWidth={20}
                height={height ?? 120}
                {...(width && { parentWidth: width })}
                maxValue={maxValWithBufferSpace}
                xAxisTextNumberOfLines={2}
                formatYLabel={formatY}
                yAxisLabelWidth={50}
                xAxisLabelsHeight={40}
                renderTooltip={(item: BarPoint, index: number) => (
                    <Badge
                        style={{
                            backgroundColor: theme.colors.tertiaryContainer,
                            color: theme.colors.onTertiaryContainer,
                        }}
                    >
                        {item.value.toFixed(2)}
                    </Badge>
                )}
            />
            <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                <RenderLegend color={BarComparisionColors[0]} text={legend[0]} />
                <RenderLegend color={BarComparisionColors[1]} text={legend[1]} />
            </View>
        </View>
    );
};

export default CompareBarGraph;
