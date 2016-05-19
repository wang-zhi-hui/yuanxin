'use strict';
var React = require('react-native');

var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Image
    } = React;
var AciontBar = require('../../control/ActionBar');
var ConfigUtil = require('../../utils/ConfigUtil');
var StyleUtil = require('../../utils/StyleUtil');
var StorageUtil = require('../../utils/StorageUtil');
var ButtonControl = require('../../control/ButtonControl');
var PersonalCompanyAdd = require('./PersonalCompanyAdd');
var UserLogin = require('../login/UserLogin');
var MerchantInfo = require('./MerchantInfo');
var SelectCompanyType = React.createClass({
    render(){
        let actionBarProp = {
            actionName: ConfigUtil.InnerText.selectCompanyType,
            actionBarLeftProp: {
                image:(<Image style={StyleUtil.ActionBarLeftBackImage} source={require('../../images/left_back.png')} />),
                click: function () {
                    StorageUtil.removeStorageItem(StorageUtil.OAuthToken);
                    StorageUtil.removeStorageItem(StorageUtil.CopmanyInfo);
                    this.props.jumpPushPage(null, 'userlogin');
                }.bind(this)
            }
        };
        let personalCompanyButton = {
            userClick: ()=>this.props.jumpPushPage(PersonalCompanyAdd, 'personalcompanyadd'),
            buttonStyle: StyleUtil.SubmitStyle,
            buttonTextStyle: StyleUtil.SubmitTextStyle,
            buttonText: ConfigUtil.InnerText.personalCompanyTypeName
        };
        let companyButton = {
            userClick: ()=>this.props.jumpPushPage(MerchantInfo, 'merchantinfo'),
            buttonStyle: StyleUtil.SubmitStyle,
            buttonTextStyle: StyleUtil.SubmitTextStyle,
            buttonText: ConfigUtil.InnerText.companyTypeName
        };
        return (
            <View style={StyleUtil.basicBackgroundColor}>
                <AciontBar {...actionBarProp} />
                <ButtonControl {...companyButton} />
                <ButtonControl {...personalCompanyButton} />
            </View>
        );
    }
});
module.exports = SelectCompanyType;