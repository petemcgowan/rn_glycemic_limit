import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
  ImageBackground,
} from "react-native";

import { withTheme } from "styled-components";

// the filter
const GlycemicModal = ({
  modalVisible,
  setModalVisible,
  title,
  carbs_per_100g,
  gi,
  giLoad,
  imageToUse,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 22,
        }}
      >
        <View>
          <Text>{title}</Text>
        </View>
        <View style={styles.modalView}>
          <View style={{ flexDirection: "row", flex: 0.5 }}>
            <ImageBackground
              source={imageToUse}
              resizeMode="cover"
              style={styles.image}
            >
              <Text style={styles.text}>{carbs_per_100g}</Text>
            </ImageBackground>
            <Text>Carbs</Text>
          </View>
          <View style={{ flexDirection: "row", flex: 0.5 }}>
            <ImageBackground
              source={imageToUse}
              resizeMode="cover"
              style={styles.image}
            >
              <Text style={styles.text}>{gi}</Text>
            </ImageBackground>
            <Text>GI </Text>
          </View>
          <View style={{ flexDirection: "row", flex: 0.5 }}>
            <ImageBackground
              source={imageToUse}
              resizeMode="cover"
              style={styles.image}
            >
              <Text style={styles.text}>{giLoad}</Text>
            </ImageBackground>
            <Text>GI Load </Text>
          </View>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Food added</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default withTheme(GlycemicModal);

const styles = StyleSheet.create({
  // Modal CSS
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
  image: {
    // justifyContent: "center",
    width: 24, //24
    height: 24, //24
  },
  centeredView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
    width: 250,
    height: 250,
    flexDirection: "column",
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
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
