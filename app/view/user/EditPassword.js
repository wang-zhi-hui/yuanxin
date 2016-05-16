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
var ConfigUtil=require('../../utils/ConfigUtil');
var PhoneVerifyCodeControl=require('../../control/PhoneVerifyCodeControl');
var StorageUtil=require('../../utils/StorageUtil');
var AttrUtil=require('../../utils/AttrUtil')
var StyleUtil=require('../../utils/StyleUtil');
var ButtonControl=require('../../control/ButtonControl');
var Util=require('../../utils/Util');
var TextInputRowControl=require('../../control/TextInputRowControl');
var UserLogin=require('../login/UserLogin');
var EditPassword=React.createClass({
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
    componentDidMount(){
        InteractionManager.runAfterInteractions(() => {
            StorageUtil.getStorageItem(StorageUtil.UserPhoneNumber,function (error,result){
                if(result){
                    this.state.phoneNumber=result;
                    this.setState(this.state);
                }
            }.bind(this));
        });
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
        this.setState(this.state);
    },
    submitSuccess(responseText){
        let submitMessage= JSON.parse(responseText.message);
        if(submitMessage.isSuccess){
            this.props.maskViewHandler(false);
            Util.AlertMessage(ConfigUtil.InnerText.updatePasswordSuccess);
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
            url:ConfigUtil.netWorkApi.updatePassword,
            body:JSON.stringify({
                password:this.state.newsPassword,
                markCode:this.state.verifyCode,
                sessionID:this.state.sessionID
            }),
            success:(responseText)=>this.submitSuccess(responseText)
        });
    },
    updatePassword(){
        this.closeKeyboard();
        if(this.state.verifyCode.trim().length==0)
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
    closeKeyboard(){
        this.refs['txtVerifyCode'].clearFocus();
        this.refs['txtPassword'].clearFocus();
        this.refs['txtConfirmPassword'].clearFocus();
    },
    render(){
        let actionBar={
            actionName:ConfigUtil.InnerText.editPassword,
            isDefaultBack:this.props.jumpPop
        };
        let phoneVerifyCodeProp={
            setSessionID:this.setSessionID,
            isReader:true,
            phoneNumber:this.state.phoneNumber
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
                    <PhoneVerifyCodeControl {...phoneVerifyCodeProp} />
                    <View style={StyleUtil.breakLineItem} />
                    <TextInputRowControl ref='txtVerifyCode' textInputProp={verifyCodeText} />
                    <View style={StyleUtil.breakLineItem} />
                    <TextInputRowControl ref='txtPassword' textInputProp={newsPassword}  />
                    <View style={StyleUtil.breakLineItem} />
                    <TextInputRowControl ref='txtConfirmPassword' textInputProp={confirmPassword} />
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
module.exports=EditPassword;