import React, { useState } from "react";
import styled, { withTheme } from "styled-components";
import TrackerContext from "../TrackerContext";

import {
  StyleSheet,
  Text,
  View,
  Alert,
  ImageBackground,
  Modal,
  Pressable,
  TouchableOpacity,
} from "react-native";

import { getGLResult } from "../utils/GlycemicUtils";

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
  if (giLoad > 60) {
    indicatorToUse = "red";
  } else if (giLoad > 30) {
    indicatorToUse = "orange";
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
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Food: {title}</Text>
              <Text style={styles.modalText}>Carbs: {carbs_per_100g}</Text>
              <Text style={styles.modalText}>GI: {gi}</Text>
              <Text style={styles.modalText}>GI Load: {gi}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <ListItem>{title}</ListItem>
        <View style={styles.circleTextContainer}>
          {indicatorToUse === "red" ? (
            <ImageBackground
              source={require("../../assets/images/redCircle.png")}
              resizeMode="cover"
              style={styles.image}
            >
              <Text style={styles.text}>{gi}</Text>
            </ImageBackground>
          ) : indicatorToUse === "orange" ? (
            <ImageBackground
              source={require("../../assets/images/orangeCircle.png")}
              resizeMode="cover"
              style={styles.image}
            >
              <Text style={styles.text}>{gi}</Text>
            </ImageBackground>
          ) : (
            <ImageBackground
              source={require("../../assets/images/greenCircle.png")}
              resizeMode="cover"
              style={styles.image}
            >
              <Text style={styles.text}>{gi}</Text>
            </ImageBackground>
          )}
        </View>
        {/* <TrafficLight name="circle" size={24} color="orange" /> */}
      </ListItemContainer>
    </TouchableOpacity>
  );
};

export default withTheme(GlycemicItem);

const ListItemContainer = styled(View)`
  flex-direction: row;
  background-color: grey;
  /* justify-content: space-between;
 align-items: center; */
`;

const ListItem = styled(Text)`
  font-family: CircularStd-Medium;
  margin: 3px;
  width: 60%;
  /* font-family: Modesta-Script; */
  font-size: ${({ theme }) => theme.metrics.mediumSize * 1.5}px;
  color: ${({ theme }) => theme.colors.subTextColor};
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
    justifyContent: "center",
    width: 24,
    height: 24,
  },
  text: {
    color: "white",
    fontSize: 14,
    // lineHeight: 20,
    fontWeight: "bold",
    // textAlign: "center",
    // backgroundColor: "#000000c0",
  },
  // Modal CSS
  centeredView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
