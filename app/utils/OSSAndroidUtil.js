/**
 * Created by lemon on 16/3/1.
 */
'use strict';
var React = require('react-native');

var {NativeModules} = React;
var ossToolModule = NativeModules.OssTool;
var OSSAndroidUtil={
    upload:function (files){
        ossToolModule.multiUpload(files);
    }
};
module.exports=OSSAndroidUtil;
