/**
 * Created by lemon on 16/3/1.
 */
'use strict';
var React = require('react-native');
var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    TextInput
    } = React;
var ButtonControl = require('./ButtonControl');
var AttrUtil = require('../utils/AttrUtil');
var Util = require('../utils/Util');
var ConfigUtil = require('../utils/ConfigUtil');
var StyleUtil = require('../utils/StyleUtil');
var verifyCodeTimer;
var sessionID;
var PhoneVerifyCodeControl = React.createClass({
    getInitialState(){
        return {
            isPostVerifyCode: false,
            verifyCodeTime: 0,
            phoneNumber: '',
            controlID: Util.GUID()
        };
    },
    clearFocus(){
        this.refs[this.state.controlID].blur();
    },
    userInputChange(text){
        if (!this.props.isReader) {
            this.state.phoneNumber = text;
            this.setState(this.state);
            this.props.userInputChange(text, this.props.tag || 'phoneNumber');
        }
    },
    verifyCodeTimerHandler(){
        if (this.state.isPostVerifyCode) {
            if (this.state.verifyCodeTime > 0) {
                this.state.verifyCodeTime--;
                this.setState(this.state);
            }
            else {
                this.state.isPostVerifyCode = false;
                this.setState(this.state);
                verifyCodeTimer && clearInterval(verifyCodeTimer);
            }
        }
    },
    verifyCodeHandler(){
        var verifyPhoneNumber = this.props.isReader ? this.props.phoneNumber : this.state.phoneNumber;
        if (!this.state.isPostVerifyCode) {
            if (Util.Vailidate.checkMobileNumber(verifyPhoneNumber))    //未发送验证码
            {
                sessionID = Util.GUID();
                var postProps = {
                    url: ConfigUtil.netWorkApi.getVerifyCode,
                    body: 'mobile=' + verifyPhoneNumber + '&sessionId=' + sessionID,
                    successFun: (responseText)=>this.verifyCodeSuccess(responseText),
                    errorFun: (error)=>this.verifyCodeError(error)
                };
                Util.HttpHelper.Send(postProps);
                this.state.isPostVerifyCode = true;
                this.state.verifyCodeTime = ConfigUtil.verifyCodeTime;
                this.setState(this.state);
                this.props.setSessionID(sessionID, this.props.tag || '');
                verifyCodeTimer = setInterval(this.verifyCodeTimerHandler, 1000);
            }
            else {
                this.clearFocus();
                Util.AlertMessage(ConfigUtil.InnerText.validatePhoneNumberError);
            }
        }
    },
    verifyCodeSuccess(responseText){
        if (responseText.code == 200)
            Util.AlertMessage(ConfigUtil.InnerText.getVerifyCodeSuccess);
        else
            Util.AlertMessage(responseText.message);

    },
    verifyCodeError(error){
        console.log(error);
    },
    componentWillUnmount(){
        verifyCodeTimer && clearInterval(verifyCodeTimer);
    },
    render(){
        var phoneNumberText = AttrUtil.textInput.phoneTextInput();
        phoneNumberText.placeholder = ConfigUtil.InnerText.phonePlaceholder;
        phoneNumberText.onChangeText = (text)=>this.userInputChange(text);
        if (this.props.isReader) {
            phoneNumberText.editable = false;
            phoneNumberText.value = this.props.phoneNumber;
        }
        var verifyCodeProps = {
            userClick: ()=>this.verifyCodeHandler(),
            buttonStyle: StyleUtil.VerifyCodeStyle,
            buttonTextStyle: StyleUtil.VerifyCodeText
        };
        if (this.state.isPostVerifyCode) {
            verifyCodeProps.buttonText = this.state.verifyCodeTime + "s";
        }
        else {
            verifyCodeProps.buttonText = ConfigUtil.InnerText.getVerifyCode;
        }
        return (
            <View style={[styles.userInput,styles.phone]}>
                <TextInput ref={this.state.controlID}
                           style={[styles.phoneInput,styles.inputFontSize]} {...phoneNumberText} />
                <ButtonControl {...verifyCodeProps} />
            </View>
        );
    }
});
var styles = StyleSheet.create({
    phone: {
        flexDirection: 'row'
    },
    userInput: {
        height: 44,
        borderWidth: 0,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    phoneInput: {
        paddingLeft: 10,
        flex: 7
    },
    inputFontSize: {
        fontSize: 15
    }
});
module.exports = PhoneVerifyCodeControl;
