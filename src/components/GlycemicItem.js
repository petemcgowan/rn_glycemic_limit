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
  description,
  trackerItems,
  setTrackerItems,
  setTotalCarbs,
  setTotalGILoad,
  carbAmt,
  giAmt,
  glAmt,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  /* Glycemic Index ranges
  **Low** GI foods and drinks have a GI value **less than or equal to 55** and are characterised by a smaller rise and fall in blood glucose.

  **High** GI foods and drinks have a GI value **greater than or equal to 70** and are characterised by faster and higher peaks and troughs in blood glucose levels.

  **Medium** GI foods and drinks have a GI value **between 56 and 69.**
  */

  //TODO   Add extra info to the modal.  Maybe have the modal only be called using a button?  What do apps normally do?  I'm adding to a "crate", who else does that.
  // TODO Modal styling.  Black background, white writing, Change the blue button to something green, less gawdy.

  const giLoad = getGLResult(carbAmt, giAmt);
  console.log("carbAmt:" + carbAmt + ", giAmt:" + giAmt + ", glAmt:" + glAmt);
  let indicatorToUse = "green";
  // Glycemic Index ranges
  let imageToUse = require("../../assets/images/greenCircle.png");
  if (giLoad > 60) {
    indicatorToUse = "red";
    imageToUse = require("../../assets/images/redCircle.png");
  } else if (giLoad > 30) {
    indicatorToUse = "orange";
    imageToUse = require("../../assets/images/orangeCircle.png");
  }

  /* Glycemic Load ranges
  "Low-GL foods are those with a** GL of 10 and below**, medium are those between **11 and 19**, and high are those with a GL of **20 and above**.

  Excerpt From: Mabel Blades. “The Glycemic Load Counter”.  */

  return (
    <TouchableOpacity
      onPress={() => {
        setTrackerItems([
          ...trackerItems,
          {
            id: description,
            description: description,
            carbAmt: carbAmt,
            giAmt: giAmt,
            glAmt: glAmt,
          },
        ]);
        let totalCarbs = 0;
        let totalGILoad = 0;
        trackerItems.map((trackerItem) => {
          totalCarbs += trackerItem.carbAmt;
          totalGILoad += trackerItem.glAmt;
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
          description={description}
          carbAmt={carbAmt}
          giAmt={giAmt}
          giLoad={giLoad}
          imageToUse={imageToUse}
        />
        <ListItem>{description}</ListItem>
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
              <Text style={styles.text}>{giAmt}</Text>
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
