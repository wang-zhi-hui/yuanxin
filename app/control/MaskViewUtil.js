/**
 * Created by lemon on 16/3/1.
 */
'use strict';
var React = require('react-native');

var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    ProgressBarAndroid,
    ActivityIndicatorIOS,
    Platform,
    Dimensions
    } = React;
var MaskViewUtil = React.createClass({
    render(){
        let maskViewControl;
        if (Platform.OS == 'android') {
            maskViewControl = <View style={styles.maskStyle}><ProgressBarAndroid styleAttr='Inverse'/></View>;
        }
        else if (Platform.OS == 'ios') {
            maskViewControl = <View style={styles.maskStyle}><ActivityIndicatorIOS size="large"/></View>;
        }
        return maskViewControl;
    }
});
var styles = StyleSheet.create({
    maskStyle: {
        top: 0,
        backgroundColor: '#000000',
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        opacity: 0.5,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
module.exports = MaskViewUtil;