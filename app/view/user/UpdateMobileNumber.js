'use strict';
var React = require('react-native');

var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    TextInput,
    InteractionManager
    } = React;
var ActionBar = require('../../control/ActionBar');
var ConfigUtil = require('../../utils/ConfigUtil');
var StorageUtil = require('../../utils/StorageUtil');
var PhoneVerifyCodeControl = require('../../control/PhoneVerifyCodeControl');
var AttrUtil = require('../../utils/AttrUtil');
var TextInputRowControl = require('../../control/TextInputRowControl');
var StyleUtil = require('../../utils/StyleUtil');
var ButtonControl = require('../../control/ButtonControl');
var Util = require('../../utils/Util');
var UserLogin = require('../login/UserLogin');
var UpdateMobileNumber = React.createClass({
    getInitialState(){
        return {
            phoneNumber: '',
            verifyCode: '',
            sessionID: '',
            newsPhoneNumber: '',
            newsVerifyCode: '',
            newsSessionID: ''
        };
    },
    componentDidMount(){
        StorageUtil.getStorageItem(StorageUtil.UserPhoneNumber, function (error, result) {
            if (result) {
                this.state.phoneNumber = result;
                this.setState(this.state);
            }
        }.bind(this));
    },
    setSessionID(phoneSessionID, tag)
    {
        if (tag == 'old') {
            this.state.sessionID = phoneSessionID;
        }
        else {
            this.state.newsSessionID = phoneSessionID;
        }

        this.setState(this.state);
    },
    userInputChange(text, tag){
        if (tag == 'old') {
            this.state.phoneNumber = text;
        }
        else if (tag == 'news') {
            this.state.newsPhoneNumber = text;
        }
        else if (tag == 'verifyCode') {
            this.state.verifyCode = text;
        }
        else if (tag == 'newsVerifyCode') {
            this.state.newsVerifyCode = text;
        }
    },
    submitSuccess(result){
        let submitMessage = JSON.parse(result.message);
        if (submitMessage.isSuccess) {
            this.props.maskViewHandler(false);
            Util.AlertMessage(ConfigUtil.InnerText.updateMobileNumberSuccess);
            StorageUtil.removeStorageItem(StorageUtil.OAuthToken);
            StorageUtil.removeStorageItem(StorageUtil.CopmanyInfo);
            this.props.jumpPushPage(UserLogin, 'userlogin');
        }
        else {
            this.props.maskViewHandler(false);
            Util.AlertMessage(submitMessage.errorMessage.m_StringValue);
        }
    },
    submitPhoneNumber(){
        this.props.maskViewHandler(true);
        this.props.sendPostJSON({
            url: ConfigUtil.netWorkApi.updateMobileNumber,
            body: JSON.stringify({
                oldSessionID: this.state.sessionID,
                sessionID: this.state.newsSessionID,
                phoneNumber: this.state.newsPhoneNumber,
                oldMarkCode: this.state.verifyCode,
                markCode: this.state.newsVerifyCode
            }),
            success: (responseText)=>this.submitSuccess(responseText)
        });
    },
    updatePhone(){
        if (this.state.verifyCode.trim().length == 0) {
            Util.AlertMessage(ConfigUtil.InnerText.validateVerifyCodeError);
            return;
        }
        if (!Util.Vailidate.checkMobileNumber(this.state.newsPhoneNumber)) {
            Util.AlertMessage(ConfigUtil.InnerText.validatePhoneNumberError);
            return;
        }
        else if (this.state.verifyCode.trim().length == 0) {
            Util.AlertMessage(ConfigUtil.InnerText.newsVerifyCode);
            return;
        }
        else if (this.state.phoneNumber == this.state.newsPhoneNumber) {
            Util.AlertMessage(ConfigUtil.InnerText.oldPhoneEqualNewsPhone);
            return;
        }
        this.submitPhoneNumber();
    },
    render(){
        let actionBar = {
            actionName: ConfigUtil.InnerText.updateMobileNumber,
            isDefaultBack: this.props.jumpPop
        };
        let phoneVerifyCodeProp = {
            setSessionID: this.setSessionID,
            isReader: true,
            phoneNumber: this.state.phoneNumber,
            tag: 'old'
        };
        let phoneVerifyNewsProp = {
            setSessionID: this.setSessionID,
            userInputChange: this.userInputChange,
            tag: 'news'
        };
        let verifyCodeText = AttrUtil.textInput.verifyCodeTextInput();
        verifyCodeText.onChangeText = (text)=>this.userInputChange(text, 'verifyCode');
        verifyCodeText.placeholder = ConfigUtil.InnerText.msgCodePlaceholder;
        let newsVerifyCodeText = AttrUtil.textInput.verifyCodeTextInput();
        newsVerifyCodeText.onChangeText = (text)=>this.userInputChange(text, 'newsVerifyCode');
        newsVerifyCodeText.placeholder = ConfigUtil.InnerText.msgCodePlaceholder;
        let updatePhoneButton = {
            userClick: ()=>this.updatePhone(),
            buttonStyle: StyleUtil.SubmitStyle,
            buttonTextStyle: StyleUtil.SubmitTextStyle,
            buttonText: ConfigUtil.InnerText.buttonSubmit
        };
        return (
            <View style={StyleUtil.basicBackgroundColor}>
                <ActionBar {...actionBar} />
                <View style={styles.phoneItem}>
                    <View style={StyleUtil.itemTitle}>
                        <Text allowFontScaling={false} style={StyleUtil.FormTitleBold}>{ConfigUtil.InnerText.oldMobileNumber}</Text>
                    </View>
                    <View style={StyleUtil.breakLongLineItem} />
                    <PhoneVerifyCodeControl {...phoneVerifyCodeProp} />
                    <View style={StyleUtil.breakLineItem} />
                    <TextInputRowControl textInputProp={verifyCodeText}/>
                </View>
                <View style={styles.phoneItem}>
                    <View style={StyleUtil.itemTitle}>
                        <Text allowFontScaling={false} style={StyleUtil.FormTitleBold}>{ConfigUtil.InnerText.newsMobileNumber}</Text>
                    </View>
                    <View style={StyleUtil.breakLongLineItem} />
                    <PhoneVerifyCodeControl {...phoneVerifyNewsProp} />
                    <View style={StyleUtil.breakLineItem} />
                    <TextInputRowControl textInputProp={newsVerifyCodeText}/>
                </View>
                <ButtonControl {...updatePhoneButton} />
            </View>
        );
    }
});
var styles = StyleSheet.create({
    phoneItem: {
        marginTop: 10,
        backgroundColor: '#fff'
    }
});
module.exports = UpdateMobileNumber;