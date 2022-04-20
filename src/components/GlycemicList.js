import React, { useContext } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";

import TrackerContext from "../TrackerContext";
import styled, { withTheme } from "styled-components";
import GlycemicItem from "./GlycemicItem";

// the filter
const GlycemicList = ({ searchPhrase, data, setClicked }) => {
  const { trackerItems, setTrackerItems } = useContext(TrackerContext);

  console.log("List, searchPhrase:" + searchPhrase);

  // item is an entry in the glycemicPrunedData/data list
  const renderItem = ({ item }) => {
    // when no input, show all
    if (searchPhrase === "") {
      return (
        <Row>
          <GlycemicItem
            title={item.title}
            trackerItems={trackerItems}
            setTrackerItems={setTrackerItems}
            carbs_per_100g={item.carbs_per_100g}
            gi={item.gi}
          />
        </Row>
      );
    }
    // filter of the title
    if (
      item.title
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return (
        <Row>
          <GlycemicItem
            title={item.title}
            trackerItems={trackerItems}
            setTrackerItems={setTrackerItems}
            carbs_per_100g={item.carbs_per_100g}
            gi={item.gi}
          />
        </Row>
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

export default withTheme(GlycemicList);

/*********************************
 * Convert Text item to styled components
 *    OptionTitle (in Settings) is the setting title
 *    OptionDescription is the description.
 *    So basically try Description for your text and
 * Convert existing **FlatList to sc** (in GlycemicList)
 * Import MindCast **fonts**
 * **Implement Theme** (in GlycemicList): https://styled-components.com/docs/advanced
 **********************************/

const Row = styled(View)`
  width: 100%;
  /* flex-direction: row; */
  /* justify-content: space-between;
align-items: center; */
`;

const styles = StyleSheet.create({
  list__container: {
    margin: 10,
    height: "65%",
    width: "100%",
  },

  // item: {
  //   margin: 5,
  //   borderBottomWidth: 2,
  //   borderBottomColor: "lightgrey",
  // },
  // title: {
  //   fontFamily: "Karla_300Light",
  //   fontSize: 18,
  //   color: "#FFF",
  //   fontWeight: "bold",
  //   // marginBottom: 5,
  //   fontStyle: "italic",
  // },
});