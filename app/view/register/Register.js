'use strict';
var React = require('react-native');

var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    TouchableHighlight
    } = React;
var ActionBar = require('../../control/ActionBar');
var StyleUtil = require('../../utils/StyleUtil');
var ButtonControl = require('../../control/ButtonControl');
var AttrUtil = require('../../utils/AttrUtil');
var ConfigUtil = require('../../utils/ConfigUtil');
var Util = require('../../utils/Util');
var PhoneVerifyCodeControl = require('../../control/PhoneVerifyCodeControl');
var CheckBoxControl = require('../../control/CheckBoxControl');
var StorageUtil = require('../../utils/StorageUtil');
var TextInputRowControl = require('../../control/TextInputRowControl');
var SelectCompanyType = require('../company/SelectCompanyType');
var UserLogin = require('../login/UserLogin');
var RegisterAgreement = require('./RegisterAgreement');
var Register = React.createClass({
    getInitialState(){
        return {
            phoneNumber: '',
            verifyCode: '',
            sessionID: '',
            isAgreementChecked: true
        };
    },
    userInputChange(text, tag){
        if (tag == "phoneNumber")
            this.state.phoneNumber = text;
        else
            this.state.verifyCode = text;
        this.setState(this.state);
    },
    setSessionID(phoneSessionID){
        this.state.sessionID = phoneSessionID;
        this.setState(this.state);
    },
    loginSuccess(responseText){
        this.props.maskViewHandler(false);
        if (responseText.message.toString().indexOf('error') == -1) {
            StorageUtil.setStorageItem(StorageUtil.UserPhoneNumber, this.state.phoneNumber);
            StorageUtil.setStorageItem(StorageUtil.OAuthToken, responseText.message.toString());
            this.props.setLoginUserInfo(responseText.message.toString());
            Util.AlertMessage(ConfigUtil.InnerText.registerSuccess);
            this.props.jumpReplacePage(SelectCompanyType, 'selectcompanytype');
        }
        else {
            this.props.jumpReplacePage(UserLogin, 'userlogin');
        }

    },
    loginError(){

    },
    registerSuccess(responseText){
        let registerMessage = JSON.parse(responseText.message)
        if (registerMessage.isSuccess) {
            this.props.sendPostJSON({
                url: ConfigUtil.netWorkApi.login,
                body: 'grant_type=password&SessionID=' + this.state.sessionID + '&username=' + this.state.phoneNumber + "&password=" + this.state.verifyCode + "&client_id=" + ConfigUtil.basic.appID,
                success: (responseText)=>this.loginSuccess(responseText)
            });
        }
        else {
            this.props.maskViewHandler(false);
            Util.AlertMessage(registerMessage.errorMessage.m_StringValue);
        }

    },
    closeKeyboard(){
        this.refs["txtPhoneNumber"].clearFocus();
        this.refs["txtVerifyCode"].clearFocus();
    },
    registerHandler(){
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
        else if (!this.state.isAgreementChecked) {
            Util.AlertMessage(ConfigUtil.InnerText.registerAgreementError);
            return;
        }
        this.props.maskViewHandler(true);
        this.props.sendPostJSON({
            url: ConfigUtil.netWorkApi.register,
            body: JSON.stringify({
                SessionID: this.state.sessionID,
                Mobile: this.state.phoneNumber,
                MarkCode: this.state.verifyCode,
                clientId: ConfigUtil.basic.appID
            }),
            success: (responseText)=>this.registerSuccess(responseText)
        });
    },
    setCheckBox(checked){
        this.state.isAgreementChecked = !this.state.isAgreementChecked;
        this.setState(this.state);
    },
    render(){
        let actionBarProp = {
            actionName: ConfigUtil.InnerText.register,
            isDefaultBack: this.props.jumpPop
        };
        let verifyCodeText = AttrUtil.textInput.verifyCodeTextInput();
        verifyCodeText.placeholder = ConfigUtil.InnerText.msgCodePlaceholder;
        verifyCodeText.onChangeText = (text)=>this.userInputChange(text, 'verifyCode');
        let registerButton = {
            userClick: ()=>this.registerHandler(),
            buttonStyle: StyleUtil.SubmitStyle,
            buttonTextStyle: StyleUtil.SubmitTextStyle,
            buttonText: ConfigUtil.InnerText.validatePhoneNumber
        };
        let phoneVerifyCodeProp = {
            userInputChange: this.userInputChange,
            setSessionID: this.setSessionID
        };
        let checkBoxProp = {
            isChecked: this.state.isAgreementChecked,
            setCheckBox: this.setCheckBox
        };
        return (
            <View style={StyleUtil.basicBackgroundColor}>
                <ActionBar {...actionBarProp} />
                <View style={styles.main}>
                    <PhoneVerifyCodeControl ref="txtPhoneNumber" {...phoneVerifyCodeProp} />
                    <View style={StyleUtil.breakLineItem}/>
                    <TextInputRowControl ref="txtVerifyCode" textInputProp={verifyCodeText}/>
                    <View style={styles.registerAgreement}>
                        <TouchableHighlight underlayColor={'transparent'}
                                            onPress={()=>this.props.jumpPushPage(RegisterAgreement, 'registeragreement')}>
                            <Text allowFontScaling={false}
                                  style={styles.registerAgreementText}>{ConfigUtil.InnerText.agreeRegisterAgreement}</Text>
                        </TouchableHighlight>
                        <CheckBoxControl {...checkBoxProp} />
                    </View>
                    <ButtonControl {...registerButton} />
                </View>
            </View>
        );
    }
});
var styles = StyleSheet.create({
    main: {
        marginTop: 10
    },
    registerAgreement: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 10,
        marginTop: 10
    },
    registerAgreementText: {
        fontSize: 15,
        color: '#ff5001'
    },
    checkAgreement: {
        marginLeft: 5,
        height: 15,
        width: 15
    }
});
module.exports = Register;