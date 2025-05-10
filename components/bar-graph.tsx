import { View } from "react-native";
import { Badge, useTheme } from "react-native-paper";
import React from "react";
import { BarChart } from "react-native-gifted-charts";

interface Point {
    label: string;
    value: number;
}

interface BarGraphProp {
    data: Point[];
    width?: number;
    height?: number;
    showLine?: boolean;
}

const BarGraph = ({ data, width, height, showLine }: BarGraphProp) => {
    const maxVal = data.reduce((acc: number, point: Point) => (point.value > acc ? point.value : acc), 0);
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
                data={data}
                yAxisThickness={0}
                xAxisThickness={0}
                yAxisTextStyle={{ color: theme.colors.onBackground, fontSize: 10 }}
                xAxisLabelTextStyle={{ color: theme.colors.onBackground, fontSize: 10 }}
                spacing={20}
                yAxisTextNumberOfLines={2}
                showLine={showLine ?? true}
                hideRules
                height={height ?? 120}
                {...(width && { width: width })}
                maxValue={maxValWithBufferSpace}
                xAxisTextNumberOfLines={2}
                formatYLabel={formatY}
                yAxisLabelWidth={50}
                xAxisLabelsHeight={40}
                lineConfig={{
                    curved: true,
                    thickness: 3,
                    color: theme.colors.onErrorContainer,
                    shiftY: 10,
                    hideDataPoints: true,
                    isAnimated: true,
                }}
                renderTooltip={(item: Point, index: number) => (
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
        </View>
    );
};

export default BarGraph;
