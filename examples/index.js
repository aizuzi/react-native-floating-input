import React, { Component } from './node_modules/react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Platform,
  StatusBar,
  View,
  TextInput, Button
} from 'react-native'
import { FloatInputView } from 'react-native-floating-input'

export default class HelloWorldApp extends Component {
  render() {
    return (

      <View style={{ flex: 1 }}>
        <Text>Hello, world!</Text>

        <FloatInputView alwaysVisible={true}
          bottomOffset={50}
          isAndroidAdjustResize={false}>
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
    borderColor: '#CCC',
    padding: 10,
    fontSize: 16,
    marginRight: 10,
    textAlignVertical: 'top'
  },
});

AppRegistry.registerComponent('AnswerDetailList', () => HelloWorldApp);
AppRegistry.registerComponent('RecommendList', () => HelloWorldApp);
