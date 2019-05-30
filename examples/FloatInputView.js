import React, { Component } from './node_modules/react';
import PropTypes from './node_modules/prop-types';

import {
  View,
  ViewPropTypes,
  Platform,
  StyleSheet,
  Keyboard,
  LayoutAnimation,
  Dimensions
} from 'react-native';

const moveAnimation = (keyboardEvent) => {
  if (!keyboardEvent || Platform.OS === 'android') {
    return {
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
      duration: 200
    }
  }

  return LayoutAnimation.create(
    keyboardEvent.duration,
    LayoutAnimation.Types[keyboardEvent.easing],
    LayoutAnimation.Properties.opacity,
  )
}
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const isSafeAreaDevice = Platform.OS === 'ios' && (SCREEN_HEIGHT > 800 || SCREEN_WIDTH > 800)

class FloatInputView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyboardVisible: false,
      keyboardHeight: 0,
      floatViewHeight: 50,
    }
  }

  componentDidMount() {
    const keyboardWillShowEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const keyboardWillHideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    this.keyboardShowEventListener = Keyboard.addListener(keyboardWillShowEvent, this.keyboardWillShow);
    this.keyboardHideEventListener = Keyboard.addListener(keyboardWillHideEvent, this.keyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardShowEventListener.remove();
    this.keyboardHideEventListener.remove();
  }

  onChildrenLayout = (layoutEvent) => {
    this.setState({
      floatViewHeight: this.props.alwaysVisible ? layoutEvent.nativeEvent.layout.height : 0,
    });
  }

  keyboardWillShow = (keyboardEvent) => {
    if (!keyboardEvent || !keyboardEvent.endCoordinates) {
      return;
    }

    const keyboardHeight = Platform.select({
      ios: keyboardEvent.endCoordinates.height,
      android: this.props.isAndroidAdjustResize
        ? 0
        : keyboardEvent.endCoordinates.height
    });

    const keyboardAnimate = () => {
      const { animationConfig } = this.props;

      LayoutAnimation.configureNext(
        moveAnimation(keyboardEvent)
      );

      this.setState({
        keyboardVisible: true,
        keyboardHeight: keyboardHeight
      })
    };

    keyboardAnimate();

    this.setState({
      keyboardVisible: true,
      keyboardHeight: keyboardHeight,
    })
  }

  keyboardWillHide = (keyboardEvent) => {

    LayoutAnimation.configureNext(
      moveAnimation(keyboardEvent)
    );

    this.setState({
      keyboardVisible: false,
      keyboardHeight: 0,
    })
  }

  render() {
    const {
      keyboardVisible,
      floatViewHeight,
      keyboardHeight,
    } = this.state;

    const {
      alwaysVisible,
      bottomOffset,
      style,
    } = this.props;

    return (
      <View style={[
        styles.container,
        style,
        {
          opacity: (keyboardVisible || alwaysVisible ? 1 : 0),
          bottom: keyboardHeight == 0 ? keyboardHeight + (isSafeAreaDevice ? 20 : 0) : keyboardHeight - bottomOffset - (isSafeAreaDevice ? 20 : 0),
          height: floatViewHeight + bottomOffset + (isSafeAreaDevice ? (!keyboardVisible ? 20 : 0) : 0)
        }
      ]}>
        <View onLayout={this.onChildrenLayout}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

FloatInputView.propTypes = {
  style: (View.propTypes || ViewPropTypes).style,
  alwaysVisible: PropTypes.bool,
  bottomOffset: PropTypes.number,
  isAndroidAdjustResize: PropTypes.bool,
}

FloatInputView.defaultProps = {
  alwaysVisible: false,
  bottomOffset: 0,
  isAndroidAdjustResize: false,
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'white',
  }
})

export default FloatInputView;
