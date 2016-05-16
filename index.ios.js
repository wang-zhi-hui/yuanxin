/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';
const Index=require('./Index');
class YuanXin extends Component {
  render() {
    return (
      <Index></Index>
    );
  }
}
AppRegistry.registerComponent('YuanXin', () => YuanXin);
