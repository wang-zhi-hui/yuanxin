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
    Platform
    } = React;

var YuanXinWebView=React.createClass({
    sendToBridge(message){
        this.refs['webviewbridge'].sendToBridge(message);
    },
    render(){
        let webViewControl=null;
        if (Platform.OS == 'android')
        {
            var YuanXinWebViewAndroid = require('./YuanXinWebViewAndroid');
            webViewControl=<YuanXinWebViewAndroid {...this.props} />;
        }
        else {
            var YuanXinWebViewIOS=require('react-native-webview-bridge');
            webViewControl=<YuanXinWebViewIOS ref="webviewbridge" {...this.props} />;
        }
        return webViewControl;
    }
});
module.exports=YuanXinWebView;