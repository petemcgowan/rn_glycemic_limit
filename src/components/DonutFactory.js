import * as React from "react";
import { Text, StatusBar, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import Donut from "./Donut";

const data = [
  {
    percentage: 8,
    color: "tomato",
    max: 10,
  },
  // {
  //   percentage: 14,
  //   color: "skyblue",
  //   max: 20,
  // },
  // {
  //   percentage: 92,
  //   color: "gold",
  //   max: 100,
  // },
  {
    percentage: 50,
    max: 150,
    percentage1: 25,
    max1: 150,
    percentage2: 50,
    max2: 150,
    color: "#222",
  },
];

export default function DonutFactory() {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {data.map((p, i) => {
          return (
            <Donut
              key={i}
              percentage={p.percentage}
              percentage1={p.percentage1}
              percentage2={p.percentage2}
              color={p.color}
              delay={500 + 100 * i}
              max={p.max}
              max1={p.max1}
              max2={p.max2}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#fff",
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
