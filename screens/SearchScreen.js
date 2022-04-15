import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  View,
} from "react-native";

import GlycemicList from "../components/GlycemicList";
import SearchBar from "../components/SearchBar";
import glycemicPrunedData from "../data/glycemic_pruned.json";

const SearchScreen = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  return (
    <View>
      <SafeAreaView style={styles.root}>
        {!clicked && <Text style={styles.title}>Glycemic Index</Text>}

        <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          clicked={clicked}
          setClicked={setClicked}
        />
        {!glycemicPrunedData ? (
          <ActivityIndicator size="large" />
        ) : (
          <GlycemicList
            searchPhrase={searchPhrase}
            data={glycemicPrunedData}
            setClicked={setClicked}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
    color: "#FFF",
    backgroundColor: "#222",
  },
  title: {
    fontFamily: "Karla_300Light",
    width: "100%",
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "10%",
    color: "#FFF",
  },
});
