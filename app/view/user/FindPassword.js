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
var ActionBar = require('../../control/ActionBar');
var ConfigUtil=require('../../utils/ConfigUtil');
var PhoneVerifyCodeControl=require('../../control/PhoneVerifyCodeControl');
var StorageUtil=require('../../utils/StorageUtil');
var AttrUtil=require('../../utils/AttrUtil')
var StyleUtil=require('../../utils/StyleUtil');
var ButtonControl=require('../../control/ButtonControl');
var Util=require('../../utils/Util');
var TextInputRowControl=require('../../control/TextInputRowControl');
var FindPassword=React.createClass({
    getInitialState(){
        return {
            phoneNumber:'',
            verifyCode:'',
            sessionID:'',
            newsPassword:'',
            confirmPassword:''
        };
    },
    setSessionID(phoneSessionID)
    {
        this.state.sessionID=phoneSessionID;
        this.setState(this.state);
    },
    userInputChange(text,tag){
        if(tag=='verifyCode'){
            this.state.verifyCode=text;
        }
        else if(tag=='newsPassword')
        {
            this.state.newsPassword=text;
        }
        else if(tag=='confirmPassword')
        {
            this.state.confirmPassword=text;
        }
        else if(tag=='phoneNumber'){
            this.state.phoneNumber=text;
        }
        this.setState(this.state);
    },
    submitSuccess(responseText){
        let submitMessage= JSON.parse(responseText.message);
        if(submitMessage.isSuccess){
            this.props.maskViewHandler(false);
            Util.AlertMessage(ConfigUtil.InnerText.findpassWordSuccess);
            this.props.jumpPop();
        }
        else {
            this.props.maskViewHandler(false);
            Util.AlertMessage(submitMessage.errorMessage.m_StringValue);
        }
    },
    submitPassword(){
        this.props.maskViewHandler(true);
        this.props.sendPostJSON({
            url:ConfigUtil.netWorkApi.findPassword,
            body:JSON.stringify({
                loginName:this.state.phoneNumber,
                password:this.state.newsPassword,
                markCode:this.state.verifyCode,
                sessionID:this.state.sessionID
            }),
            success:(responseText)=>this.submitSuccess(responseText)
        });
    },
    closeKeyboard(){
        this.refs['txtPhone'].clearFocus();
        this.refs['txtVerifyCode'].clearFocus();
        this.refs['txtPassword'].clearFocus();
        this.refs['txtConfirmPasswrod'].clearFocus();
    },
    updatePassword(){
        this.closeKeyboard();
        if(!Util.Vailidate.checkMobileNumber(this.state.phoneNumber)){
            Util.AlertMessage(ConfigUtil.InnerText.validatePhoneNumberError);
            return;
        }
        else if(this.state.verifyCode.trim().length==0)
        {
            Util.AlertMessage(ConfigUtil.InnerText.validateVerifyCodeError);
            return;
        }
        else if(this.state.newsPassword.length<6){
            Util.AlertMessage(ConfigUtil.InnerText.passwordMinError);
            return;
        }
        else if(this.state.newsPassword!=this.state.confirmPassword)
        {
            Util.AlertMessage(ConfigUtil.InnerText.confirmPasswordError);
            return;
        }
        else if(this.state.sessionID.trim().length==0)
        {
            Util.AlertMessage(ConfigUtil.InnerText.validateSessionIDError);
            return;
        }
        this.submitPassword();
    },
    render(){
        let actionBar={
            actionName:ConfigUtil.InnerText.findPassWord,
            isDefaultBack:this.props.jumpPop
        };
        let phoneVerifyCodeProp={
            userInputChange:this.userInputChange,
            setSessionID:this.setSessionID
        };
        let verifyCodeText=AttrUtil.textInput.verifyCodeTextInput();
        verifyCodeText.onChangeText=(text)=>this.userInputChange(text,'verifyCode');
        verifyCodeText.placeholder=ConfigUtil.InnerText.msgCodePlaceholder;
        let newsPassword=AttrUtil.textInput.passwordTextInput();
        newsPassword.onChangeText=(text)=>this.userInputChange(text,'newsPassword');
        newsPassword.placeholder=ConfigUtil.InnerText.newsPassword;
        let confirmPassword=AttrUtil.textInput.passwordTextInput();
        confirmPassword.onChangeText=(text)=>this.userInputChange(text,'confirmPassword');
        confirmPassword.placeholder=ConfigUtil.InnerText.confirmPassword;

        let updatePasswordButton={
            userClick:()=>this.updatePassword(),
            buttonStyle:StyleUtil.SubmitStyle,
            buttonTextStyle:StyleUtil.SubmitTextStyle,
            buttonText:ConfigUtil.InnerText.buttonSubmit
        };
        return (
            <View style={StyleUtil.basicBackgroundColor}>
                <ActionBar {...actionBar} />
                <View style={styles.main}>
                    <PhoneVerifyCodeControl ref='txtPhone' {...phoneVerifyCodeProp} />
                    <View style={StyleUtil.breakLineItem}></View>
                    <TextInputRowControl ref='txtVerifyCode' textInputProp={verifyCodeText} />
                    <View style={StyleUtil.breakLineItem}></View>
                    <TextInputRowControl ref='txtPassword' textInputProp={newsPassword} />
                    <View style={StyleUtil.breakLineItem}></View>
                    <TextInputRowControl ref='txtConfirmPasswrod' textInputProp={confirmPassword} />
                    <ButtonControl {...updatePasswordButton} />
                </View>
            </View>
        );
    }
});
var styles=StyleSheet.create({
    main:{
        marginTop:10
    }
});
module.exports=FindPassword;