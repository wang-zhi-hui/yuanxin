'use strict';
var React = require('react-native');

var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Platform,
    Dimensions,
    BackAndroid,
    Image
    } = React;
var StyleUtil = require('../../utils/StyleUtil');
var ConfigUtil = require('../../utils/ConfigUtil');
var AttrUtil = require('../../utils/AttrUtil');
var Util = require('../../utils/Util');
var ButtonControl = require('../../control/ButtonControl');
var ActionBar = require('../../control/ActionBar');
var FormRowInput = require('../../control/FormRowInput');
var SelectPhotoControl = require('../../control/SelectPhotoControl');
var SelectDataInfo = require('../../control/SelectDataInfo');
var StorageUtil = require('../../utils/StorageUtil');
var OSSUtil = require('../../utils/OSSUtil');
var MerchantMain = require('./MerchantMain');
var Home = require('../index/Home');
var UserLogin = require('../login/UserLogin');
var KeyboardScrollView = require('../../control/KeyboardScrollView');
var MerchantInfo = React.createClass({
    getInitialState(){
        return {
            isShowSelectMerchantType: 0,
            isShowSelectArea: 0,
            companyInfo: {},
            licensePic: [],
            IDCarPic1: [],
            IDCarPic2: [],
            provePic: [],
            LogoImageUrl: []
        };
    },
    copmanyInfoSuccess(responseText){
        this.props.maskViewHandler(false);
        StorageUtil.setStorageItem(StorageUtil.CopmanyInfo, responseText.message);
        Util.AlertMessage(ConfigUtil.InnerText.submitSuccess);
        this.props.jumpPushPage(Home, 'home');
    },
    submitSuccess(responseText){
        let addMessage = JSON.parse(responseText.message)
        if (addMessage.isSuccess) {
            this.props.sendPostJSON({
                url: ConfigUtil.netWorkApi.getCopmany,
                success: (responseText)=>this.copmanyInfoSuccess(responseText)
            });
        }
        else {
            this.props.maskViewHandler(false);
            Util.AlertMessage(addMessage.errorMessage.m_StringValue);
        }
    },
    submitMerchant(){
        let licensePic = OSSUtil.getItemFile(this.state.licensePic[0]);
        let IDCarPic1 = OSSUtil.getItemFile(this.state.IDCarPic1[0]);
        let IDCarPic2 = OSSUtil.getItemFile(this.state.IDCarPic2[0]);
        let LogoImageUrl = OSSUtil.getItemFile(this.state.LogoImageUrl[0]);
        let provePic = [];
        for (let i = 0; i < this.state.provePic.length; i++) {
            provePic.push(OSSUtil.getItemFile(this.state.provePic[i]));
        }
        let companyInfoObj = this.state.companyInfo;
        companyInfoObj.licensePic = licensePic;
        companyInfoObj.IDCarPic1 = IDCarPic1;
        companyInfoObj.IDCarPic2 = IDCarPic2;
        companyInfoObj.provePic = provePic;
        companyInfoObj.LogoImageUrl = LogoImageUrl;
        this.props.sendPostJSON({
            url: ConfigUtil.netWorkApi.addCopmany,
            body: JSON.stringify(companyInfoObj),
            success: (responseText)=>this.submitSuccess(responseText)
        });
    },
    userInput(text, tag){
        if (tag == 'merchantName')
            this.state.companyInfo.cnName = text;
        else if (tag == 'address')
            this.state.companyInfo.address = text;
        else if (tag == 'businessNumber')
            this.state.companyInfo.businessLicenseNumber = text;
        else if (tag == 'juridicalPersonName')
            this.state.companyInfo.legalPersonName = text;
        else if (tag == 'juridicalPersonPhone')
            this.state.companyInfo.legalPersonMobilePhone = text;
        else if (tag == 'juridicalPersonIDCard')
            this.state.companyInfo.legalPersonIdentityCardNumber = text;
        else if (tag == 'contactPerson')
            this.state.companyInfo.contactPerson = text;
        this.setState(this.state);
    },
    androidImageSuccess(imageList){
        let tempBusinessPhoto = this.state.licensePic;
        let tempAptitudePhoto = this.state.provePic;
        let tempIdCardPhotoFront = this.state.IDCarPic1;
        let tempIdCardPhotoBack = this.state.IDCarPic2;
        let tempLogoImageUrl = this.state.LogoImageUrl;
        for (let i = 0; i < imageList.length; i++) {
            if (imageList[i].FileType == 'businessPhoto')
                tempBusinessPhoto = OSSUtil.setFileSuccess(imageList[i], tempBusinessPhoto);
            else if (imageList[i].FileType == 'aptitudePhoto')
                tempAptitudePhoto = OSSUtil.setFileSuccess(imageList[i], tempAptitudePhoto);
            else if (imageList[i].FileType == 'idCardPhotoFront')
                tempIdCardPhotoFront = OSSUtil.setFileSuccess(imageList[i], tempIdCardPhotoFront);
            else if (imageList[i].FileType == 'idCardPhotoBack')
                tempIdCardPhotoBack = OSSUtil.setFileSuccess(imageList[i], tempIdCardPhotoBack);
            else if (imageList[i].FileType == 'logoImageUrl')
                tempLogoImageUrl = OSSUtil.setFileSuccess(imageList[i], tempIdCardPhotoBack);
        }
        this.state.licensePic = tempBusinessPhoto;
        this.state.provePic = tempAptitudePhoto;
        this.state.IDCarPic1 = tempIdCardPhotoFront;
        this.state.IDCarPic2 = tempIdCardPhotoBack;
        this.state.LogoImageUrl = tempLogoImageUrl;
        this.submitMerchant();
    },
    selectAreaHandler(){
        this.state.isShowSelectArea = 1;
        this.setState(this.state);
    },
    onBackAndroid(){
        if (this.state.isShowSelectMerchantType == 1 || this.state.isShowSelectArea == 1) {
            this.state.isShowSelectMerchantType = this.state.isShowSelectArea = 0;
            this.setState(this.state);
            return true;
        }
    },
    componentWillUnmount() {
        if (Platform.OS == 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    },
    selectPhotoSuccess(e){
        this.setSelectPhoto(e);
    },
    componentWillMount(){
        if (Platform.OS == 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    },
    uploadFileOneSuccess(e){
        let newsFileList;
        if (e[0].FileType == 'businessPhoto') {
            newsFileList = OSSUtil.setFileSuccess(e[0], this.state.licensePic);
            this.state.licensePic = newsFileList;
        }
        else if (e[0].FileType == 'aptitudePhoto') {
            newsFileList = OSSUtil.setFileSuccess(e[0], this.state.provePic);
            this.state.provePic = newsFileList;
        }
        else if (e[0].FileType == 'idCardPhotoFront') {
            newsFileList = OSSUtil.setFileSuccess(e[0], this.state.IDCarPic1);
            this.state.IDCarPic1 = newsFileList;
        }
        else if (e[0].FileType == 'idCardPhotoBack') {
            newsFileList = OSSUtil.setFileSuccess(e[0], this.state.IDCarPic2);
            this.state.IDCarPic2 = newsFileList;
        }
        else if (e[0].FileType == 'logoImageUrl') {
            newsFileList = OSSUtil.setFileSuccess(e[0], this.state.LogoImageUrl);
            this.state.LogoImageUrl = newsFileList;
        }
        this.setState(this.state);
        this.checkAllFileSuccess();
    },
    checkFileSuccess(fileList){
        let isAllSuccess = true;
        for (let i = 0; i < fileList.length; i++) {
            if (!fileList[i].UpdateLoadUrl) {
                isAllSuccess = false;
            }
        }
        return isAllSuccess;
    },
    checkAllFileSuccess(){
        let businessPhotoSuccess = this.checkFileSuccess(this.state.licensePic);
        let aptitudePhotoSuccess = this.checkFileSuccess(this.state.provePic);
        let idCardPhotoFrontSuccess = this.checkFileSuccess(this.state.IDCarPic1);
        let idCardPhotoBackSuccess = this.checkFileSuccess(this.state.IDCarPic2);
        let logoImageUrlSuccess = this.checkFileSuccess(this.state.LogoImageUrl);
        if (businessPhotoSuccess && aptitudePhotoSuccess && idCardPhotoFrontSuccess
            && idCardPhotoBackSuccess && logoImageUrlSuccess) {
            this.submitMerchant();
        }
    },
    setSelectPhoto(selectData){
        let returnImageList = JSON.parse(selectData.data);
        let returnBase;
        if (selectData.FilePath) {
            returnBase = JSON.parse(selectData.FilePath);
        }
        if (selectData.tag == 'businessPhoto') {
            let returnBusinessPhoto = [];
            if (returnBase) {
                returnBusinessPhoto.push({url: returnBase[0], base: returnImageList[0]});
            }
            else {
                returnBusinessPhoto.push({url: returnImageList[0]});
            }
            this.state.licensePic = returnBusinessPhoto;
        }
        else if (selectData.tag == 'aptitudePhoto') {
            let returnAptitudePhoto = this.state.provePic;
            for (let i = 0; i < returnImageList.length; i++) {
                if (returnBase) {
                    returnAptitudePhoto.push({url: returnBase[i], base: returnImageList[i]});
                }
                else {
                    returnAptitudePhoto.push({url: returnImageList[i]});
                }
            }
            this.state.provePic = returnAptitudePhoto;
        }
        else if (selectData.tag == 'idCardPhotoFront') {
            let returnIdCardPhotoFront = [];
            if (returnBase) {
                returnIdCardPhotoFront.push({url: returnBase[0], base: returnImageList[0]});
            }
            else {
                returnIdCardPhotoFront.push({url: returnImageList[0]});
            }
            this.state.IDCarPic1 = returnIdCardPhotoFront;
        }
        else if (selectData.tag == 'idCardPhotoBack') {
            let returnIdCardPhotoBack = [];
            if (returnBase) {
                returnIdCardPhotoBack.push({url: returnBase[0], base: returnImageList[0]});
            }
            else {
                returnIdCardPhotoBack.push({url: returnImageList[0]});
            }
            this.state.IDCarPic2 = returnIdCardPhotoBack;
        }
        else if (selectData.tag == 'logoImageUrl') {
            let returnLogoImageUrl = [];
            if (returnBase) {
                returnLogoImageUrl.push({url: returnBase[0], base: returnImageList[0]});
            }
            else {
                returnLogoImageUrl.push({url: returnImageList[0]});
            }
            this.state.LogoImageUrl = returnLogoImageUrl;
        }
        this.setState(this.state);
    },
    selectMerchantTypeHandler(){
        this.state.isShowSelectMerchantType = 1;
        this.setState(this.state);
    },
    deleteSelectPhone(url, tag){
        if (tag == 'businessPhoto')
            this.state.licensePic = [];
        else if (tag == 'aptitudePhoto') {
            for (let i = 0; i < this.state.provePic.length; i++) {
                if (url == this.state.provePic[i].url) {
                    this.state.provePic.splice(i, 1);
                    break;
                }
            }
        }
        else if (tag == 'idCardPhotoFront')
            this.state.IDCarPic1 = [];
        else if (tag == 'idCardPhotoBack')
            this.state.IDCarPic2 = [];
        else if (tag == 'logoImageUrl')
            this.state.LogoImageUrl = [];
        this.setState(this.state);
    },
    getUserSelectPhotoList(){
        let uploadList = [];
        OSSUtil.setUserSelectPhoto(uploadList, this.state.licensePic, 'businessPhoto');
        OSSUtil.setUserSelectPhoto(uploadList, this.state.provePic, 'aptitudePhoto');
        OSSUtil.setUserSelectPhoto(uploadList, this.state.IDCarPic1, 'idCardPhotoFront');
        OSSUtil.setUserSelectPhoto(uploadList, this.state.IDCarPic2, 'idCardPhotoBack');
        OSSUtil.setUserSelectPhoto(uploadList, this.state.LogoImageUrl, 'logoImageUrl');
        return uploadList;
    },
    uploadFileSuccess(e){
        if (Platform.OS == 'android')
            this.androidImageSuccess(e);
        else
            this.uploadFileOneSuccess(e);
    },
    startUpload(){
        let uplpadOSSFile = this.getUserSelectPhotoList();
        this.props.uploadFileHandler({data: uplpadOSSFile, callBack: this.uploadFileSuccess});
    },
    saveInfo(){
        this.refs['merchantMain'].closeKeyboard();
        if (!this.state.companyInfo.cnName || this.state.companyInfo.cnName.trim().length == 0) {
            Util.AlertMessage(ConfigUtil.InnerText.merchantNamePlaceholder);
            return;
        }
        else if (!this.state.companyInfo.countyCode || this.state.companyInfo.countyCode.trim().length == 0) {
            Util.AlertMessage(ConfigUtil.InnerText.selectAreaPlaceholder);
            return;
        }
        else if (!this.state.companyInfo.address || this.state.companyInfo.address.trim().length == 0) {
            Util.AlertMessage(ConfigUtil.InnerText.addressValidate);
            return;
        }
        else if (!this.state.companyInfo.businessTypeCode || this.state.companyInfo.businessTypeCode.trim().length == 0) {
            Util.AlertMessage(ConfigUtil.InnerText.selectMerchantTypePlaceholder);
            return;
        }
        else if (!this.state.companyInfo.businessLicenseNumber || this.state.companyInfo.businessLicenseNumber.trim().length == 0) {
            Util.AlertMessage(ConfigUtil.InnerText.businessNumberPlaceholder);
            return;
        }
        else if (!this.state.companyInfo.contactPerson || this.state.companyInfo.contactPerson.trim().length == 0) {
            Util.AlertMessage(ConfigUtil.InnerText.contactPersonError);
            return;
        }
        else if (!this.state.companyInfo.legalPersonMobilePhone || !Util.Vailidate.checkMobileNumber(this.state.companyInfo.legalPersonMobilePhone)) {
            Util.AlertMessage(ConfigUtil.InnerText.juridicalPersonPhoneError);
            return;
        }
        else if (!this.state.companyInfo.legalPersonName || this.state.companyInfo.legalPersonName.trim().length == 0) {
            Util.AlertMessage(ConfigUtil.InnerText.juridicalPersonNamePlaceholder);
            return;
        }
        else if (!this.state.companyInfo.legalPersonIdentityCardNumber || !Util.Vailidate.checkIDCard(this.state.companyInfo.legalPersonIdentityCardNumber)) {
            Util.AlertMessage(ConfigUtil.InnerText.juridicalPersonIDCardError);
            return;
        }
        else if (this.state.licensePic.length == 0) {
            Util.AlertMessage(ConfigUtil.InnerText.businessPhotoError);
            return;
        }
        else if (this.state.provePic.length == 0) {
            Util.AlertMessage(ConfigUtil.InnerText.aptitudePhotoError);
            return;
        }
        else if (this.state.IDCarPic1.length == 0) {
            Util.AlertMessage(ConfigUtil.InnerText.idCardPhotoFrontError);
            return;
        }
        else if (this.state.IDCarPic2.length == 0) {
            Util.AlertMessage(ConfigUtil.InnerText.idCardPhotoBackError);
            return;
        }
        this.props.maskViewHandler(true);
        this.startUpload();
    },
    closeKeyboard(){
        this.refs['txtMerchantName'].clearFocus();
        this.refs['txtAddress'].clearFocus();
        this.refs['txtBusinessNumber'].clearFocus();
        this.refs['txtPersonNam'].clearFocus();
        this.refs['txtPersonPhone'].clearFocus();
        this.refs['txtContactPerson'].clearFocus();
        this.refs['txtPersonIDCard'].clearFocus();
    },
    setScrollViewTo(){
        this.refs.scrollView._scrollViewTo(0);
    },
    showSelectDataReturn(id, value, tag)
    {
        if (tag == 'area') {
            this.state.isShowSelectArea = 0;
            this.state.companyInfo.countyCode = id;
            this.state.companyInfo.location = value;
        }
        else if (tag == 'merchantType') {
            this.state.isShowSelectMerchantType = 0;
            this.state.companyInfo.businessTypeCode = id;
            this.state.companyInfo.businessTypeName = value;
        }
        this.setState(this.state);
    },
    setTextInputOffset(event, tag){
        this.refs['scrollView'].setTextInputOffset(event, tag);
    },
    _onFocus(event, tag){
        this.refs['scrollView']._onFocus(event, tag);
    },
    render(){
        let actionBarProp = {
            actionName: ConfigUtil.InnerText.businessAdd
        };
        if (this.state.isShowSelectMerchantType == 0 && this.state.isShowSelectArea == 0) {
            actionBarProp.isDefaultBack = this.props.jumpPop;
            actionBarProp.actionBarRightProp = {
                click: ()=>this.saveInfo(),
                text: ConfigUtil.InnerText.buttonSubmit
            };
        }
        else {
            actionBarProp.actionBarLeftProp = {
                image: (
                    <Image style={{height:15,width:9,marginLeft:10}} source={require('../../images/left_back.png')}/>),
                click: function () {
                    this.state.isShowSelectArea=this.state.isShowSelectMerchantType=0;
                    this.setState(this.state);
                }.bind(this)
            };
        }
        let scrollStyle = {};
        if (Platform.OS == 'ios') {
            scrollStyle.height = (Dimensions.get('window').height - 60);
        }
        else {
            scrollStyle.height = (Dimensions.get('window').height - 62);
        }
        let showMainView = null;
        let selectDataProps = {
            returnData: this.showSelectDataReturn,
            click: this.setScrollViewTo
        };
        if (this.state.isShowSelectArea != 0) {
            selectDataProps.tag = 'area';
            selectDataProps.storageKey = StorageUtil.AreaList;
            showMainView = <SelectDataInfo {...selectDataProps} />;
        }
        else if (this.state.isShowSelectMerchantType != 0) {
            selectDataProps.tag = 'merchantType';
            selectDataProps.storageKey = StorageUtil.BusinesType;
            showMainView = <SelectDataInfo {...selectDataProps} />;
        }
        else {
            let merchantMainProps = {
                commonType: 1,
                companyInfo: this.state.companyInfo,
                selectAreaHandler: this.selectAreaHandler,
                selectMerchantTypeHandler: this.selectMerchantTypeHandler,
                userInput: this.userInput,
                licensePic: this.state.licensePic,
                IDCarPic1: this.state.IDCarPic1,
                IDCarPic2: this.state.IDCarPic2,
                provePic: this.state.provePic,
                LogoImageUrl: this.state.LogoImageUrl,
                deleteSelectPhone: this.deleteSelectPhone,
                selectPhotoHandler: this.props.selectPhotoHandler,
                selectPhotoSuccess: this.selectPhotoSuccess,
                setTextInputOffset: this.setTextInputOffset,
                _onFocus: this._onFocus
            };
            showMainView = <MerchantMain ref="merchantMain" {...merchantMainProps} />;
        }

        return (
            <View style={StyleUtil.basicBackgroundColor}>
                <ActionBar {...actionBarProp} />
                <KeyboardScrollView ref="scrollView" style={scrollStyle} showsVerticalScrollIndicator={true}>
                    {showMainView}
                </KeyboardScrollView>
            </View>
        );
    }
});
module.exports = MerchantInfo;
