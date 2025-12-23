import { View } from "react-native";
import { Badge, useTheme } from "react-native-paper";
import React from "react";
import { BarChart } from "react-native-gifted-charts";
import { BarComparisionColors } from "../constants/colors";
import { numberOption } from "@/constants/app-constants";

interface Point {
  label: string;
  value: number;
  frontColor?: string;
}

interface BarGraphProp {
  data: Point[];
  width?: number;
  height?: number;
  showLine?: boolean;
  horizontal?: boolean;
}

const BarGraph = ({
  data,
  width,
  height,
  showLine,
  horizontal,
}: BarGraphProp) => {
  const maxVal = data.reduce(
    (acc: number, point: Point) => (point.value > acc ? point.value : acc),
    0,
  );
  const maxValWithBufferSpace = maxVal + maxVal / 5;
  const nSteps = 5;

  const formatY = (label: string): string => {
    const labelVal = parseInt(label);

    if (maxValWithBufferSpace > 1000000000000)
      return `${(labelVal / 1000000000000).toFixed(1)} T`;

    if (maxValWithBufferSpace > 1000000000)
      return `${(labelVal / 1000000000).toFixed(1)} B`;

    if (maxValWithBufferSpace > 1000000)
      return `${(labelVal / 1000000).toFixed(1)} M`;

    if (maxValWithBufferSpace > 1000)
      return `${(labelVal / 1000).toFixed(1)} K`;

    return label;
  };

  const theme = useTheme();
  return (
    <View>
      <BarChart
        isAnimated
        noOfSections={nSteps}
        barBorderRadius={4}
        frontColor={BarComparisionColors[0]}
        data={data}
        horizontal={horizontal}
        yAxisThickness={0}
        xAxisThickness={0}
        yAxisTextStyle={{ color: theme.colors.onBackground, fontSize: 10 }}
        xAxisLabelTextStyle={{ color: theme.colors.onBackground, fontSize: 10 }}
        spacing={20}
        yAxisTextNumberOfLines={2}
        showLine={showLine ?? true}
        hideRules
        height={height ?? 120}
        {...(width && { parentWidth: width })}
        maxValue={maxValWithBufferSpace}
        xAxisTextNumberOfLines={2}
        formatYLabel={formatY}
        yAxisLabelWidth={50}
        xAxisLabelsHeight={40}
        lineConfig={{
          curved: true,
          thickness: 3,
          color: BarComparisionColors[1],
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
            {item.value.toLocaleString("en-US", numberOption)}
          </Badge>
        )}
      />
    </View>
  );
};

export default BarGraph;
