import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import Constants from "expo-constants";
import { useAssets } from "expo-asset";
import { FileSystem } from "expo-file-system";
import {
  htmlData,
  glycemicInfo2VeryBasic,
  glycemicInfoToo,
} from "../html/testSimple.js";

function HelpScreen() {
  // React.useEffect(() => {
  //   async function getLocalHTML() {
  //     const assets = useAssets(require("../assets/GlycemicInfo2.html"));
  //     // const assets = useAssets(
  //     //   require("../html/tester/GlycemicInfo2VeryBasic.html")
  //     // );
  //     // const assets = useAssets(
  //     //   require("../html/Glycemic Index_ What It Is and How to Use It.html")
  //     // );

  //     const fileContents = await FileSystem.readAsStringAsync(file.localUri);
  //     this._editorHtml = fileContents;
  //   }
  //   getLocalHTML();
  // });

  // string for testing
  const customHTML = `
      <body style="display:flex; flex-direction: column;justify-content: center;
        align-items:center; background-color: black; color:white; height: 100%;">
          <h1 style="font-size:100px; padding: 50px; text-align: center;"
          id="h1_element">
            This is simple html
          </h1>
          <h2 style="display: block; font-size:80px; padding: 50px;
          text-align: center;" id="h2_element">
            This text will be changed later!
          </h2>
       </body>`;

  // console.log("HelpScreen, htmlData" + JSON.stringify(glycemicInfoToo));

  return (
    // <WebView
    //   style={styles.container}
    //   source={{ uri: "https://www.healthline.com/nutrition/glycemic-index" }}
    // />
    <WebView style={styles.container} source={{ html: glycemicInfoToo }} />
  );
}

// <WebView style={styles.container} source={{ html: this._editorHtml }} />

export default HelpScreen;

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#222",
  },
  text: {
    color: "#FFF",
    fontFamily: "Karla_300Light",
    fontSize: 16,
  },
  container: {
    color: "#FFF",
    fontFamily: "Karla_300Light",
    fontSize: 16,
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
