'use strict';
var React = require('react-native');

var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Platform,
    TouchableHighlight,
    InteractionManager,
    ScrollView,
    Dimensions
    } = React;
var StyleUtil = require('../../utils/StyleUtil');
var ConfigUtil = require('../../utils/ConfigUtil');
var Util = require('../../utils/Util');
var TouchRowControl = require('../../control/TouchRowControl');
var ImageControl = require('../../control/ImageControl');
var StorageUtil = require('../../utils/StorageUtil');
var UserInfo = require('../user/UserInfo');
var UserTaskList = require('../UserTaskList');
var MyMessage = require('../MyMessage');
var SetUp = require('../setUp/SetUp');
var PersonalCompanyView = require('../company/PersonalCompanyView');
var MerchantView = require('../company/MerchantView');
var CompanyUserManager = require('../company/CompanyUserManager');
var WebModule = require('../WebModule');
var Recommend = require('../../landpartner/Recommend');
var MenuList = require('../../control/MenuList');
var Me = React.createClass({
    getInitialState(){
        return {
            userInfo: {},
            companyCategory: 1,
            company: {},
            menuList1: [
                {
                    text: ConfigUtil.InnerText.businessInfo,
                    click: ()=>this.showCompanyView()
                },
                {
                    text: ConfigUtil.InnerText.myDoWork,
                    click: ()=>this.props.jumpPushPage(UserTaskList, 'usertasklist')
                },
                {
                    text: ConfigUtil.InnerText.myMessage,
                    click: ()=>this.props.jumpPushPage(MyMessage, 'mymessage')
                }
            ],
            menuList2: [
                {
                    text: ConfigUtil.InnerText.myReleaseSource,
                    click: ()=>this.props.jumpPushPage(WebModule, '', null, {url: ConfigUtil.htmlUrl.myReleaseSource})
                },
                {
                    text: ConfigUtil.InnerText.mySubscribeSource,
                    click: ()=>this.props.jumpPushPage(WebModule, '', null, {url: ConfigUtil.htmlUrl.mySubscribeSource})
                },
                {
                    text: ConfigUtil.InnerText.myLand,
                    click: ()=>Util.AlertMessage('敬请期待')
                }
            ]
        };
    },
    showCompanyView(){
        if (this.state.companyCategory == 1)
            this.props.jumpPushPage(PersonalCompanyView, 'personalcompanyview');
        else
            this.props.jumpPushPage(MerchantView, 'merchantview');
    },
    getUserInfoSuccess(result){
        let userInfo = JSON.parse(result.message);
        this.state.userInfo = userInfo;
        this.setState(this.state);
    },
    errorFun(error){

    },
    getUserInfo(){
        this.props.sendPostJSON({
            url: ConfigUtil.netWorkApi.getUserInfo,
            success: (responseText)=>this.getUserInfoSuccess(responseText)
        });
    },
    componentDidMount(){
        InteractionManager.runAfterInteractions(() => {
            this.getUserInfo();
            StorageUtil.getStorageItem(StorageUtil.CopmanyInfo, function (error, result) {
                if (result) {
                    this.state.company = JSON.parse(result);
                    this.state.companyCategory = JSON.parse(result).category;
                    if (this.state.company.isManager) {
                        this.state.menuList1.push({
                            text: ConfigUtil.InnerText.companyUserManager,
                            click: ()=>this.props.jumpPushPage(CompanyUserManager, 'companyusermanager')
                        });
                    }
                    this.setState(this.state);
                }
            }.bind(this));
        });
    },
    render(){
        let userHeadPhotoProp = {
            imageStyle: styles.userPhoto
        };
        if (this.state.userInfo.logoImageUrl)
            userHeadPhotoProp.imageUri = this.state.userInfo.logoImageUrl;
        else
            userHeadPhotoProp.imageObj = require('../../images/user_photo_default.png');
        let mangerUserViw = null;
        if (this.state.company.isManager) {
            mangerUserViw = (
                <View>
                    <View style={StyleUtil.breakLineItem}/>
                    <TouchRowControl text={ConfigUtil.InnerText.companyUserManager}
                                     userTouch={()=>this.props.jumpPushPage(CompanyUserManager,'companyusermanager')}/>
                </View>
            );
        }
        return (
            <View style={StyleUtil.basicBackgroundColor}>
                <View style={styles.scrollView}>
                    <ScrollView style={styles.scrollView}>
                        <TouchableHighlight underlayColor={'transparent'}
                                            onPress={()=>this.props.jumpPushPage(UserInfo,'userinfo')}>
                            <View style={styles.userInfo}>
                                <ImageControl {...userHeadPhotoProp} />
                                <Text allowFontScaling={false}
                                      style={styles.userLoginName}>账号:{this.state.userInfo.loginName || ''}</Text>
                            </View>
                        </TouchableHighlight>
                        <View style={StyleUtil.breakBoldLineItem}/>
                        <MenuList menuList={this.state.menuList1}/>
                        <View style={StyleUtil.breakBoldLineItem}/>
                        <MenuList menuList={this.state.menuList2}/>
                        <View style={StyleUtil.breakBoldLineItem}/>
                        <View style={styles.userOperationBlock}>
                            <TouchRowControl text={ConfigUtil.InnerText.setUp}
                                             userTouch={()=>this.props.jumpPushPage(SetUp,'setup')}/>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
});
var styles = StyleSheet.create({
    scrollView: {
        height: Platform.OS == 'android' ? (Dimensions.get('window').height - 130) : (Dimensions.get('window').height - 120)
    },
    userInfo: {
        height: 158,
        backgroundColor: '#ff5001',
        justifyContent: 'center',
        alignItems: 'center'
    },
    userPhoto: {
        height: 73,
        width: 73,
        borderRadius: 35
    },
    userLoginName: {
        marginTop: 10,
        color: '#fff',
        fontSize: 15
    },
    userOperation: {
        height: 54,
        backgroundColor: '#fff',
        flexDirection: 'row'
    },
    userOperationRow: {
        flex: 1,
        flexDirection: 'column',
        height: 54,
        justifyContent: 'center',
        alignItems: 'center'
    },
    portraitBreakLine: {
        backgroundColor: '#efeff4',
        width: 1,
        height: 54
    },
    userOperationBlock: {
        backgroundColor: '#fff'
    }

});
module.exports = Me;