/**
 * Created by lemon on 16/3/1.
 */
'use strict';
var React = require('react-native');

var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Image,
    Platform
    } = React;
var StyleUtil = require('../utils/StyleUtil');
var SelectPhotoUtil = require('../utils/SelectPhotoUtil');
var ImageControl = require('./ImageControl');
var Util = require('../utils/Util');
var PhotoItemControl = React.createClass({
    render(){
        let deleteButton = null;
        if (!this.props.isReader || this.props.isReader == undefined) {
            deleteButton = (
                <TouchableHighlight style={styles.deleteTouchPhoto} underlayColor={'transparent'}
                                    onPress={()=>this.props.deletePhotoHandler(this.props.imageInfo.url,this.props.selectTag)}>
                    <Image style={styles.deletePhoto} source={require('../images/delete.png')}/>
                </TouchableHighlight>
            );
        }
        let showImageUrl;
        if (Util.Vailidate.checkUrlHead(this.props.imageInfo.url)) {
            showImageUrl = this.props.imageInfo.url;
        }
        else {
            if (Platform.OS == 'android') {
                showImageUrl = 'file://' + this.props.imageInfo.url;
            }
            else {
                showImageUrl = 'data:image/png;base64,' + this.props.imageInfo.base;
            }
        }
        let imageControlProp = {
            imageUri: showImageUrl,
            imageStyle: styles.selectPhoneItem,
            control: deleteButton
        };
        return <ImageControl {...imageControlProp} />;
    }
});
var SelectPhotoControl = React.createClass({
    selectPhotoHandler(){
        if (this.props.maxCount > this.props.selectPhoto.length) {
            this.props.selectPhotoHandler({
                count: (this.props.maxCount - this.props.selectPhoto.length),
                tag: this.props.selectTag,
                callBack: this.props.selectPhotoSuccess
            });
        }
    },
    deletePhotoHandler(url, tag){
        this.props.deleteSelectPhone(url, tag);
    },
    render(){
        let selectList = [];
        this.props.selectPhoto.forEach((v, i, a)=> {
            let photoInfo = {
                imageInfo: v,
                isReader: this.props.isReader,
                deletePhotoHandler: this.deletePhotoHandler,
                selectTag: this.props.selectTag
            };
            selectList.push(<PhotoItemControl key={v.url+i} {...photoInfo} />);
        });
        let selectPhotoButton = null;
        if (!this.props.isReader)    //非只读状态
        {
            if (this.props.maxCount > this.props.selectPhoto.length) {
                selectPhotoButton = (
                    <TouchableHighlight underlayColor={'transparent'} onPress={this.selectPhotoHandler}>
                        <Image style={styles.selectPhoneItem} source={require('../images/add.png')}/>
                    </TouchableHighlight>
                );
            }
        }
        return (
            <View>
                <View style={styles.photoTitle}>
                    <View style={styles.photoTitleText}>
                        <Text allowFontScaling={false} style={StyleUtil.FormTitleBold}>{this.props.title}</Text>
                    </View>
                </View>
                <View style={StyleUtil.breakLongLineItem}/>
                <View style={styles.photoSelectRow}>
                    <View style={styles.photoItem}>
                        {selectList}
                        {selectPhotoButton}
                    </View>
                </View>
            </View>
        );
    }
});
var styles = StyleSheet.create({
    photoTitle: {
        backgroundColor: '#ffffff'
    },
    photoTitleText: {
        marginLeft: 10,
        marginTop: 1,
        height: 44,
        justifyContent: 'center'
    },
    photoSelectRow: {
        backgroundColor: '#ffffff',
        height: 140,
        justifyContent: 'center'
    },
    photoItem: {
        flexDirection: 'row',
        height: 70
    },
    selectPhoneItem: {
        marginLeft: 10,
        marginRight: 10,
        height: 60,
        width: 60
    },
    deleteTouchPhoto: {
        position: 'absolute',
        right: 1,
        top: 1
    },
    deletePhoto: {
        height: 16,
        width: 16
    }
});
module.exports = SelectPhotoControl;