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
    TouchableHighlight,
    Platform,
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
var SelectPhotoControl = require('../../control/SelectPhotoControl');
var StorageUtil = require('../../utils/StorageUtil');
var SelectDataInfo = require('../../control/SelectDataInfo');
var OSSUtil = require('../../utils/OSSUtil');
var MerchantMain = require('./MerchantMain');
var EditMerchant = React.createClass({
    getInitialState(){
        return {
            licensePic: [],
            provePic: [],
            IDCarPic1: [],
            IDCarPic2: [],
            LogoImageUrl: [],
            copmanyInfo: {},
            isShowSelectMerchantType: 0,
            isShowSelectArea: 0
        };
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
    checkAllFileSuccess(){
        let businessPhotoSuccess = OSSUtil.checkFileSuccess(this.state.licensePic);
        let aptitudePhotoSuccess = OSSUtil.checkFileSuccess(this.state.provePic);
        let idCardPhotoFrontSuccess = OSSUtil.checkFileSuccess(this.state.IDCarPic1);
        let idCardPhotoBackSuccess = OSSUtil.checkFileSuccess(this.state.IDCarPic2);
        let logoImageUrlSuccess = OSSUtil.checkFileSuccess(this.state.LogoImageUrl);
        if (businessPhotoSuccess && aptitudePhotoSuccess && idCardPhotoFrontSuccess
            && idCardPhotoBackSuccess && logoImageUrlSuccess) {
            this.submitMerchant();
        }
    },
    androidImageSuccess(imageList){
        let tempBusinessPhoto = this.state.licensePic;
        let tempAptitudePhoto = this.state.provePic;
        let tempIdCardPhotoFront = this.state.IDCarPic1;
        let tempIdCardPhotoBack = this.state.IDCarPic2;
        let tempLogoImageUrl = this.state.LogoImageUrl;
        for (let i = 0; i < imageList.length; i++) {
            if (imageList[i].FileType == 'businessPhoto') {
                tempBusinessPhoto = OSSUtil.setFileSuccess(imageList[i], tempBusinessPhoto);
            }
            else if (imageList[i].FileType == 'aptitudePhoto') {
                tempAptitudePhoto = OSSUtil.setFileSuccess(imageList[i], tempAptitudePhoto);
            }
            else if (imageList[i].FileType == 'idCardPhotoFront') {
                tempIdCardPhotoFront = OSSUtil.setFileSuccess(imageList[i], tempIdCardPhotoFront);
            }
            else if (imageList[i].FileType == 'idCardPhotoBack') {
                tempIdCardPhotoBack = OSSUtil.setFileSuccess(imageList[i], tempIdCardPhotoBack);
            }
            else if (imageList[i].FileType == 'logoImageUrl') {
                tempIdCardPhotoBack = OSSUtil.setFileSuccess(imageList[i], tempLogoImageUrl);
            }
        }
        this.state.licensePic = tempBusinessPhoto;
        this.state.provePic = tempAptitudePhoto;
        this.state.IDCarPic1 = tempIdCardPhotoFront;
        this.state.IDCarPic2 = tempIdCardPhotoBack;
        this.state.LogoImageUrl = tempLogoImageUrl;
        this.submitMerchant();
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
            StorageUtil.getStorageItem(StorageUtil.CopmanyInfo, function (error, result) {
                if (result) {
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
                            this.state.provePic.push(v);
                        }.bind(this));
                    }
                    if (compmanyObj.logoImageUrl)
                        this.state.LogoImageUrl.push(compmanyObj.logoImageUrl);
                    this.setState(this.state);
                }
            }.bind(this));
            this.getCopmanyInfo();
        });
    },
    getCopmanyInfoSuccess(result){
        if (result.message) {
            StorageUtil.setStorageItem(StorageUtil.CopmanyInfo, result.message);
        }
    },
    getCopmanyInfo(){
        this.props.sendPostJSON(
            {
                url: ConfigUtil.netWorkApi.getCopmany,
                success: (responseText)=>this.getCopmanyInfoSuccess(responseText)
            }
        );
    },
    showSelectDataReturn(id, value, tag)
    {
        if (tag == 'area') {
            this.state.isShowSelectArea = 0;
            this.state.copmanyInfo.countyCode = id;
            this.state.copmanyInfo.location = value;
        }
        else if (tag == 'merchantType') {
            this.state.isShowSelectMerchantType = 0;
            this.state.copmanyInfo.businessTypeCode = id;
            this.state.copmanyInfo.businessTypeName = value;
        }
        this.setState(this.state);
    },
    userInput(text, tag){
        if (tag == 'address')
            this.state.copmanyInfo.address = text;
        else if (tag == 'businessNumber')
            this.state.copmanyInfo.businessLicenseNumber = text;
        else if (tag == 'juridicalPersonName')
            this.state.copmanyInfo.legalPersonName = text;
        else if (tag == 'juridicalPersonPhone')
            this.state.copmanyInfo.legalPersonMobilePhone = text;
        else if (tag == 'juridicalPersonIDCard')
            this.state.copmanyInfo.legalPersonIdentityCardNumber = text;
        else if (tag == 'contactPerson')
            this.state.copmanyInfo.contactPerson = text;
        this.setState(this.state);
    },
    setScrollViewTo(){
        this.refs.scrollView.scrollTo({x: 0, y: 0});
    },
    selectAreaHandler(){
        this.state.isShowSelectArea = 1;
        this.setState(this.state);
    },
    selectMerchantTypeHandler(){
        this.state.isShowSelectMerchantType = 1;
        this.setState(this.state);
    },
    saveInfo(){
        this.refs['merchantMain'].closeKeyboard();
        if (this.state.copmanyInfo.address.trim().length == 0) {
            Util.AlertMessage(ConfigUtil.InnerText.addressValidate);
            return;
        }
        else if (this.state.copmanyInfo.businessLicenseNumber.trim().length == 0) {
            Util.AlertMessage(ConfigUtil.InnerText.businessNumberPlaceholder);
            return;
        }
        else if (this.state.copmanyInfo.contactPerson.trim().length == 0) {
            Util.AlertMessage(ConfigUtil.InnerText.contactPersonError);
            return;
        }
        else if (!Util.Vailidate.checkMobileNumber(this.state.copmanyInfo.legalPersonMobilePhone)) {
            Util.AlertMessage(ConfigUtil.InnerText.juridicalPersonPhoneError);
            return;
        }
        else if (this.state.copmanyInfo.legalPersonName.trim().length == 0) {
            Util.AlertMessage(ConfigUtil.InnerText.juridicalPersonNamePlaceholder);
            return;
        }
        else if (!Util.Vailidate.checkIDCard(this.state.copmanyInfo.legalPersonIdentityCardNumber)) {
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
    getUserSelectPhotoList(){
        let uploadList = [];
        OSSUtil.setUserSelectPhoto(uploadList, this.state.licensePic, 'businessPhoto');
        OSSUtil.setUserSelectPhoto(uploadList, this.state.provePic, 'aptitudePhoto');
        OSSUtil.setUserSelectPhoto(uploadList, this.state.IDCarPic1, 'idCardPhotoFront');
        OSSUtil.setUserSelectPhoto(uploadList, this.state.IDCarPic2, 'idCardPhotoBack');
        OSSUtil.setUserSelectPhoto(uploadList, this.state.LogoImageUrl, 'logoImageUrl');
        return uploadList;
    },
    copmanyInfoSuccess(responseText){
        if (responseText.code == 200) {
            this.props.maskViewHandler(false);
            StorageUtil.setStorageItem(StorageUtil.CopmanyInfo, responseText.message);
            Util.AlertMessage(ConfigUtil.InnerText.submitSuccess);
        }
        this.props.jumpPop();
        this.props.callBack();
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
    getItemFile(itemFile){

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
        let postCopmanyInfo = this.state.copmanyInfo;
        postCopmanyInfo.licensePic = licensePic;
        postCopmanyInfo.IDCarPic1 = IDCarPic1;
        postCopmanyInfo.IDCarPic2 = IDCarPic2;
        postCopmanyInfo.provePic = provePic;
        postCopmanyInfo.LogoImageUrl = LogoImageUrl;
        this.props.sendPostJSON({
            url: ConfigUtil.netWorkApi.updateCopmany,
            body: JSON.stringify(postCopmanyInfo),
            success: (responseText)=>this.submitSuccess(responseText)
        });
    },
    startUpload(){
        let uplpadOSSFile = this.getUserSelectPhotoList();
        if (uplpadOSSFile.length > 0)
            this.props.uploadFileHandler({data: uplpadOSSFile, callBack: this.uploadFileSuccess});
        else {
            this.submitMerchant();
        }
    },
    render(){
        let actionBarProp = {
            actionName: ConfigUtil.InnerText.businessInfo
        };
        if (this.state.copmanyInfo.isManager) {
            if (this.state.isShowSelectArea == 0
                && this.state.isShowSelectMerchantType == 0) {
                actionBarProp.actionBarRightProp = {
                    click: ()=>this.saveInfo(),
                    text: ConfigUtil.InnerText.buttonSubmit
                };
            }
        }
        if (this.state.isShowSelectArea == 0
            && this.state.isShowSelectMerchantType == 0) {
            actionBarProp.isDefaultBack = this.props.jumpPop;
        }
        else {
            actionBarProp.actionBarLeftProp = {
                image: (
                    <Image style={{height:15,width:9,marginLeft:10}} source={require('../../images/left_back.png')}/>),
                click: function () {
                    this.state.isShowSelectArea = this.state.isShowSelectMerchantType = 0;
                    this.setState(this.state);
                }.bind(this)
            };
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
                commonType: 3,
                companyInfo: this.state.copmanyInfo,
                selectAreaHandler: this.selectAreaHandler,
                selectMerchantTypeHandler: this.selectMerchantTypeHandler,
                userInput: this.userInput,
                licensePic: this.state.licensePic,
                IDCarPic1: this.state.IDCarPic1,
                IDCarPic2: this.state.IDCarPic2,
                LogoImageUrl: this.state.LogoImageUrl,
                provePic: this.state.provePic,
                deleteSelectPhone: this.deleteSelectPhone,
                selectPhotoHandler: this.props.selectPhotoHandler,
                selectPhotoSuccess: this.selectPhotoSuccess
            };
            showMainView = <MerchantMain ref="merchantMain" {...merchantMainProps} />;
        }
        return (
            <View style={StyleUtil.basicBackgroundColor}>
                <ActionBar {...actionBarProp} />
                <ScrollView ref="scrollView" style={styles.scrollStyle} automaticallyAdjustContentInsets={false}
                            showsVerticalScrollIndicator={true}>
                    {showMainView}
                    <View style={styles.submitButton}/>
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
module.exports = EditMerchant;