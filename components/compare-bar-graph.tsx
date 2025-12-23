import { View } from "react-native";
import { Badge, Text, useTheme } from "react-native-paper";
import React from "react";
import { BarChart } from "react-native-gifted-charts";
import { BarComparisionColors } from "../constants/colors";
import { ComparisionBarPoints } from "../model/shared";
import { numberOption } from "@/constants/app-constants";

interface BarPoint {
  value: number;
  frontColor: string;
  label?: string;
  spacing?: number;
  labelWidth?: number;
}

interface CompareBarGraphProp {
  data: ComparisionBarPoints[];
  legend: string[];
  width?: number;
  height?: number;
}

const getMaxVal = (points: ComparisionBarPoints, accumulator: number) => {
  return Math.max(...points.values, accumulator);
};

const generateBarPoints = (data: ComparisionBarPoints[]): BarPoint[] => {
  const barPoints: BarPoint[] = [];
  data.forEach((point) => {
    // Loop over values
    point.values.forEach((value, idx) => {
      // For First Point
      if (idx === 0) {
        barPoints.push({
          value,
          label: point.label,
          spacing: 5,
          labelWidth: 20 * point.values.length + 5 * (point.values.length - 1),
          frontColor: BarComparisionColors[idx],
        });
      }

      // For all other Points
      else
        barPoints.push({
          value: value,
          frontColor: BarComparisionColors[idx],
          spacing: idx + 1 < point.values.length ? 5 : 20,
        });
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

const CompareBarGraph = ({
  data,
  width,
  height,
  legend,
}: CompareBarGraphProp) => {
  const maxVal = data.reduce(
    (acc: number, points: ComparisionBarPoints) => getMaxVal(points, acc),
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
            {item.value.toLocaleString("en-US", numberOption)}
          </Badge>
        )}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        {legend.map((item, index) => (
          <RenderLegend
            key={index}
            color={BarComparisionColors[index]}
            text={item}
          />
        ))}
      </View>
    </View>
  );
};

export default CompareBarGraph;
