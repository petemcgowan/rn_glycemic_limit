import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";

import FlashMessage, { showMessage } from "react-native-flash-message";
import DonutFactory from "../components/DonutFactory";

import {
  contributionData,
  data,
  pieChartData,
  progressChartData,
  stackedBarGraphData,
  stackedBarGraphDataSmaller,
} from "../data/chartData";

import { StackedBarChart } from "react-native-chart-kit";

const chartConfigs = [
  {
    // backgroundColor: "#011000",
    backgroundColor: "black",
    // backgroundColor: "#022173",
    backgroundGradientFrom: "#1E2923",
    // backgroundGradientFrom: "#022173",
    backgroundGradientTo: "#1b3fa0",
    // backgroundColor: "#000000",
    // backgroundGradientFrom: "#1E2923",
    // backgroundGradientTo: "#08130D",
    alignItems: "center",
    justifyContent: "center",

    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForBackgroundLines: {
      strokeDasharray: "", // solid background lines with no dashes
      strokeLinecap: "round",
    },
  },
];

const KetoLimitScreen = ({ totalCarbsForReals }) => {
  // const [totalCarbs, setTotalCarbs] = useState(0);
  // const handleChange = (v) => setTotalCarbs((v * 20).toFixed(0));

  const { width } = Dimensions.get("window");
  const height = 256;

  return (
    <View>
      <SafeAreaView style={styles.root}>
        <DonutFactory />
        {chartConfigs.map((chartConfig) => {
          console.log(JSON.stringify(chartConfig));
          const labelStyle = {
            color: chartConfig.color(),
            marginVertical: 10,
            textAlign: "center",
            fontSize: 16,
            fontFamily: "Karla_300Light",
          };
          const graphStyle = {
            marginVertical: 8,
            ...chartConfig.style,
          };
          return (
            <ScrollView
              key={Math.random()}
              style={{
                backgroundColor: chartConfig.backgroundColor,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FlashMessage duration={300} />
                <Text style={labelStyle}>Daily Carb Consumption</Text>
                <StackedBarChart
                  style={graphStyle}
                  data={stackedBarGraphDataSmaller}
                  width={width * 0.82}
                  withInnerLines={false}
                  withOuterLines={false}
                  withVerticalLines={false}
                  withHorizontalLines={false}
                  withDots={false}
                  height={220}
                  chartConfig={chartConfig}
                />
              </View>
            </ScrollView>
          );
        })}
      </SafeAreaView>
    </View>
  );
};

// .map((item) => {
//   return <Text>test</Text>
// });

export default KetoLimitScreen;

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",

    color: "#FFF",
    fontFamily: "Karla_300Light",
  },
});
