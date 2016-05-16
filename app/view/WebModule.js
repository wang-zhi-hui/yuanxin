'use strict';
var React = require('react-native');

var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    YuanXinWebView
    } = React;
var YuanXinWebView = require('../control/YuanXinWebView');
var WebModule = React.createClass({
    _refreshToken(){
        let webviewbridge = this.refs['webviewbridge'];

        webviewbridge.sendToBridge(JSON.stringify(
            {
                type: 3,
                data: {access_token:this.props.getCurrUserInfo().access_token}
            }));
    },
    onBridgeMessage: function (message) {
        let messageObj = JSON.parse(message);
        let webviewbridge = this.refs['webviewbridge'];
        if (messageObj.type == 1) {
            webviewbridge.sendToBridge(JSON.stringify({type: messageObj.type,data:{access_token: this.props.getCurrUserInfo().access_token}}));
        }
        else if(messageObj.type==2)
        {
            this.props.jumpLogin();
        }
        else if(messageObj.type==3)
        {
            this.props.getRefreshUserInfo(this._refreshToken);
        }
        else if (messageObj.type == 4) {
            this.props.jumpPop();
        }
    },
    render(){
        return (
            <YuanXinWebView ref="webviewbridge" source={{uri: this.props.params.url+'?dt='+(new Date()).toString()}}
                            style={{flex:1}} onBridgeMessage={this.onBridgeMessage}
                            javaScriptEnabled={true}></YuanXinWebView>
        );
    }
});
var styles = StyleSheet.create({
    YuanXinWebView: {
        flex: 1
    }
});
module.exports = WebModule;
