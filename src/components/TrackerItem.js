import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
} from "react-native";
import styled, { withTheme } from "styled-components";
import TrackerContext from "../TrackerContext";

const TrackerItem = ({ item }) => {
  const { trackerItems, setTrackerItems, setTotalCarbs, setTotalGILoad } =
    useContext(TrackerContext);

  return (
    <TouchableOpacity
      onPress={() => {
        console.log("TrackerItem, onPress, gonna remove, title:" + item.title);

        for (var i = 0; i < trackerItems.length; i++) {
          if (trackerItems[i].title === item.title) {
            console.log(
              "Item found, i:" +
                i +
                ", trackerItems:" +
                JSON.stringify(trackerItems[i])
            );
            trackerItems.splice(i, 1);
          }
        }
        // TODO I think I might have to copy to a different array to force re-render?

        setTrackerItems(trackerItems);
        console.log(
          "TrackerItem, trackerItems:" + JSON.stringify(trackerItems)
        );
        let totalCarbs = 0;
        let totalGILoad = 0;
        trackerItems.map((trackerItem) => {
          totalCarbs += trackerItem.carbs_per_100g;
          totalGILoad += trackerItem.gi;
        });

        console.log("TrackerItem, totalCarbs:" + totalCarbs);
        console.log("TrackerItem, totalGILoad:" + totalGILoad);
        setTotalCarbs(totalCarbs);
        setTotalGILoad(totalGILoad);
      }}
      style={[styles.item]}
    >
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.title}>{item.carbs_per_100g}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default withTheme(TrackerItem);

const styles = StyleSheet.create({
  title: {
    fontFamily: "Karla_300Light",
    width: "100%",
    color: "#FFF",
    marginTop: 5,
    fontSize: 18,
    // fontWeight: "bold",
    // marginLeft: "5%",
  },
});
