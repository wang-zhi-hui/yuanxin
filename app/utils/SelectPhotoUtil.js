/**
 * Created by lemon on 16/3/1.
 */
'use strict';
var React = require('react-native');

var {NativeModules} = React;
var localImageChoose = NativeModules.LocalImageChoose;
var SelectPhotoUtil = {
    showSelectPhoto: function (count, isCut, tag) {
        localImageChoose.choose(count, isCut, tag);
    }
};
module.exports = SelectPhotoUtil;