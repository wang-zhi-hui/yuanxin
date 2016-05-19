'use strict';
var React = require('react-native');

var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    Dimensions,
    InteractionManager,
    Image
    } = React;
var StyleUtil = require('../../utils/StyleUtil');
var ConfigUtil = require('../../utils/ConfigUtil');
var AttrUtil = require('../../utils/AttrUtil');
var Util = require('../../utils/Util');
var ButtonControl = require('../../control/ButtonControl');
var ActionBar = require('../../control/ActionBar');
var FormRowInput = require('../../control/FormRowInput');
var StorageUtil = require('../../utils/StorageUtil');
var MerchantMain = require('./MerchantMain');
var EditMerchant = require('./EditMerchant');
var MerchantView = React.createClass({
    getInitialState(){
        return {
            copmanyInfo: {},
            licensePic: [],
            IDCarPic1: [],
            IDCarPic2: [],
            provePic: [],
            LogoImageUrl: []
        };
    },
    componentDidMount(){
        InteractionManager.runAfterInteractions(() => {
            this.refreshCopmanyInfo();
        });
    },
    getCopmanyInfoSuccess(result){
        if (result.message) {
            StorageUtil.setStorageItem(StorageUtil.CopmanyInfo, result.message);
        }
    },
    refreshCopmanyInfo(){
        StorageUtil.getStorageItem(StorageUtil.CopmanyInfo, function (error, result) {
            if (result) {
                this.state.licensePic = [];
                this.state.IDCarPic1 = [];
                this.state.IDCarPic2 = [];
                this.state.provePic = [];
                this.state.LogoImageUrl = [];
                let compmanyObj = JSON.parse(result);
                this.state.copmanyInfo = compmanyObj;
                if (compmanyObj.licensePic)
                    this.state.licensePic.push(compmanyObj.licensePic);
                if (compmanyObj.idCarPic1)
                    this.state.IDCarPic1.push(compmanyObj.idCarPic1);
                if (compmanyObj.idCarPic2)
                    this.state.IDCarPic2.push(compmanyObj.idCarPic2);
                if (compmanyObj.provePic) {
                    compmanyObj.provePic.forEach(function (v) {
                        this.state.provePic.push({url: v.url});
                    }.bind(this));
                }
                if (compmanyObj.logoImageUrl)
                    this.state.LogoImageUrl.push(compmanyObj.logoImageUrl);
                this.setState(this.state);
            }
        }.bind(this));
        this.getCopmanyInfo();
    },
    getCopmanyInfo(){
        this.props.sendPostJSON({
            url: ConfigUtil.netWorkApi.getCopmany,
            success: (responseText)=>this.getCopmanyInfoSuccess(responseText)
        });
    },
    editCopmanyInfo(){
        this.props.jumpPushPage(EditMerchant, 'editmerchant', this.refreshCopmanyInfo);
    },
    render(){
        let actionBarProp = {
            actionName: ConfigUtil.InnerText.businessInfo,
            isDefaultBack: this.props.jumpPop
        };
        if (this.state.copmanyInfo.isManager) {
            actionBarProp.actionBarRightProp = {
                click: ()=>this.editCopmanyInfo(),
                text: ConfigUtil.InnerText.edit
            };
        }
        let merchantMainProps = {
            commonType: 2,
            companyInfo: this.state.copmanyInfo,
            selectAreaHandler: this.selectAreaHandler,
            selectMerchantTypeHandler: this.selectMerchantTypeHandler,
            userInput: this.userInput,
            licensePic: this.state.licensePic,
            IDCarPic1: this.state.IDCarPic1,
            IDCarPic2: this.state.IDCarPic2,
            provePic: this.state.provePic,
            LogoImageUrl: this.state.LogoImageUrl,
            deleteSelectPhone: this.deleteSelectPhone
        };

        return (
            <View style={StyleUtil.basicBackgroundColor}>
                <ActionBar {...actionBarProp} />
                <ScrollView style={styles.scrollStyle} showsVerticalScrollIndicator={true}>
                    <MerchantMain {...merchantMainProps} />
                </ScrollView>
            </View>
        );
    }
});
var styles = StyleSheet.create({
    scrollStyle: {
        height: Dimensions.get('window').height - 44
    }
});
module.exports = MerchantView;