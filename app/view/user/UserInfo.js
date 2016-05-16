'use strict';
var React = require('react-native');

var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    Platform,
    Dimensions,
    InteractionManager
    } = React;
var ActionBar = require('../../control/ActionBar');
var ConfigUtil = require('../../utils/ConfigUtil');
var FormRowInput = require('../../control/FormRowInput');
var StyleUtil = require('../../utils/StyleUtil');
var Util = require('../../utils/Util');
var StorageUtil = require('../../utils/StorageUtil');
var SelectPhotoUtil = require('../../utils/SelectPhotoUtil');
var OSSUtil = require('../../utils/OSSUtil');
var TouchRowTextControl = require('../../control/TouchRowTextControl');
var ImageControl = require('../../control/ImageControl');
var UpdateMobileNumber = require('./UpdateMobileNumber');
var UpdateUserInfo = require('./UpdateUserInfo');
var UserInfo = React.createClass({
    getInitialState(){
        return {
            userInfo: {},
            showVieType: 1
        };
    },
    successFun(result){
        this.props.maskViewHandler(false);
        this.state.userInfo = JSON.parse(result.message);
        this.setState(this.state);
    },
    updateUserHeadPhotoSuccess(result){
        this.props.maskViewHandler(false);
        var updateMessage = JSON.parse(result.message)
        if (updateMessage.isSuccess) {
            Util.AlertMessage(ConfigUtil.InnerText.updateUserHeadPhotoSuccess);
        }
        else {
            Util.AlertMessage(updateMessage.errorMessage.m_StringValue);
        }
    },
    updateUserHeadPhoto(){
        this.props.maskViewHandler(true);
        this.props.sendPostJSON({
            url: ConfigUtil.netWorkApi.uploadUserHeadPhoto,
            body: JSON.stringify({
                logoImageUrl: this.state.userInfo.logoImageUrl,
                appId: ConfigUtil.basic.appID
            }),
            success: (responseText)=>this.updateUserHeadPhotoSuccess(responseText)
        });
    },
    getUserInfo(){
        this.props.maskViewHandler(true);
        this.props.sendPostJSON({
            url: ConfigUtil.netWorkApi.getUserInfo,
            success: (responseText)=>this.successFun(responseText)
        });
    },
    componentDidMount(){
        InteractionManager.runAfterInteractions(() => {
            this.getUserInfo();
        });
    },
    uploadUserPhoto(data){
        this.props.maskViewHandler(true);
        var returnPhoto = JSON.parse(data.data);
        var IOSPhoto;
        if (data.FilePath) {
            IOSPhoto = JSON.parse(data.FilePath);
        }
        var photoList = [];
        if (Platform.OS == 'android') {
            photoList.push({
                FileType: 'userheaderphoto',
                FilePath: returnPhoto[0],
                SortNo: 1,
                OssFolder: 'BusinessPlatform'
            });
        }
        else {
            photoList.push({
                FileType: 'userheaderphoto',
                FilePath: returnPhoto[0],
                SortNo: 1,
                OssFolder: 'BusinessPlatform',
                FileBase: IOSPhoto[0]
            });
        }
        this.props.uploadFileHandler({data: photoList, callBack: this.uploadUserHeadPhotoSuccess});
        OSSUtil.uploadFile(JSON.stringify(photoList));
    },
    uploadUserHeadPhotoSuccess(e){
        this.state.userInfo.logoImageUrl = e[0].UpdateLoadUrl;
        this.setState(this.state);
        this.updateUserHeadPhoto();
    },
    userSelectHeadPhoto(){
        this.props.selectPhotoHandler({count: 1, callBack: this.uploadUserPhoto});
    },
    updateUserInfo(tag){
        var value = tag == 'username' ? this.state.userInfo.userName : this.state.userInfo.email;
        this.props.jumpPushPage(UpdateUserInfo, 'updateuserinfo', this.refreshUserInfo, {updateType: tag, text: value});
    },
    updateLoginName(){
        this.props.jumpPushPage(UpdateMobileNumber, 'updatemobilenumber');
    },
    refreshUserInfo(){
        this.getUserInfo();
    },
    render(){
        var actionBarProp = {
            actionName: ConfigUtil.InnerText.userInfo,
            isDefaultBack: this.props.jumpPop
        };
        let userHeadPhoto = {
            imageStyle: styles.userHeadPhoto
        };
        if (this.state.userInfo.logoImageUrl)
            userHeadPhoto.imageUri = this.state.userInfo.logoImageUrl;
        else
            userHeadPhoto.imageObj = require('../../images/user_info_photo_default.png');
        var mainView;
        if (this.state.showVieType == 1) {
            mainView = (
                <View style={styles.main}>
                    <TouchableHighlight onPress={()=>this.userSelectHeadPhoto()} underlayColor={'transparent'}>
                        <View style={styles.userPhoto}>
                            <View style={styles.userItemLeft}>
                                <Text allowFontScaling={false}
                                      style={StyleUtil.FormFontLeftStyle}>{ConfigUtil.InnerText.userHeadPhoto}</Text>
                            </View>
                            <View style={styles.userItemRight}><ImageControl {...userHeadPhoto} />
                                <Image style={styles.clickImage} source={require('../../images/arrow_right.png')}/>
                            </View>
                        </View>
                    </TouchableHighlight>
                    <View style={StyleUtil.breakLineItem}/>
                    <TouchableHighlight onPress={()=>this.updateLoginName()} underlayColor={'transparent'}>
                        <View style={styles.userInfoRow}>
                            <View style={styles.userItemLeft}>
                                <Text allowFontScaling={false}
                                      style={StyleUtil.FormFontLeftStyle}>{ConfigUtil.InnerText.loginName}</Text>
                            </View>
                            <View style={styles.userItemRight}>
                                <Text allowFontScaling={false}
                                      style={StyleUtil.FormFontRightStyle}>{this.state.userInfo.loginName || ''}</Text>
                                <Image style={styles.clickImage} source={require('../../images/arrow_right.png')}/>
                            </View>
                        </View>
                    </TouchableHighlight>
                    <View style={StyleUtil.breakLineItem}/>
                    <TouchableHighlight onPress={()=>this.updateUserInfo('username')} underlayColor={'transparent'}>
                        <View style={styles.userInfoRow}>
                            <View style={styles.userItemLeft}>
                                <Text allowFontScaling={false}
                                      style={StyleUtil.FormFontLeftStyle}>{ConfigUtil.InnerText.username}</Text>
                            </View>
                            <View style={styles.userItemRight}>
                                <View style={styles.userInfoText}>
                                    <Text allowFontScaling={false} numberOfLines={1}
                                          style={StyleUtil.FormFontRightStyle}>{this.state.userInfo.userName || ''}</Text>
                                </View>
                                <Image style={styles.clickImage}
                                       source={require('../../images/arrow_right.png')}/>
                            </View>
                        </View>
                    </TouchableHighlight>
                    <View style={StyleUtil.breakLineItem}/>
                    <TouchableHighlight onPress={()=>this.updateUserInfo('email')} underlayColor={'transparent'}>
                        <View style={styles.userInfoRow}>
                            <View style={styles.userItemLeft}>
                                <Text allowFontScaling={false}
                                      style={StyleUtil.FormFontLeftStyle}>{ConfigUtil.InnerText.email}</Text>
                            </View>
                            <View style={styles.userItemRight}>
                                <View style={styles.userInfoText}>
                                    <Text allowFontScaling={false} numberOfLines={1}
                                          style={StyleUtil.FormFontRightStyle}>{this.state.userInfo.email || ''}</Text>
                                </View>
                                <Image style={styles.clickImage} source={require('../../images/arrow_right.png')}/>
                            </View>
                        </View>
                    </TouchableHighlight>
                </View>
            );
        }
        return (
            <View style={StyleUtil.basicBackgroundColor}>
                <ActionBar {...actionBarProp} />
                {mainView}
            </View>
        );
    }
});
var styles = StyleSheet.create({
    main: {
        marginTop: 10
    },
    userPhoto: {
        height: 78,
        backgroundColor: '#fff',
        flexDirection: 'row'
    },
    userHeadPhoto: {
        height: 60,
        width: 60,
        borderRadius: 32
    },
    userItemLeft: {
        marginLeft: 10,
        width: 50,
        justifyContent: 'center'
    },
    userItemRight: {
        flex: 1,
        marginRight: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    userInfoRow: {
        height: 44,
        backgroundColor: '#fff',
        flexDirection: 'row'
    },
    userInfoText: {
        width: (Dimensions.get('window').width - 90),
        alignItems: 'flex-end'
    },
    clickImage: {
        marginLeft: 10,
        width: 7,
        height: 11
    }
});
module.exports = UserInfo;