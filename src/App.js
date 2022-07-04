import React, { useState, useMemo, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

// import AppLoading from "expo-app-loading";
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
    // background: "rgb(34, 34, 34)",
    background: "black",
    notification: "blue",
  },
};

const Tab = createBottomTabNavigator();

function AppTabs() {
  const { trackerItems, totalCarbs } = useContext(TrackerContext);

  return (
    <Tab.Navigator
      style={styles.container}
      screenOptions={{
        cardStyle: {
          backgroundColor: "black",
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
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          tabBarItemStyle: {
            backgroundColor: "#1b1344",
            // backgroundColor: "#ff15",
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
          // headerStyle: {
          //   backgroundColor: "#f4511e",
          // },
          tabBarItemStyle: {
            backgroundColor: "#1b1344",
            // backgroundColor: "#1344",
          },
          tabBarBadgeStyle: {
            backgroundColor: "#2196F3",
            color: "#BBBccc",
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
          tabBarBadge: totalCarbs,
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          tabBarItemStyle: {
            backgroundColor: "#1b1344",
            color: "#BBBccc",
          },
          tabBarBadgeStyle: {
            backgroundColor: "#ccF194AF",
            color: "#BBBBBB",
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
          headerStyle: {
            backgroundColor: "#f4511e",
          },
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

  // const renderGlyItem = ({ item }) => <Item description={item.description} />;
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
  console.log("App RENDER");

  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // } else {
  return (
    // <View style={styles.root}>
    //   <SearchScreen />
    // </View>
    <ThemeContextProvider>
      <TrackerProvider value={value}>
        <NavigationContainer theme={MyTheme} style={styles.container}>
          <AppTabs style={styles.container} />
        </NavigationContainer>
      </TrackerProvider>
    </ThemeContextProvider>
  );
  // }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    color: "#FFF",
    fontFamily: "Karla_300Light",
  },
});
