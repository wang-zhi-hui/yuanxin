'use strict';
var React = require('react-native');

var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Platform
    } = React;
var FormRowInput = require('../../control/FormRowInput');
var AttrUtil = require('../../utils/AttrUtil');
var ConfigUtil = require('../../utils/ConfigUtil');
var StyleUtil = require('../../utils/StyleUtil');
var SelectPhotoControl = require('../../control/SelectPhotoControl');
var SelectDataInfo = require('../../control/SelectDataInfo');
var MerchantMain = React.createClass({
    closeKeyboard(){
        if (this.props.commonType != 3)
            this.refs['txtMerchantName'].clearFocus();
        this.refs['txtAddress'].clearFocus();
        this.refs['txtBusinessNumber'].clearFocus();
        this.refs['txtPersonNam'].clearFocus();
        this.refs['txtPersonPhone'].clearFocus();
        this.refs['txtContactPerson'].clearFocus();
        this.refs['txtPersonIDCard'].clearFocus();
    },
    getFormRowInfo(type)
    {
        let formInfo = {
            isType: this.props.commonType == 2 ? 3 : this.props.commonType == 3 ? 1 : this.props.commonType,
            formRow: [styles.merchantRowHeigh, styles.merchantRow],
            itemLeft: styles.merchantItemLeft,
            itemRight: styles.merchantItemRight,
            inputProps: AttrUtil.textInput.basicTextInput(),
            setTextInputOffset: this.props.setTextInputOffset,
            _onFocus: this.props._onFocus
        };
        if (type == 'number') {
            formInfo.leftText = ConfigUtil.InnerText.companyNumber;
            formInfo.inputProps.placeholder = ConfigUtil.InnerText.businessNumberPlaceholder;
            formInfo.value = this.props.companyInfo.number || '';
            formInfo.inputProps.maxLength = 50;

        }
        if (type == 'merchantName') {
            if (this.props.commonType == 3)
                formInfo.isType = 3;
            formInfo.leftText = ConfigUtil.InnerText.merchantName;
            formInfo.inputProps.placeholder = ConfigUtil.InnerText.merchantNamePlaceholder;
            formInfo.value = this.props.companyInfo.cnName || '';
            formInfo.inputProps.maxLength = 50;
            formInfo.controlTag = 'merchantName';
        }
        else if (type == 'businessNumber') {
            formInfo.leftText = ConfigUtil.InnerText.businessNumber;
            formInfo.inputProps.placeholder = ConfigUtil.InnerText.businessNumberPlaceholder;
            formInfo.value = this.props.companyInfo.businessLicenseNumber || '';
            formInfo.inputProps.maxLength = 50;
            formInfo.controlTag = 'businessNumber';
        }
        else if (type == 'address') {
            formInfo.leftText = ConfigUtil.InnerText.address;
            formInfo.inputProps.placeholder = ConfigUtil.InnerText.addressPlaceholder;
            formInfo.value = this.props.companyInfo.address || '';
            formInfo.inputProps.maxLength = 200;
            formInfo.controlTag = 'address';
        }
        else if (type == 'juridicalPersonName') {
            formInfo.leftText = ConfigUtil.InnerText.juridicalPersonName;
            formInfo.inputProps.placeholder = ConfigUtil.InnerText.juridicalPersonNamePlaceholder;
            formInfo.value = this.props.companyInfo.legalPersonName || '';
            formInfo.inputProps.maxLength = 50;
            formInfo.controlTag = 'juridicalPersonName';
        }
        else if (type == 'juridicalPersonPhone') {
            formInfo.leftText = ConfigUtil.InnerText.juridicalPersonPhone;
            formInfo.inputProps.placeholder = ConfigUtil.InnerText.juridicalPersonPhonePlaceholder;
            formInfo.inputProps.maxLength = 11;
            formInfo.value = this.props.companyInfo.legalPersonMobilePhone || '';
            formInfo.controlTag = 'juridicalPersonPhone';
        }
        else if (type == 'juridicalPersonIDCard') {
            formInfo.leftText = ConfigUtil.InnerText.juridicalPersonIDCard;
            formInfo.inputProps.placeholder = ConfigUtil.InnerText.juridicalPersonIDCardPlaceholder;
            formInfo.value = this.props.companyInfo.legalPersonIdentityCardNumber || '';
            formInfo.inputProps.maxLength = 18;
            formInfo.controlTag = 'juridicalPersonIDCard';
        }
        else if (type == 'contactPerson') {
            formInfo.leftText = ConfigUtil.InnerText.contactPerson;
            formInfo.inputProps.placeholder = ConfigUtil.InnerText.contactPersonError;
            formInfo.value = this.props.companyInfo.contactPerson || '';
            formInfo.inputProps.maxLength = 50;
            formInfo.controlTag = 'contactPerson';
        }
        else if (type == 'location') {
            formInfo.leftText = ConfigUtil.InnerText.selectArea;
            formInfo.value = this.props.companyInfo.location || '';
        }
        else if (type == 'businessTypeName') {
            formInfo.leftText = ConfigUtil.InnerText.selectMerchantType;
            formInfo.value = this.props.companyInfo.businessTypeName || '';
        }
        formInfo.inputProps.onChangeText = (text)=>this.props.userInput(text, type);
        return formInfo;
    },
    render(){
        let companyNumberForm = this.getFormRowInfo('number');
        let merchantNameForm = this.getFormRowInfo('merchantName');
        let businessNumberForm = this.getFormRowInfo('businessNumber');
        let addressForm = this.getFormRowInfo('address');
        let juridicalPersonNameForm = this.getFormRowInfo('juridicalPersonName');
        let juridicalPersonPhoneForm = this.getFormRowInfo('juridicalPersonPhone');
        let juridicalPersonIDCardForm = this.getFormRowInfo('juridicalPersonIDCard');
        let contactPersonForm = this.getFormRowInfo('contactPerson');
        let selectAreaForm, selectMerchantTypeForm;
        if (this.props.commonType != 2) {
            selectAreaForm = {
                isType: 2,
                formRow: [styles.merchantRowHeigh, styles.merchantRow],
                itemLeft: styles.merchantItemLeft,
                leftText: ConfigUtil.InnerText.selectArea,
                inputProps: {
                    userClick: ()=>this.props.selectAreaHandler(),
                    buttonStyle: styles.merchantItemRight,
                    buttonTextStyle: [styles.selectAreaText, StyleUtil.FromFontSizeInput],
                    buttonText: this.props.companyInfo.location || ConfigUtil.InnerText.selectAreaPlaceholder
                }
            };
            selectMerchantTypeForm = {
                isType: 2,
                formRow: [styles.merchantRowHeigh, styles.merchantRow],
                itemLeft: styles.merchantItemLeft,
                leftText: ConfigUtil.InnerText.selectMerchantType,
                inputProps: {
                    userClick: ()=>this.props.selectMerchantTypeHandler(),
                    buttonStyle: styles.merchantItemRight,
                    buttonTextStyle: [styles.selectAreaText, StyleUtil.FromFontSizeInput],
                    buttonText: this.props.companyInfo.businessTypeName || ConfigUtil.InnerText.selectMerchantTypePlaceholder
                }
            };
        }
        else {
            selectAreaForm = this.getFormRowInfo('location');
            selectMerchantTypeForm = this.getFormRowInfo('businessTypeName');
        }
        let businessPhoto = {
            selectPhoto: this.props.licensePic,
            maxCount: 1,
            title: ConfigUtil.InnerText.businessPhoto,
            selectTag: 'businessPhoto',
            deleteSelectPhone: this.props.deleteSelectPhone,
            selectPhotoHandler: this.props.selectPhotoHandler,
            selectPhotoSuccess: this.props.selectPhotoSuccess
        };

        let aptitudePhotoProp = {
            selectPhoto: this.props.provePic,
            maxCount: 3,
            title: ConfigUtil.InnerText.aptitudePhoto,
            selectTag: 'aptitudePhoto',
            deleteSelectPhone: this.props.deleteSelectPhone,
            selectPhotoHandler: this.props.selectPhotoHandler,
            selectPhotoSuccess: this.props.selectPhotoSuccess
        };

        let idCardPhotoFrontProp = {
            selectPhoto: this.props.IDCarPic1,
            maxCount: 1,
            title: ConfigUtil.InnerText.idCardPhotoFront,
            selectTag: 'idCardPhotoFront',
            deleteSelectPhone: this.props.deleteSelectPhone,
            selectPhotoHandler: this.props.selectPhotoHandler,
            selectPhotoSuccess: this.props.selectPhotoSuccess
        };
        let idCardPhotoBackProp = {
            selectPhoto: this.props.IDCarPic2,
            maxCount: 1,
            title: ConfigUtil.InnerText.idCardPhotoBack,
            selectTag: 'idCardPhotoBack',
            deleteSelectPhone: this.props.deleteSelectPhone,
            selectPhotoHandler: this.props.selectPhotoHandler,
            selectPhotoSuccess: this.props.selectPhotoSuccess
        };
        let logoImageUrlProps = {
            selectPhoto: this.props.LogoImageUrl,
            maxCount: 1,
            title: ConfigUtil.InnerText.companyLogo,
            selectTag: 'logoImageUrl',
            deleteSelectPhone: this.props.deleteSelectPhone,
            selectPhotoHandler: this.props.selectPhotoHandler,
            selectPhotoSuccess: this.props.selectPhotoSuccess
        };
        if (this.props.commonType == 2) {
            logoImageUrlProps.isReader = businessPhoto.isReader =
                aptitudePhotoProp.isReader = idCardPhotoFrontProp.isReader =
                    idCardPhotoBackProp.isReader = true;
        }
        let companyNumberView = null;
        if (this.props.commonType == 2) {
            companyNumberView = (
                <View>
                    <FormRowInput {...companyNumberForm} />
                    <View style={StyleUtil.breakLineItem}/>
                </View>
            );
        }
        return (
            <View>
                <View style={styles.merchantInfo}>
                    <View style={[styles.merchantTitle,styles.merchantRowHeigh]}>
                        <Text allowFontScaling={false}
                              style={StyleUtil.FormTitleBold}>{ConfigUtil.InnerText.merchantInfo}</Text>
                    </View>
                    <View style={StyleUtil.breakLongLineItem}/>
                    <FormRowInput ref='txtMerchantName' {...merchantNameForm} />
                    <View style={StyleUtil.breakLineItem}/>
                    {companyNumberView}
                    <FormRowInput {...selectAreaForm} />
                    <View style={StyleUtil.breakLineItem}/>
                    <FormRowInput ref='txtAddress' {...addressForm} />
                    <View style={StyleUtil.breakLineItem}/>
                    <FormRowInput {...selectMerchantTypeForm} />
                    <View style={StyleUtil.breakLineItem}/>
                    <FormRowInput ref='txtBusinessNumber' {...businessNumberForm} />
                    <View style={StyleUtil.breakLineItem}/>
                    <FormRowInput ref="txtContactPerson" {...contactPersonForm} />
                    <View style={StyleUtil.breakLineItem}/>
                    <FormRowInput ref='txtPersonPhone' {...juridicalPersonPhoneForm} />
                </View>
                <View style={StyleUtil.breakBoldLineItem}/>
                <SelectPhotoControl {...logoImageUrlProps} />
                <View style={StyleUtil.breakBoldLineItem}/>
                <SelectPhotoControl {...businessPhoto} />
                <View style={StyleUtil.breakBoldLineItem}/>
                <SelectPhotoControl {...aptitudePhotoProp} />
                <View style={StyleUtil.breakBoldLineItem}/>
                <View style={styles.merchantInfo}>
                    <View style={[styles.merchantTitle,styles.merchantRowHeigh]}>
                        <Text allowFontScaling={false}
                              style={StyleUtil.FormTitleBold}>{ConfigUtil.InnerText.juridicalPerson}</Text>
                    </View>
                    <View style={StyleUtil.breakLongLineItem}/>
                    <FormRowInput ref='txtPersonNam' {...juridicalPersonNameForm} />
                    <View style={StyleUtil.breakLineItem}/>
                    <FormRowInput ref='txtPersonIDCard' {...juridicalPersonIDCardForm} />
                </View>
                <View style={StyleUtil.breakBoldLineItem}/>
                <SelectPhotoControl {...idCardPhotoFrontProp} />
                <View style={StyleUtil.breakBoldLineItem}/>
                <SelectPhotoControl {...idCardPhotoBackProp} />
                <View style={styles.submitButton}/>
            </View>
        );
    }
});
var styles = StyleSheet.create({
    merchantInfo: {
        marginTop: 10,
        backgroundColor: '#ffffff'
    },
    merchantTitle: {
        marginLeft: 10
    },
    merchantRowHeigh: {
        marginTop: 1,
        height: 44,
        justifyContent: 'center'
    },
    merchantRowBigHeigh: {
        height: 50,
        justifyContent: 'center'
    },
    breakLine: {
        backgroundColor: '#efeff4',
        height: 1
    },
    breakLineItem: {
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#efeff4',
        height: 1
    },
    merchantRow: {
        flex: 1,
        flexDirection: 'row'
    },
    merchantRowMargin: {
        marginLeft: 10,
        marginRight: 10
    },
    merchantItemLeft: {
        height: 44,
        justifyContent: 'center',
        marginLeft: 10,
        flex: 3.5,
        flexDirection: 'column'
    },
    merchantItemRight: {
        height: 44,
        flex: 6.5,
        justifyContent: 'center',
        flexDirection: 'column'
    },
    selectAreaText: {
        marginLeft: Platform.OS == 'ios' ? 0 : 3,
        color: '#a7a7a7'
    },
    addressInput: {
        height: 44
    },
    submitButton: {
        height: 40
    }
});
module.exports = MerchantMain;