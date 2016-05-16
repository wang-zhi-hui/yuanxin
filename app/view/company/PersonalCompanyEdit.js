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
var ActionBar = require('../../control/ActionBar');
var ConfigUtil = require('../../utils/ConfigUtil');
var StyleUtil = require('../../utils/StyleUtil');
var Util = require('../../utils/Util');
var PersonalCompanyMain = require('./PersonalCompanyMain');
var OSSUtil = require('../../utils/OSSUtil');
var StorageUtil = require('../../utils/StorageUtil');
var PersonalCompanyEdit = React.createClass({
    getInitialState(){
        return {
            personalCompanyInfo: {},
            idCarPic1: [],
            idCarPic2: []
        };
    },
    refreshCopmanyInfo(){
        this.props.maskViewHandler(true);
        this.props.sendPostJSON({
            url: ConfigUtil.netWorkApi.getCopmany,
            success: (responseText)=>this.getCopmanyInfoSuccess(responseText)
        });
    },
    getCopmanyInfoSuccess(result){
        this.props.maskViewHandler(false);
        if (result.message) {
            let compmanyObj = JSON.parse(result.message);
            this.state.personalCompanyInfo = compmanyObj;
            if (compmanyObj.idCarPic1)
                this.state.idCarPic1.push(compmanyObj.idCarPic1);
            if (compmanyObj.idCarPic2)
                this.state.idCarPic2.push(compmanyObj.idCarPic2);
            this.setState(this.state);
            StorageUtil.setStorageItem(StorageUtil.CopmanyInfo, result.message);
        }
    },
    selectPhotoSuccess(e){
        this.setSelectPhoto(e);
    },
    uploadFileSuccess(e){
        if (Platform.OS == 'android')
            this.androidImageSuccess(e);
        else
            this.uploadFileOneSuccess(e);
    },
    componentDidMount(){
        InteractionManager.runAfterInteractions(() => {
            this.refreshCopmanyInfo();
        });
    },
    uploadFileOneSuccess(e){
        let newsFileList;
        if (e[0].FileType == 'idCarPic1') {
            newsFileList = OSSUtil.setFileSuccess(e[0], this.state.idCarPic1);
            this.state.idCarPic1 = newsFileList;
        }
        else if (e[0].FileType == 'idCarPic2') {
            newsFileList = OSSUtil.setFileSuccess(e[0], this.state.idCarPic2);
            this.state.idCarPic2 = newsFileList;
        }
        this.setState(this.state);
        this.checkAllFileSuccess();
    },
    checkAllFileSuccess(){
        let idCarPic1Success = OSSUtil.checkFileSuccess(this.state.idCarPic1);
        let idCarPic2Success = OSSUtil.checkFileSuccess(this.state.idCarPic2);
        if (idCarPic1Success && idCarPic2Success) {
            this.submitCompany();
        }
    },
    userInput(text, type){
        if (type == 'realName')
            this.state.personalCompanyInfo.contactPerson = text;
        else
            this.state.personalCompanyInfo.legalPersonMobilePhone = text;
        this.setState(this.state);
    },
    setSelectPhoto(selectData){
        let returnImageList = JSON.parse(selectData.data);
        let returnBase;
        if (selectData.FilePath) {
            returnBase = JSON.parse(selectData.FilePath);
        }
        let returnBusinessPhoto = [];
        if (returnBase) {
            returnBusinessPhoto.push({url: returnBase[0], base: returnImageList[0]});
        }
        else {
            returnBusinessPhoto.push({url: returnImageList[0]});
        }
        if (selectData.tag == 'idCarPic1')
            this.state.idCarPic1 = returnBusinessPhoto;
        else
            this.state.idCarPic2 = returnBusinessPhoto;
        this.setState(this.state);
    },
    deleteSelectPhone(url, tag){
        if (tag == 'idCarPic1')
            this.state.idCarPic1 = [];
        else
            this.state.idCarPic2 = [];
        this.setState(this.state);
    },
    save(){
        this.refs['companyMain'].closeKeyboard();
        if (this.state.personalCompanyInfo.contactPerson.trim().length == 0) {
            Util.AlertMessage(ConfigUtil.InnerText.realNamePlaceholder);
            return;
        }
        else if (!Util.Vailidate.checkMobileNumber(this.state.personalCompanyInfo.legalPersonMobilePhone)) {
            Util.AlertMessage(ConfigUtil.InnerText.mobileNumberError);
            return;
        }
        else if (this.state.idCarPic1.length == 0) {
            Util.AlertMessage(ConfigUtil.InnerText.personalIdCardPhotoFrontError);
            return;
        }
        else if (this.state.idCarPic2.length == 0) {
            Util.AlertMessage(ConfigUtil.InnerText.personalIdCardPhotoBackError);
            return;
        }
        this.props.maskViewHandler(true);
        this.startUpload();
    },
    getUserSelectPhotoList(){
        let uploadList = [];
        OSSUtil.setUserSelectPhoto(uploadList, this.state.idCarPic1, 'idCarPic1');
        OSSUtil.setUserSelectPhoto(uploadList, this.state.idCarPic2, 'idCarPic2');
        return uploadList;
    },
    startUpload(){
        let uplpadOSSFile = this.getUserSelectPhotoList();
        if (uplpadOSSFile.length > 0) {
            this.props.uploadFileHandler({data:uplpadOSSFile,callBack:this.uploadFileSuccess});
        }
        else {
            this.submitCompany();
        }
    },
    getSubmitSuccessCompany(){
        this.props.sendPostJSON({
            url: ConfigUtil.netWorkApi.getCopmany,
            success: (responseText)=>this.submitSuccessCompanyInfo(responseText)
        });
    },
    submitSuccessCompanyInfo(result){
        this.props.maskViewHandler(false);
        StorageUtil.setStorageItem(StorageUtil.CopmanyInfo, result.message);
        Util.AlertMessage(ConfigUtil.InnerText.submitSuccess);
        this.props.jumpPop();
        this.props.callBack();
    },
    submitSuccess(responseText)
    {
        let addMessage = JSON.parse(responseText.message)
        if (addMessage.isSuccess) {
            this.getSubmitSuccessCompany();
        }
        else {
            this.props.maskViewHandler(false);
            Util.AlertMessage(addMessage.errorMessage.m_StringValue);
        }
    },
    submitCompany()
    {
        let postInfo = {
            category: 1,
            code: this.state.personalCompanyInfo.code,
            cnName: this.state.personalCompanyInfo.contactPerson,
            contactPerson: this.state.personalCompanyInfo.contactPerson,
            legalPersonMobilePhone: this.state.personalCompanyInfo.legalPersonMobilePhone,
            idCarPic1: OSSUtil.getItemFile(this.state.idCarPic1[0]),
            idCarPic2: OSSUtil.getItemFile(this.state.idCarPic2[0])
        };
        this.props.sendPostJSON({
            url: ConfigUtil.netWorkApi.updateCopmany,
            body: JSON.stringify(postInfo),
            success: (responseText)=>this.submitSuccess(responseText)
        });
    },
    render()
    {
        let actionBarProp = {
            actionName: ConfigUtil.InnerText.businessInfo,
            isDefaultBack: this.props.jumpPop,
            actionBarRightProp: {
                click: this.save,
                text: ConfigUtil.InnerText.buttonSubmit
            }
        };
        let scrollStyle = {};
        if (Platform.OS == 'ios') {
            scrollStyle.height = (Dimensions.get('window').height - 60);
        }
        else {
            scrollStyle.height = (Dimensions.get('window').height - 62);
        }
        let personalCompanyPrpo = {
            commonType: 1,
            personalCompanyInfo: this.state.personalCompanyInfo,
            userInput: this.userInput,
            idCarPic1: this.state.idCarPic1,
            idCarPic2: this.state.idCarPic2,
            deleteSelectPhone: this.deleteSelectPhone,
            selectPhotoHandler: this.props.selectPhotoHandler,
            selectPhotoSuccess: this.selectPhotoSuccess
        };
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
module.exports = PersonalCompanyEdit;