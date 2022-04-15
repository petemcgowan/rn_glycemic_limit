import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import TrackerContext from "../TrackerContext";

// definition of the Item, which will be rendered in the FlatList
const GlycemicItem = ({ title, trackerItems, setTrackerItems }) => (
  <TouchableOpacity
    onPress={() => {
      setTrackerItems([...trackerItems, { id: title, title: title }]);
    }}
    style={[styles.item]}
  >
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
);

// the filter
const GlycemicList = ({ searchPhrase, data, setClicked }) => {
  const { trackerItems, setTrackerItems } = useContext(TrackerContext);
  console.log("List, searchPhrase:" + searchPhrase);

  const renderItem = ({ item }) => {
    // when no input, show all
    if (searchPhrase === "") {
      return (
        <GlycemicItem
          title={item.title}
          trackerItems={trackerItems}
          setTrackerItems={setTrackerItems}
        />
      );
    }
    // filter of the title
    if (
      item.title
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return (
        <GlycemicItem
          title={item.title}
          trackerItems={trackerItems}
          setTrackerItems={setTrackerItems}
        />
      );
    }
  };

  return (
    <SafeAreaView style={styles.list__container}>
      <View
        onStartShouldSetResponder={() => {
          setClicked(false);
        }}
      >
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
        />
      </View>
    </SafeAreaView>
  );
};

export default GlycemicList;

const styles = StyleSheet.create({
  list__container: {
    margin: 10,
    height: "65%",
    width: "100%",
  },
  item: {
    margin: 5,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey",
  },
  title: {
    fontFamily: "Karla_300Light",
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
    // marginBottom: 5,
    fontStyle: "italic",
  },
});
