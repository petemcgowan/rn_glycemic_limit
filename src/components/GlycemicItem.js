import React, { useState } from "react";
import styled, { withTheme } from "styled-components";
import TrackerContext from "../TrackerContext";

import {
  StyleSheet,
  Text,
  View,
  Alert,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import { getGLResult } from "../utils/GlycemicUtils";
import GlycemicModal from "./GlycemicModal";

// Previous TouchableOpacity style was style={[styles.item]}
// definition of the Item, which will be rendered in the FlatList
const GlycemicItem = ({
  title,
  trackerItems,
  setTrackerItems,
  setTotalCarbs,
  setTotalGILoad,
  carbs_per_100g,
  gi,
  gl,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const giLoad = getGLResult(carbs_per_100g, gi);
  console.log("carbs_per_100g:" + carbs_per_100g + ", gi:" + gi + ", gl:" + gl);
  let indicatorToUse = "green";
  let imageToUse = require("../../assets/images/greenCircle.png");
  if (giLoad > 60) {
    indicatorToUse = "red";
    imageToUse = require("../../assets/images/redCircle.png");
  } else if (giLoad > 30) {
    indicatorToUse = "orange";
    imageToUse = require("../../assets/images/orangeCircle.png");
  }

  return (
    <TouchableOpacity
      onPress={() => {
        setTrackerItems([
          ...trackerItems,
          {
            id: title,
            title: title,
            carbs_per_100g: carbs_per_100g,
            gi: gi,
            gl: gl,
          },
        ]);
        let totalCarbs = 0;
        let totalGILoad = 0;
        trackerItems.map((trackerItem) => {
          totalCarbs += trackerItem.carbs_per_100g;
          totalGILoad += trackerItem.gl;
        });

        console.log("TrackerItem, totalCarbs:" + totalCarbs);
        console.log("TrackerItem, totalGILoad:" + totalGILoad);
        setTotalCarbs(totalCarbs);
        setTotalGILoad(totalGILoad);
        setModalVisible(true);
      }}
    >
      <ListItemContainer>
        <GlycemicModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          title={title}
          carbs_per_100g={carbs_per_100g}
          gi={gi}
          giLoad={giLoad}
          imageToUse={imageToUse}
        />
        <ListItem>{title}</ListItem>
        <View>
          <View
            style={{
              backgroundColor: "orange",
              flex: 1,
              alignItems: "center",
            }}
          >
            <ImageBackground
              source={imageToUse}
              resizeMode="cover"
              style={styles.image}
            >
              <Text style={styles.text}>{gi}</Text>
            </ImageBackground>
          </View>
        </View>
        {/* <TrafficLight name="circle" size={24} color="orange" /> */}
      </ListItemContainer>
    </TouchableOpacity>
  );
};

export default withTheme(GlycemicItem);

const ListItemContainer = styled(View)`
  flex-direction: row;
  background-color: black;
  /* justify-content: space-between;
 align-items: center; */
`;

const ListItem = styled(Text)`
  font-family: CircularStd-Medium;
  margin: 3px;
  width: 60%;
  /* font-family: Modesta-Script; */
  font-size: ${({ theme }) => theme.metrics.mediumSize * 1.5}px;
  /* color: ${({ theme }) => theme.colors.subTextColor}; */
  color: white;
`;

// const TrafficLight = styled(FontAwesome)`
//   width: 20%;
// `;

const styles = StyleSheet.create({
  circleTextContainer: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    flex: 1,
    // justifyContent: "center",
    width: 24, //24
    height: 24, //24
  },
  text: {
    color: "white",
    fontSize: 14,
    // lineHeight: 20,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
    padding: 2,
    // backgroundColor: "#000000c0",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
});
