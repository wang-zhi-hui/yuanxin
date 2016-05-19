'use strict';

import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Navigator,
    TimerMixin,
    BackAndroid,
    Platform,
    StatusBar,
    DeviceEventEmitter
} from 'react-native';
import MaskViewUtil from './app/control/MaskViewUtil';
import Util from './app/utils/Util';
var ConfigUtil = require('./app/utils/ConfigUtil');
var StorageUtil = require('./app/utils/StorageUtil');
var NavigatorManage = require('./app/utils/NavigatorManage');
var InitApp = require('./InitApp');
var UserLogin = require('./app/view/login/UserLogin');
var SelectPhotoUtil = require('./app/utils/SelectPhotoUtil');
var OSSUtil = require('./app/utils/OSSUtil');
var YuanXinNativeModule = require('./app/utils/YuanXinNativeModule');
var navigator;
var currUserInfo = {};
var tempSelectPhotoCallback, tempOSSUploadCallBack;
var Index = React.createClass({
    getInitialState(){
        return {
            currentRoute: {
                name: 'initapp',
                component: InitApp
            },
            isShowMaskView: false
        };
    },
    sendError(error){
        this.maskViewHandler(false);
        console.log(error);
    },
    sendPostJSON(postProps){
        postProps.userToken = this.getCurrUserInfo().access_token;
        postProps.errorFun = (error)=>this.sendError(error);
        Util.HttpHelper.SendJSon(postProps).then((responseObj)=>{
            if (!postProps.special) {
                if (responseObj.code == 200) {
                    postProps.success(responseObj);
                }
                else if (responseObj.code == 401) {
                    this.getRefreshUserInfo(()=>{
                        this.sendPostJSON(postProps);
                    });
                }
                else {
                    this.maskViewHandler(false);
                    Util.AlertMessage(responseObj.code.toString());
                }
            }
            else
                postProps.success(responseObj);
        });
    },
    componentWillUnmount() {
        if (Platform.OS == 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
        DeviceEventEmitter.removeAllListeners('ImageCapture');
        DeviceEventEmitter.removeAllListeners('finish');
        DeviceEventEmitter.removeAllListeners('WebViewCommunication');
    },
    getCurrUserInfo(){
        return currUserInfo;
    },
    selectPhotoHandler(selectPhotoProp){
        tempSelectPhotoCallback = selectPhotoProp.callBack;
        SelectPhotoUtil.showSelectPhoto(selectPhotoProp.count, false, selectPhotoProp.tag || '', selectPhotoProp.callBack);
    },
    uploadFileHandler(fileProp){
        tempOSSUploadCallBack = fileProp.callBack;
        OSSUtil.uploadFile(JSON.stringify(fileProp.data));
    },
    webViewRefreshUserInfoSuccess(){
        YuanXinNativeModule.sendMessage(JSON.stringify({
            type: 3,
            data: {access_token: this.getCurrUserInfo().access_token}
        }));
    },
    webViewHandle(e){
        let communication = JSON.parse(e.message);
        if (communication.type == 1) {
            YuanXinNativeModule.sendMessage(JSON.stringify({
                type: communication.type,
                data: {access_token: this.getCurrUserInfo().access_token}
            }));
        }
        else if (communication.type == 2) {
            this.jumpLogin();
        }
        else if (communication.type == 3) {
            this.getRefreshUserInfo(this.webViewRefreshUserInfoSuccess);
        }
        else if (communication.type == 4) {
            this.jumpPop();
        }
        else if (communication.type == 5) {
            YuanXinNativeModule.sendMessage(JSON.stringify({
                type: communication.type
            }));
        }
    },
    componentDidMount: function () {
        if (Platform.OS == 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
        DeviceEventEmitter.addListener('WebViewCommunication', function (e:Event) {
            this.webViewHandle(e);
        }.bind(this));
        DeviceEventEmitter.addListener('ImageCapture', function (e:Event) {
            if (tempSelectPhotoCallback)
                tempSelectPhotoCallback(e);
        }.bind(this));
        DeviceEventEmitter.addListener('finish', function (e:Event) {
            if (Platform.OS == 'android') {
                if (e.status == 'failure') {
                    this.maskViewHandler(false);
                    Util.AlertMessage("网络错误");
                }
                else if (e.status == "success") {
                    tempOSSUploadCallBack(JSON.parse(e.data));
                }
            }
            else {
                if (e.errorMessage) {
                    this.maskViewHandler(false);
                    Util.AlertMessage(e.errorMessage);
                }
                else if (parseInt(e.percent) == 1) {
                    if (tempOSSUploadCallBack)
                        tempOSSUploadCallBack([e]);
                }
            }

        }.bind(this));
        // TODO: add support for CodePush on Android
        const CodePush = require('react-native-code-push');
        CodePush.sync({rollbackTimeout: 3000});
    },
    maskViewHandler(isShow){
        this.state.isShowMaskView = isShow;
        this.setState(this.state);
    },
    onBackAndroid(){
        if (navigator != null) {
            if (navigator.getCurrentRoutes().length > 1
                && navigator.getCurrentRoutes()[navigator.getCurrentRoutes().length - 1].name != 'userlogin'
                && navigator.getCurrentRoutes()[navigator.getCurrentRoutes().length - 1].name != 'home') {
                navigator.pop();
                return true;
            }
        }
    },
    jumpPop(){
        if (navigator && navigator.getCurrentRoutes().length > 1) {
            navigator.pop();
        }
    },
    jumpReplacePage(component, name, callBack, params){
        if (navigator && navigator.getCurrentRoutes().length > 0) {
            navigator.replace({
                name: name || null,
                component: component,
                callBack: callBack || null,
                params: params || null
            });
        }
    },
    jumpPushPage(component, name, callBack, params){
        navigator.push({name: name || null, component: component, callBack: callBack || null, params: params || null});
    },
    setLoginUserInfo(userInfoStr){
        currUserInfo = JSON.parse(userInfoStr);
    },
    errorFun(error){
        console.log(error);
    },
    getRefreshUserInfo(callback){
        var refreshUserInfoProps = {
            url: ConfigUtil.netWorkApi.login,
            userToken: this.getCurrUserInfo().access_token,
            body: 'grant_type=refresh_token&refresh_token=' + this.getCurrUserInfo().refresh_token + '&client_id=' + ConfigUtil.basic.appID,
            errorFun: (error)=>this.errorFun(error)
        };
        Util.HttpHelper.SendJSon(refreshUserInfoProps).then((result)=>{
            if (result.code == 200) {
                if (result.message.toString().indexOf('error') == -1 && result.message.toString().indexOf('token') != -1) {
                    var refreshUser = JSON.parse(result.message);
                    StorageUtil.setStorageItem(StorageUtil.OAuthToken, result.message);
                    currUserInfo = refreshUser;
                    if (callback) {
                        callback();
                    }
                }
                else {
                    this.maskViewHandler(false);
                    StorageUtil.removeStorageItem(StorageUtil.OAuthToken);
                    StorageUtil.removeStorageItem(StorageUtil.CopmanyInfo);
                    Util.AlertMessage(ConfigUtil.InnerText.loginTimeOutError);
                    this.jumpReplacePage(UserLogin, 'userlogin');
                }

            }
            else {
                this.maskViewHandler(false);
                StorageUtil.removeStorageItem(StorageUtil.OAuthToken);
                StorageUtil.removeStorageItem(StorageUtil.CopmanyInfo);
                Util.AlertMessage(ConfigUtil.InnerText.loginTimeOutError);
                this.jumpReplacePage(UserLogin, 'userlogin');
            }
        });
    },
    jumpLogin(){
        StorageUtil.removeStorageItem(StorageUtil.OAuthToken);
        StorageUtil.removeStorageItem(StorageUtil.CopmanyInfo);
        this.jumpPushPage(null, 'userlogin');
    },
    RouteManager: function (route, navigationOperations, onComponentRef) {
        navigator = navigationOperations;
        var viewProps = {
            navigator: navigationOperations,
            maskViewHandler: this.maskViewHandler,
            getCurrUserInfo: this.getCurrUserInfo,
            setLoginUserInfo: this.setLoginUserInfo,
            getRefreshUserInfo: this.getRefreshUserInfo,
            jumpReplacePage: this.jumpReplacePage,
            jumpPushPage: this.jumpPushPage,
            jumpPop: this.jumpPop,
            sendPostJSON: this.sendPostJSON,
            selectPhotoHandler: this.selectPhotoHandler,
            uploadFileHandler: this.uploadFileHandler,
            jumpLogin: this.jumpLogin
        };
        return NavigatorManage.getNavigatorView(route, viewProps);
    },
    render(){
        var maskView = null;
        if (this.state.isShowMaskView) {
            maskView = <MaskViewUtil />;
        }
        return (
            <View style={styles.main}>
                <StatusBar backgroundColor="#333333" barStyle="light-content"/>
                <Navigator shadowHidden={false} style={styles.body} initialRoute={this.state.currentRoute}
                           renderScene={this.RouteManager}></Navigator>
                {maskView}
            </View>
        );
    }
});
var styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'column'
    },
    body: {
        flex: 1,
        backgroundColor: '#333333'
    }
});
module.exports = Index;