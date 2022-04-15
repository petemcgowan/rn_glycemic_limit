import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import TrackerContext from "../TrackerContext";

const TrackerScreen = () => {
  const { trackerItems, setTrackerItems } = useContext(TrackerContext);

  const renderTrackerItem = ({ item }) => <TrackerItem title={item.title} />;
  // TODO:

  const TrackerItem = ({ title }) => (
    <TouchableOpacity
      onPress={() => {
        console.log("TrackerItem, onPress, gonna remove, title:" + title);

        for (var i = 0; i < trackerItems.length; i++) {
          if (trackerItems[i].title === title) {
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
        console.log("trackerItems:" + JSON.stringify(trackerItems));
      }}
      style={[styles.item]}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );

  console.log("TrackerScreen, trackerItems:" + JSON.stringify(trackerItems));
  return (
    <View>
      <SafeAreaView style={styles.root}>
        <FlatList
          data={trackerItems}
          renderItem={renderTrackerItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </View>
  );
};

export default TrackerScreen;

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222",
    color: "#FFF",
  },
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
