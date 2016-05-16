'use strict';
var React = require('react-native');

var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TextInput
    } = React;
var ActionBar = require('../../control/ActionBar');
var ButtonControl = require('../../control/ButtonControl');
var StyleUtil = require('../../utils/StyleUtil');
var ConfigUtil = require('../../utils/ConfigUtil');
var Util = require('../../utils/Util');
var AttrUtil = require('../../utils/AttrUtil');
var TextInputRowControl = require('../../control/TextInputRowControl');
var CompanyUserAdd = React.createClass({
    getInitialState(){
        return {
            phoneNumber: '',
            password: ''
        };
    },
    _onChangeText(text, tag){
        if (tag == 'phoneNumber')
            this.state.phoneNumber = text;
        else
            this.state.password = text;
        this.setState(this.state);
    },
    _saveCompanyUserSuccess(result){
        this.props.maskViewHandler(false);
        let addSuccess=JSON.parse(result.message);
        if(addSuccess.isSuccess){
            Util.AlertMessage(ConfigUtil.InnerText.submitSuccess);
            this.props.callBack();
            this.props.jumpPop();
        }
        else {
            Util.AlertMessage(addSuccess.errorMessage.m_StringValue);
        }

        console.log(result);
    },
    _saveCompanyUser(){
        this.props.sendPostJSON({
            url: ConfigUtil.netWorkApi.copmanyUserAdd,
            body: JSON.stringify(this.state),
            success: (responseText)=>this._saveCompanyUserSuccess(responseText)
        });
    },
    _addCompanyUser(){
        this.refs['loginName'].clearFocus();
        this.refs['password'].clearFocus();
        if (!Util.Vailidate.checkMobileNumber(this.state.phoneNumber)) {
            Util.AlertMessage(ConfigUtil.InnerText.validatePhoneNumberError);
            return;
        }
        else if (this.state.password.trim().length < 6) {
            Util.AlertMessage(ConfigUtil.InnerText.passwordMinError);
            return;
        }
        this.props.maskViewHandler(true);
        this._saveCompanyUser();
    },
    render(){
        let phoneNumberTextProp = AttrUtil.textInput.phoneTextInput();
        phoneNumberTextProp.onChangeText = (text)=>this._onChangeText(text, 'phoneNumber');
        phoneNumberTextProp.placeholder = ConfigUtil.InnerText.phonePlaceholder;
        let actionBarProp = {
            actionName: ConfigUtil.InnerText.companyUserAdd,
            isDefaultBack: this.props.jumpPop
        };
        let passwordText = AttrUtil.textInput.passwordTextInput();
        passwordText.onChangeText = (text)=>this._onChangeText(text, 'password');
        passwordText.placeholder = ConfigUtil.InnerText.passwordPlaceholder;
        let loginButton = {
            userClick: ()=>this._addCompanyUser(),
            buttonStyle: StyleUtil.SubmitStyle,
            buttonTextStyle: StyleUtil.SubmitTextStyle,
            buttonText: ConfigUtil.InnerText.companyUserAdd
        };
        return (
            <View style={StyleUtil.basicBackgroundColor}>
                <ActionBar {...actionBarProp} />
                <View>
                    <TextInputRowControl ref="loginName" textInputProp={phoneNumberTextProp}/>
                    <View style={StyleUtil.breakLineItem}/>
                    <TextInputRowControl ref="password" textInputProp={passwordText}/>
                    <ButtonControl {...loginButton} />
                </View>
            </View>
        );
    }
});
module.exports = CompanyUserAdd;