/**
 * Created by lemon on 16/3/1.
 */
'use strict';
var React = require('react-native');

var {NativeModules} = React;
var addTipViewModule = NativeModules.addTipView;
var ToastIOSUtil = {
    showIOSMessage(message){
        addTipViewModule.addTipView(message);
    }
};
module.exports = ToastIOSUtil;