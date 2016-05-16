'use strict';
var React = require('react-native');

var {
    AppRegistry,
    Component,
    StyleSheet,
    View,
    } = React;
var ActionBar = require('../../control/ActionBar');
var Register = require('../register/Register');
var StyleUtil = require('../../utils/StyleUtil');
var ButtonControl = require('../../control/ButtonControl');
var AttrUtil = require('../../utils/AttrUtil');
var Util = require('../../utils/Util');
var ConfigUtil = require('../../utils/ConfigUtil');
var PhoneVerifyCodeControl = require('../../control/PhoneVerifyCodeControl');
var StorageUtil = require('../../utils/StorageUtil');
var TextInputRowControl = require('../../control/TextInputRowControl');
var Home = require('../index/Home');
var SelectCompanyType = require('../company/SelectCompanyType');
var PhoneLogin = React.createClass({
    getInitialState(){
        return {
            phoneNumber: '',
            verifyCode: '',
            sessionID: ''
        };
    },
    userLogin(){
        this.closeKeyboard();
        if (!Util.Vailidate.checkMobileNumber(this.state.phoneNumber)) {
            Util.AlertMessage(ConfigUtil.InnerText.validatePhoneNumberError);
            return;
        }
        else if (this.state.verifyCode.trim().length == 0) {
            Util.AlertMessage(ConfigUtil.InnerText.validateVerifyCodeError);
            return;
        }
        else if (this.state.sessionID.trim().length == 0) {
            Util.AlertMessage(ConfigUtil.InnerText.validateSessionIDError);
            return;
        }
        this.props.maskViewHandler(true);
        this.props.sendPostJSON({
            url: ConfigUtil.netWorkApi.login,
            body: 'grant_type=password&SessionID=' + this.state.sessionID + '&username=' + this.state.phoneNumber + "&client_id=" + ConfigUtil.basic.appID + "&password=" + this.state.verifyCode,
            success: (responseText)=>this.loginSuccess(responseText),
            special: true
        });
    },
    userInputChange(text, tag){
        if (tag == "phoneNumber")
            this.state.phoneNumber = text;
        else
            this.state.verifyCode = text;
        this.setState(this.state);
    },
    setSessionID(phoneSessionID)
    {
        this.state.sessionID = phoneSessionID;
        this.setState(this.state);
    },
    closeKeyboard(){
        this.refs['txtPhoneNumber'].clearFocus();
        this.refs['txtVerifyCode'].clearFocus();
    },
    getCopmanyInfoSuccess(result){
        this.props.maskViewHandler(false);
        StorageUtil.setStorageItem(StorageUtil.UserPhoneNumber, this.state.phoneNumber);
        if (result.message) {
            this.props.maskViewHandler(false);
            StorageUtil.setStorageItem(StorageUtil.CopmanyInfo, result.message);
            this.props.jumpReplacePage(Home, 'home');
            Util.AlertMessage(ConfigUtil.InnerText.loginSuccess);
        }
        else {
            this.props.jumpReplacePage(SelectCompanyType, 'selectcompanytype');
        }
    },
    getCopmanyInfo(){
        this.props.sendPostJSON({
            url: ConfigUtil.netWorkApi.getCopmany,
            success: (responseText)=>this.getCopmanyInfoSuccess(responseText)
        });
    },
    loginSuccess(responseText){
        if (responseText.code == 200) {
            if (responseText.message.toString().indexOf('error') == -1 && responseText.message.toString().indexOf('token') != -1) {
                StorageUtil.setStorageItem(StorageUtil.OAuthToken, responseText.message.toString());
                this.props.setLoginUserInfo(responseText.message.toString());
                this.getCopmanyInfo();
            }
            else {
                this.props.maskViewHandler(false);
                Util.AlertMessage(responseText.message.toString());
            }
        }
        else {
            this.props.maskViewHandler(false);
            Util.AlertMessage(responseText.code.toString());
        }

    },
    render(){
        let actionBarProp = {
            actionName: ConfigUtil.InnerText.phoneLogin,
            isDefaultBack: this.props.jumpPop
        };
        let verifyCodeText = AttrUtil.textInput.verifyCodeTextInput();
        verifyCodeText.onChangeText = (text)=>this.userInputChange(text, 'verifyCode');
        verifyCodeText.placeholder = ConfigUtil.InnerText.msgCodePlaceholder;
        let loginButton = {
            userClick: ()=>this.userLogin(),
            buttonStyle: StyleUtil.SubmitStyle,
            buttonTextStyle: StyleUtil.SubmitTextStyle,
            buttonText: ConfigUtil.InnerText.login
        };
        let phoneVerifyCodeProp = {
            userInputChange: this.userInputChange,
            setSessionID: this.setSessionID
        };
        return (
            <View style={StyleUtil.basicBackgroundColor}>
                <ActionBar {...actionBarProp} />
                <View style={styles.main}>
                    <PhoneVerifyCodeControl ref="txtPhoneNumber" {...phoneVerifyCodeProp} />
                    <View style={StyleUtil.breakLineItem}/>
                    <TextInputRowControl ref="txtVerifyCode" textInputProp={verifyCodeText}/>
                    <ButtonControl {...loginButton} />
                </View>
            </View>
        );
    }
});
var styles = StyleSheet.create({
    main: {
        marginTop: 10,
        flex: 1
    }
});
module.exports = PhoneLogin;