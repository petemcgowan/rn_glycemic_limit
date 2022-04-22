import React, { useState, useMemo, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

import AppLoading from "expo-app-loading";
import {
  useFonts,
  Karla_400Regular,
  Karla_300Light,
} from "@expo-google-fonts/karla";

import SearchScreen from "./screens/SearchScreen";
import TrackerScreen from "./screens/TrackerScreen";
import KetoLimitScreen from "./screens/KetoLimitScreen";
import HelpScreen from "./screens/HelpScreen";
import { FontAwesome } from "@expo/vector-icons";

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TrackerContext, { TrackerProvider } from "./TrackerContext";
import { ThemeContextProvider } from "./ThemeContextProvider";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // primary: "rgb(255, 45, 85)",
    background: "rgb(34, 34, 34)",
  },
};

const Tab = createBottomTabNavigator();

function AppTabs() {
  const { trackerItems } = useContext(TrackerContext);

  return (
    <Tab.Navigator
      style={styles.root}
      screenOptions={{
        cardStyle: {
          backgroundColor: "#222",
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Food Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="search" size={24} color="orange" />
          ),
          tabBarItemStyle: {
            backgroundColor: "#ff15",
          },
        }}
      />
      <Tab.Screen
        name="Keto Tracker"
        component={TrackerScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="star" size={24} color="orange" />
          ),
          tabBarBadge: trackerItems.length,
          tabBarItemStyle: {
            backgroundColor: "#1344",
          },
          tabBarBadgeStyle: {
            backgroundColor: "#334444",
            color: "#BBBBBB",
          },
        }}
      />
      <Tab.Screen
        name="Keto Limit"
        component={KetoLimitScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="ban" size={24} color="orange" />
          ),
          tabBarItemStyle: {
            backgroundColor: "#1b1344",
          },
        }}
      />
      <Tab.Screen
        name="Help"
        component={HelpScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="question-circle" size={24} color="orange" />
          ),
          tabBarItemStyle: {
            backgroundColor: "#1b1344",
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  let [fontsLoaded] = useFonts({
    Karla_300Light,
    Karla_400Regular,
    "CircularStd-Black": require("../assets/fonts/CircularStd-Black.otf"),
    "CircularStd-Bold": require("../assets/fonts/CircularStd-Bold.otf"),
    "CircularStd-Book": require("../assets/fonts/CircularStd-Book.otf"),
    "CircularStd-Medium": require("../assets/fonts/CircularStd-Medium.otf"),
    "Modesta-Script": require("../assets/fonts/Modesta-Script.ttf"),
  });

  // const renderGlyItem = ({ item }) => <Item title={item.title} />;
  const [trackerItems, setTrackerItems] = useState([]);
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [totalGILoad, setTotalGILoad] = useState(0);
  // the memoization is here to prevent is re-rendering needlessly
  const value = useMemo(
    () => ({
      trackerItems,
      setTrackerItems,
      totalCarbs,
      setTotalCarbs,
      totalGILoad,
      setTotalGILoad,
    }),
    [trackerItems, totalCarbs, totalGILoad]
  );
  console.log("App RENDER, trackerItems:" + JSON.stringify(trackerItems));

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      // <View style={styles.root}>
      //   <SearchScreen />
      // </View>
      <ThemeContextProvider>
        <TrackerProvider value={value}>
          <NavigationContainer theme={MyTheme} style={styles.root}>
            <AppTabs style={styles.root} />
          </NavigationContainer>
        </TrackerProvider>
      </ThemeContextProvider>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#222",
    color: "#FFF",
    fontFamily: "Karla_300Light",
  },
});
