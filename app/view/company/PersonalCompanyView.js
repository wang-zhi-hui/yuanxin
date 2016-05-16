'use strict';
var React = require('react-native');

var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Platform,
    Dimensions,
    ScrollView,
    InteractionManager
    } = React;
var StyleUtil = require('../../utils/StyleUtil');
var ConfigUtil = require('../../utils/ConfigUtil');
var ActionBar = require('../../control/ActionBar');
var StorageUtil = require('../../utils/StorageUtil');
var PersonalCompanyMain = require('./PersonalCompanyMain');
var Util = require('../../utils/Util');
var PersonalCompanyEdit = require('./PersonalCompanyEdit');
var PersonalCompanyView = React.createClass({
    getInitialState(){
        return {
            personalCompanyInfo: {},
            idCarPic1: [],
            idCarPic2: []
        };
    },
    componentDidMount(){
        InteractionManager.runAfterInteractions(() => {
            this.getDataCompanyInfo();
        });
    },
    getDataCompanyInfo(){
        StorageUtil.getStorageItem(StorageUtil.CopmanyInfo, function (error, result) {
            if (result) {
                this.state.idCarPic1 = [];
                this.state.idCarPic2 = [];
                let compmanyObj = JSON.parse(result);
                this.state.personalCompanyInfo = compmanyObj;
                if (compmanyObj.idCarPic1)
                    this.state.idCarPic1.push(compmanyObj.idCarPic1);
                if (compmanyObj.idCarPic2)
                    this.state.idCarPic2.push(compmanyObj.idCarPic2);
                this.setState(this.state);
            }
        }.bind(this));
        this.refreshCopmanyInfo();
    },
    getCopmanyInfoSuccess(result){
        if (result.message) {
            StorageUtil.setStorageItem(StorageUtil.CopmanyInfo, result.message);
        }
    },
    refreshCopmanyInfo(){
        this.props.sendPostJSON({
            url: ConfigUtil.netWorkApi.getCopmany,
            success: (responseText)=>this.getCopmanyInfoSuccess(responseText)
        });
    },
    editCopmanyInfo(){
        this.props.jumpPushPage(PersonalCompanyEdit, 'personalCompanyedit', this.getDataCompanyInfo);
    },
    render(){
        let actionBarProp = {
            actionName: ConfigUtil.InnerText.businessInfo,
            isDefaultBack: this.props.jumpPop
        };
        if (this.state.personalCompanyInfo.isManager) {
            actionBarProp.actionBarRightProp = {
                click: ()=>this.editCopmanyInfo(),
                text: ConfigUtil.InnerText.edit
            };
        }
        let personalCompanyPrpo = {
            commonType: 2,
            personalCompanyInfo: this.state.personalCompanyInfo,
            idCarPic1: this.state.idCarPic1,
            idCarPic2: this.state.idCarPic2
        };
        let scrollStyle = {};
        if (Platform.OS == 'ios') {
            scrollStyle.height = (Dimensions.get('window').height - 60);
        }
        else {
            scrollStyle.height = (Dimensions.get('window').height - 62);
        }
        return (
            <View style={StyleUtil.basicBackgroundColor}>
                <ActionBar {...actionBarProp} />
                <ScrollView ref="scrollView" style={scrollStyle} showsVerticalScrollIndicator={true}>
                    <PersonalCompanyMain ref="companyMain" {...personalCompanyPrpo}  />
                </ScrollView>
            </View>
        );
    }
});
module.exports = PersonalCompanyView;