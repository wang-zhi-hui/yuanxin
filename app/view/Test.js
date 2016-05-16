'use strict';
var React = require('react-native');

var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    NativeModules,
    Image,
    Dimensions,
    ProgressBarAndroid,
    ActivityIndicatorIOS,
    TouchableHighlight,
    Platform,
    PixelRatio
    } = React;

var Test = React.createClass({
    getInitialState: function() {
        return {
            actionName: '土地合伙人',
            actionValue: 'pattner',
            responseText: ''
        }
    },
    getValue: function () {
        this.props.sendPostJSON({
            url: 'http://10.100.200.139/yuanxin/LandPartner/api/test/loginInfo',
            success: (response) => this.setState({responseText: response})
        })
    },
    render: function() {
        return (
            <View style={{backgroundColor:'#fff',marginTop:30}}>
                <Text onPress={this.getValue}>
                    点我
                </Text>
                <Text>
                    {this.state.responseText.message}
                </Text>
            </View>
        )
    }
});
module.exports=Test;