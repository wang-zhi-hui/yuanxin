'use strict';
var React = require('react-native');

var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View
    } = React;
var FormRowInput = require('../../control/FormRowInput');
var AttrUtil = require('../../utils/AttrUtil');
var ConfigUtil = require('../../utils/ConfigUtil');
var StyleUtil = require('../../utils/StyleUtil');
var SelectPhotoControl = require('../../control/SelectPhotoControl');
var PersonalCompanyMain = React.createClass({
    getFormRowInfo(type)
    {
        let formInfo = {
            isType: this.props.commonType == 1 ? 1 : 3,
            formRow: [styles.merchantRowHeigh, styles.merchantRow],
            itemLeft: styles.merchantItemLeft,
            itemRight: styles.merchantItemRight
        };
        if (type == 'realName') {
            formInfo.inputProps = AttrUtil.textInput.basicTextInput();
            formInfo.leftText = ConfigUtil.InnerText.realName;
            formInfo.inputProps.placeholder = ConfigUtil.InnerText.realNamePlaceholder;
            formInfo.value = this.props.personalCompanyInfo.contactPerson || '';
            formInfo.inputProps.maxLength = 50;
        }
        else if (type == 'mobileNumber') {
            formInfo.inputProps = AttrUtil.textInput.phoneTextInput();
            formInfo.leftText = ConfigUtil.InnerText.mobileNumber;
            formInfo.inputProps.placeholder = ConfigUtil.InnerText.mobileNumberPlaceholder;
            formInfo.value = this.props.personalCompanyInfo.legalPersonMobilePhone || '';
        }
        formInfo.inputProps.onChangeText = (text)=>this.props.userInput(text, type);
        return formInfo;
    },
    closeKeyboard(){
        this.refs['txtRealName'].clearFocus();
        this.refs['txtMobileNumber'].clearFocus();
    },
    render(){
        let idCardPhotoFront = {
            selectPhoto: this.props.idCarPic1,
            maxCount: 1,
            title: ConfigUtil.InnerText.personalIdCardPhotoFront,
            selectTag: 'idCarPic1',
            deleteSelectPhone: this.props.deleteSelectPhone,
            selectPhotoHandler: this.props.selectPhotoHandler,
            selectPhotoSuccess: this.props.selectPhotoSuccess
        };
        let idCardPhotoBack = {
            selectPhoto: this.props.idCarPic2,
            maxCount: 1,
            title: ConfigUtil.InnerText.personalIdCardPhotoBack,
            selectTag: 'idCarPic2',
            deleteSelectPhone: this.props.deleteSelectPhone,
            selectPhotoHandler: this.props.selectPhotoHandler,
            selectPhotoSuccess: this.props.selectPhotoSuccess
        };
        if (this.props.commonType != 1) {
            idCardPhotoFront.isReader = true;
            idCardPhotoBack.isReader = true;
        }
        let realNameProp = this.getFormRowInfo('realName');
        let mobileNumberProp = this.getFormRowInfo('mobileNumber');
        return (
            <View style={styles.main}>
                <View style={styles.merchantInfo}>
                    <FormRowInput ref='txtRealName' {...realNameProp} />
                    <View style={StyleUtil.breakLineItem}/>
                    <FormRowInput ref='txtMobileNumber' {...mobileNumberProp} />
                </View>
                <View style={StyleUtil.breakBoldLineItem}/>
                <SelectPhotoControl {...idCardPhotoFront} />
                <View style={StyleUtil.breakBoldLineItem}/>
                <SelectPhotoControl {...idCardPhotoBack} />
            </View>
        );
    }
});
var styles = StyleSheet.create({
    main: {
        marginTop: 10
    },
    merchantInfo: {
        backgroundColor: '#fff'
    },
    merchantRowHeigh: {
        marginTop: 1,
        height: 44,
        justifyContent: 'center'
    },
    merchantRow: {
        flex: 1,
        flexDirection: 'row'
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
    phoneList: {
        marginTop: 10
    }
});
module.exports = PersonalCompanyMain;