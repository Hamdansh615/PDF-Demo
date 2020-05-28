/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  ScrollView,
  Image,
  TouchableOpacity,
  View,
  Text,
  StatusBar,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { Header } from 'react-native-elements';
import styles from "./src/assets/styles";
import menu from "./src/assets/images/menu.png";
import tapbar from "./src/assets/images/tapbar_bg.png";
import button from "./src/assets/images/btn_bg.png";
import Pdf from 'react-native-pdf';
import DocumentPicker from 'react-native-document-picker';
import { Colors } from 'react-native/Libraries/NewAppScreen';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      multipleFile: [],
    };
  }
  async selectMultipleFile() {
    //Opening Document Picker for selection of multiple file
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.pdf],
        //There can me more options as well find above
      });
      for (const res of results) {
        //Printing the log realted to the file
        console.log('res : ' + JSON.stringify(res));
        console.log('URI : ' + res.uri);
        console.log('Type : ' + res.type);
        console.log('File Name : ' + res.name);
        console.log('File Size : ' + res.size);
      }
      //Setting the state to show multiple file attributes
      this.setState({ multipleFile: results });
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('NO File Selected');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }


  render() {
    const source = { uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', cache: true };
    return (
      <View>
        <StatusBar barStyle="light-content" backgroundColor='transparent' translucent={true} />
        <Header
          backgroundImage={tapbar}
          containerStyle={styles.headerContainer}
          //////////////////////Left//////////////////////////
          leftComponent={
            <TouchableOpacity
              style={[styles.pmr10]}
              hitSlop={styles.hitSlop}
            >
              <View
                style={[styles.justifyContentCenter, styles.alignItemCenter]}>
                <Image source={menu} resizeMode="contain" />
              </View>
            </TouchableOpacity>
          }
          ///////////////////////Center/////////////////////////
          centerComponent={
            <View style={[styles.justifyContentCenter, styles.alignItemCenter]}>
              <Text style={[styles.lable, styles.White, styles.font18]}>
                PDF Viewer
                  </Text>
            </View>
          }
        />
        <View style={styles.h30} />
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.btnCnt]}
          onPress={this.selectMultipleFile.bind(this)}>
          <ImageBackground
            source={button}
            style={[styles.buttonImg, { marginTop: 2 }]}
            borderRadius={50}
            resizeMode="stretch">
            <View style={[styles.flexRow, styles.alignSelf]}>
              <Text style={[styles.buttonText, styles.mv13]}>
                Select Pdf
                  </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <View style={styles.h30} />

        <ScrollView>
          {this.state.multipleFile.map((item, key) => (
            <View key={key}>
              <Text style={styles.textStyle}>
                File Name: {item.name ? item.name : ''}
                {'\n'}
                Type: {item.type ? item.type : ''}
                {'\n'}
                File Size: {item.size ? item.size : ''}
                {'\n'}
                URI: {item.uri ? item.uri : ''}
                {'\n'}
              </Text>
              <Pdf
                source={item.uri && { uri: item.uri, cache: true }}
                style={{
                  flex: 1,
                  width: Dimensions.get('window').width,
                  height: Dimensions.get('window').height
                }}
              />
            </View>
          ))}

        </ScrollView>
      </View>
    );
  }
}