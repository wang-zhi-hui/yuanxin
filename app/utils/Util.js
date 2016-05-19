/**
 * Created by lemon on 16/3/1.
 */
'use strict';
import React,{
    ToastAndroid,
    Platform
} from 'react-native';
import ToastIOSUtil from './ToastIOSUtil';
var Util = {
    GUID: function () {
        var guid = "";
        for (var i = 1; i <= 32; i++) {
            var n = Math.floor(Math.random() * 16.0).toString(16);
            guid += n;
        }
        return guid;
    },
    HttpHelper: {
        Send: function (postProps) {
            fetch(postProps.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/x-www-form-urlencoded'
                },
                body: postProps.body
            }).then((response) => {
                let returnMessage = response._bodyText == null || response._bodyText == 'null' ? null : response._bodyText;
                postProps.successFun({message: returnMessage, code: response.status});
            }).catch(postProps.errorFun);
        },
        SendJSon: function (postProps) {
            return fetch(postProps.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Accept': 'application/json',
                    'Authorization': postProps.userToken ? 'Bearer ' + postProps.userToken : ''
                },
                body: postProps.body
            }).then((response) => {
                let returnMessage = response._bodyText == null || response._bodyText == 'null' ? null : response._bodyText;
                return new Promise((resolve, reject)=>{
                    resolve({message: returnMessage, code: response.status});
                });
            }).catch(postProps.errorFun);
        },
        SendGetJSon: function (postProps) {
            return fetch(postProps.url).then((response) => {
                let returnMessage = response._bodyText == null || response._bodyText == 'null' ? null : response._bodyText;
                return new Promise((resolve, reject)=>{
                    resolve({message: returnMessage, code: response.status});
                });
            }).catch(postProps.errorFun);
        }
    },
    AlertMessage: function (message) {
        if (Platform.OS == 'ios') {
            ToastIOSUtil.showIOSMessage(message);
        }
        else if (Platform.OS == 'android')
            ToastAndroid.show(message, ToastAndroid.SHORT);
    },
    Vailidate: {
        checkEmail(str){
            return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
        },
        checkMobileNumber(str){
            return /^(1)+\d{10}/.test(str);
        },
        checkIDCard(str){
            return /^(^\d{18}$|^\d{17}(\d|X|x))$/.test(str);
        },
        checkUrlHead(str){
            return /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/.test(str);
        }
    }
};
module.exports = Util;