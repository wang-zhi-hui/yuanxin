'use strict';
var React = require('react-native');

var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TextInput
    } = React;
var ActionBar = require('../../control/ActionBar');
var Register = require('../register/Register');
var StyleUtil = require('../../utils/StyleUtil');
var ButtonControl = require('../../control/ButtonControl');
var AttrUtil = require('../../utils/AttrUtil');
var Util = require('../../utils/Util');
var ConfigUtil = require('../../utils/ConfigUtil');
var StorageUtil = require('../../utils/StorageUtil');
var TextInputRowControl = require('../../control/TextInputRowControl');
var FindPassword = require('../user/FindPassword');
var PhoneLogin = require('./PhoneLogin');
var Home = require('../index/Home');
var SelectCompanyType = require('../company/SelectCompanyType');
var UserLogin = React.createClass({
    getInitialState(){
        return {
            phoneNumber: '',
            password: ''
        };
    },
    userLogin(){
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
        this.props.sendPostJSON({
            url: ConfigUtil.netWorkApi.login,
            body: 'grant_type=password&username=' + this.state.phoneNumber + "&client_id="+ConfigUtil.basic.appID+"&password=" + this.state.password,
            success: (responseText)=>this.loginSuccess(responseText),
            special:true
        });
    },
    userInputChange(text, tag){
        if (tag == "phoneNumber")
            this.state.phoneNumber = text;
        else
            this.state.password = text;
        this.setState(this.state);
    },
    setSessionID(phoneSessionID)
    {
        this.state.sessionID = phoneSessionID;
        this.setState(this.state);
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
        if(responseText.code==200)
        {
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
        else{
            this.props.maskViewHandler(false);
            Util.AlertMessage(responseText.code.toString());
        }

    },
    render(){
        let actionBarProp = {
            actionName: ConfigUtil.InnerText.login,
            actionBarRightProp: {
                text: ConfigUtil.InnerText.register,
                click: ()=>this.props.jumpPushPage(Register, 'register')
            }
        };
        let passwordText = AttrUtil.textInput.passwordTextInput();
        passwordText.onChangeText = (text)=>this.userInputChange(text, 'password');
        passwordText.placeholder = ConfigUtil.InnerText.passwordPlaceholder;
        let phoneNumberTextProp = AttrUtil.textInput.phoneTextInput();
        phoneNumberTextProp.onChangeText = (text)=>this.userInputChange(text, 'phoneNumber');
        phoneNumberTextProp.placeholder = ConfigUtil.InnerText.phonePlaceholder;
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
                <ActionBar {...actionBarProp}></ActionBar>
                <View style={styles.main}>
                    <TextInputRowControl ref="loginName" textInputProp={phoneNumberTextProp}/>
                    <View style={StyleUtil.breakLineItem} />
                    <TextInputRowControl ref="password" textInputProp={passwordText}/>
                    <ButtonControl {...loginButton} />
                    <View style={styles.loginCommon}>
                        <View style={styles.loginCommonitem}>
                            <TouchableHighlight underlayColor={'transparent'}
                                                onPress={()=>this.props.jumpPushPage(FindPassword,'findpassword')}>
                                <Text allowFontScaling={false} style={StyleUtil.SmallFontStyle}>{ConfigUtil.InnerText.findPassWord}</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={[styles.loginCommonitem,styles.phonelogin]}>
                            <TouchableHighlight underlayColor={'transparent'}
                                                onPress={()=>this.props.jumpPushPage(PhoneLogin,'phonelogin')}>
                                <Text allowFontScaling={false} style={StyleUtil.SmallFontStyle}>{ConfigUtil.InnerText.phoneLogin}</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
});
var styles = StyleSheet.create({
    main: {
        marginTop: 10
    },
    loginCommon: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row'
    },
    loginCommonitem: {
        flex: 1,
        flexDirection: 'column'
    },
    phonelogin: {
        alignItems: 'flex-end'
    }
});
module.exports = UserLogin;