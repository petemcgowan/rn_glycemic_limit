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
import LineChartContainer from "../components/LineChartContainer";

// for reference only, this is the old chart config
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
  const { width } = Dimensions.get("window");
  const height = 256;

  return (
    <View>
      <SafeAreaView style={styles.root}>
        <DonutFactory />
        <LineChartContainer />
      </SafeAreaView>
    </View>
  );
};

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
