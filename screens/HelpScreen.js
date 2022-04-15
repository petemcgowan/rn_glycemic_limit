import React from "react";
import { StyleSheet, Text, View } from "react-native";

function HelpScreen() {
  return (
    <View
      style={[
        { flex: 1, justifyContent: "center", alignItems: "center" },
        styles.root,
      ]}
    >
      <Text style={styles.text}>Put GI Load etc info here</Text>
    </View>
  );
}

export default HelpScreen;

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#222",
  },
  text: {
    color: "#FFF",
    fontFamily: "Karla_300Light",
    fontSize: 16,
  },
});
