'use strict';
var React = require('react-native');

var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    } = React;
var StyleUtil = require('../../utils/StyleUtil');
var ConfigUtil = require('../../utils/ConfigUtil');
var ActionBar = require('../../control/ActionBar');
var ButtonControl = require('../../control/ButtonControl');
var StorageUtil = require('../../utils/StorageUtil');
var Util = require('../../utils/Util');
var TouchRowControl = require('../../control/TouchRowControl');
var EditPassword = require('../user/EditPassword');
var HelpList = require('./HelpList');
var About = require('./About');
var UserLogin = require('../login/UserLogin');
var MenuList = require('../../control/MenuList');
var SetUp = React.createClass({
    getInitialState(){
        return {
            menuList: [
                {
                    text: ConfigUtil.InnerText.editPassword,
                    click: ()=>this.props.jumpPushPage(EditPassword, 'editpassword')
                },
                {
                    text: ConfigUtil.InnerText.help,
                    click: ()=>this.props.jumpPushPage(HelpList, 'helplist')
                },
                {
                    text: ConfigUtil.InnerText.aboutUs,
                    click: ()=>this.props.jumpPushPage(About, 'about')
                }
            ]
        };
    },
    loginOutError(error){
        console.log(error);
    },
    loginOut(){
        let postProps = {
            url: ConfigUtil.netWorkApi.loginOut,
            userToken: this.props.getCurrUserInfo().access_token,
            errorFun: (error)=>this.loginOutError(error)
        };
        Util.HttpHelper.SendGetJSon(postProps).then((result)=>{
            StorageUtil.removeStorageItem(StorageUtil.OAuthToken);
            StorageUtil.removeStorageItem(StorageUtil.CopmanyInfo);
            this.props.jumpPushPage(null, 'userlogin');
            Util.AlertMessage(ConfigUtil.InnerText.loginOutSuccess);
        });
    },
    render(){
        let actionBar = {
            actionName: ConfigUtil.InnerText.setUp,
            isDefaultBack: this.props.jumpPop
        };
        let loginOutButton = {
            userClick: ()=>this.loginOut(),
            buttonStyle: StyleUtil.SubmitStyle,
            buttonTextStyle: StyleUtil.SubmitTextStyle,
            buttonText: ConfigUtil.InnerText.loginOut
        };
        return (
            <View style={StyleUtil.basicBackgroundColor}><ActionBar {...actionBar} />
                <View style={styles.main}>
                    <MenuList menuList={this.state.menuList}/>
                </View>
                <View style={styles.loginOut}>
                    <ButtonControl {...loginOutButton} />
                </View>
            </View>
        );
    }
});
var styles = StyleSheet.create({
    main: {
        marginTop: 10,
        backgroundColor: '#fff'
    },
    loginOut: {
        marginTop: 10
    }
});
module.exports = SetUp;