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
var navigator, refreshUserCallback;
var currUserInfo = {};
var tempPostProp, tempGetProp, tempSelectPhotoCallback, tempOSSUploadCallBack;
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
    sendSuccess(response){
        if (!tempPostProp.special) {
            if (response.code == 200) {
                tempPostProp.success(response);
            }
            else if (response.code == 401) {
                this.getRefreshUserInfo(this.send);
            }
            else {
                this.maskViewHandler(false);
                Util.AlertMessage(response.code.toString());
            }
        }
        else
            tempPostProp.success(response);
    },
    sendGetSuccess(response){
        if (response.code == 200) {
            if (tempGetProp.success)
                tempGetProp.success(response);
        }
        else if (response.code == 401) {
            this.getRefreshUserInfo(this.sendGet);
        }
        else {
            this.maskViewHandler(false);
            Util.AlertMessage(response.code.toString());
        }
    },
    sendError(error){
        this.maskViewHandler(false);
        console.log(error);
    },
    sendGetJSon(getProps){
        tempGetProp = getProps;
        this.sendGet();
    },
    sendGet(){
        tempGetProp.userToken = this.getCurrUserInfo().access_token;
        tempGetProp.errorFun = (error)=>this.sendError(error);
        tempGetProp.successFun = (responseText)=>this.sendGetSuccess(responseText);
        Util.HttpHelper.SendGetJSon(tempGetProp);
    },
    sendPostJSON(postProps){
        tempPostProp = postProps;
        this.send();
    },
    send(){
        tempPostProp.userToken = this.getCurrUserInfo().access_token;
        tempPostProp.errorFun = (error)=>this.sendError(error);
        tempPostProp.successFun = (responseText)=>this.sendSuccess(responseText);
        Util.HttpHelper.SendJSon(tempPostProp);
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
                callBACK: callBack || null,
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
    getRefreshUserInfoSuccess(result){
        if (result.code == 200) {
            if (result.message.toString().indexOf('error') == -1 && result.message.toString().indexOf('token') != -1) {
                var refreshUser = JSON.parse(result.message);
                StorageUtil.setStorageItem(StorageUtil.OAuthToken, result.message);
                currUserInfo = refreshUser;
                if (refreshUserCallback) {
                    refreshUserCallback();
                    refreshUserCallback = null;
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
    },
    errorFun(error){
        console.log(error);
    },
    getRefreshUserInfo(callback){
        refreshUserCallback = callback;
        var refreshUserInfoProps = {
            url: ConfigUtil.netWorkApi.login,
            userToken: currUserInfo.access_token,
            body: 'grant_type=refresh_token&refresh_token=' + currUserInfo.refresh_token + '&client_id=' + ConfigUtil.basic.appID,
            successFun: (responseText)=>this.getRefreshUserInfoSuccess(responseText),
            errorFun: (error)=>this.errorFun(error)
        };
        Util.HttpHelper.SendJSon(refreshUserInfoProps);
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
            sendGetJSon: this.sendGetJSon,
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