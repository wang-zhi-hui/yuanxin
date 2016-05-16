/**
 * Created by lemon on 16/4/30.
 */
var React = require('react-native');

var {NativeModules} = React;
var YuanXinWebViewMessage = NativeModules.YuanXinWebViewMessage;
var YuanXinNativeModule = {
    sendMessage: function (message) {
        YuanXinWebViewMessage.sendMessage(message);
    }
};
module.exports = YuanXinNativeModule;
