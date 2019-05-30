import React, { Component } from './node_modules/react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Platform,
  StatusBar,
  View,
  TextInput, Button, ScrollView
} from 'react-native'
import { FloatInputView } from 'react-native-floating-input'

export default class HelloWorldApp extends Component {
  render() {
    return (
      <View style={{ flex: 1,backgroundColor:'#e0e0e0' }}>
        <View
          style={{ height: 50, backgroundColor: "white", alignItems: 'center', justifyContent: 'center' }}>
          <Text>Example</Text>
        </View>
        <ScrollView >
          <Text>Hello, world!</Text>
          <Text>Hello, world!</Text>
          <Text>Hello, world!</Text>

        </ScrollView>
        <FloatInputView alwaysVisible={true}
          bottomOffset={0}
          isAndroidAdjustResize={true}>
          <View style={styles.textInputView}>
            <TextInput
              underlineColorAndroid="transparent"
              placeholder="此刻的心情"
              style={styles.textInput} />
            <Button
              style={styles.textInputButton}
              title="发送"
              onPress={() => { }} />
          </View>
        </FloatInputView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInputView: {
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    flexGrow: 1,
    borderWidth: 1,
    borderRadius: 10,
    height: 44,
    borderColor: '#e0e0e0',
    paddingStart: 10,
    fontSize: 16,
    marginRight: 10,
    textAlignVertical: 'center'
  },
});
