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
var StyleUtil = require('../../utils/StyleUtil');
var ConfigUtil = require('../../utils/ConfigUtil');
var AttrUtil = require('../../utils/AttrUtil');
var Util = require('../../utils/Util');
var TextInputRowControl = require('../../control/TextInputRowControl');
var UpdateUserInfo = React.createClass({
    getInitialState(){
        return {
            text: this.props.params.text || ''
        };
    },
    saveInfo(){
        if (this.state.text.trim().length == 0) {
            Util.AlertMessage(this.props.params.updateType == 'username' ? ConfigUtil.InnerText.usernamePlaceholder : ConfigUtil.InnerText.emailPlaceholder);
            return;
        }
        if (this.props.params.updateType == 'email') {
            if (!Util.Vailidate.checkEmail(this.state.text)) {
                Util.AlertMessage(ConfigUtil.InnerText.emailError);
                return;
            }
        }
        this.props.maskViewHandler(true);
        this.submitUserInfo();
    },
    updateUserInfoSuccess(result){
        this.props.maskViewHandler(false);
        let updateMessage = JSON.parse(result.message)
        if (updateMessage.isSuccess) {
            Util.AlertMessage(ConfigUtil.InnerText.saveSuccess);
            this.props.jumpPop();
            this.props.callBack();
        }
        else {
            Util.AlertMessage(updateMessage.errorMessage.m_StringValue);
        }
    },
    submitUserInfo(){
        let apiUrl;
        let postInfo;
        if (this.props.params.updateType == 'email') {
            apiUrl = ConfigUtil.netWorkApi.updateEmail;
            postInfo = JSON.stringify({email: this.state.text});
        }
        else {
            apiUrl = ConfigUtil.netWorkApi.updateUserName;
            postInfo = JSON.stringify({username: this.state.text});
        }
        this.props.sendPostJSON({
            url: apiUrl,
            body: postInfo,
            success: (responseText)=>this.updateUserInfoSuccess(responseText)
        });
    },
    userInput(text){
        this.state.text = text;
        this.setState(this.state);
    },
    render(){
        let actionBar = {
            isDefaultBack: this.props.jumpPop,
            actionBarRightProp: {
                click: ()=>this.saveInfo(),
                text: ConfigUtil.InnerText.save
            }
        };
        let inputProp = AttrUtil.textInput.basicTextInput();
        inputProp.value = this.state.text;
        if (this.props.params.updateType == 'username') {
            actionBar.actionName = ConfigUtil.InnerText.updateUserName;
            inputProp.placeholder = ConfigUtil.InnerText.usernamePlaceholder;
            inputProp.maxLength = 50;
        }
        else if (this.props.params.updateType == 'email') {
            actionBar.actionName = ConfigUtil.InnerText.updateEmail;
            inputProp.placeholder = ConfigUtil.InnerText.emailPlaceholder;
            inputProp.maxLength = 64;
        }
        inputProp.value = this.state.text;
        inputProp.onChangeText = (text)=>this.userInput(text);
        return (
            <View style={StyleUtil.basicBackgroundColor}>
                <ActionBar {...actionBar} />
                <View style={styles.main}>
                    <TextInputRowControl textInputProp={inputProp}/>
                </View>
            </View>
        );
    }
});
var styles = StyleSheet.create({
    main: {
        marginTop: 10
    }
});
module.exports = UpdateUserInfo;