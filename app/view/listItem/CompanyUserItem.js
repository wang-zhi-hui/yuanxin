'use strict';
var React = require('react-native');

var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Alert
    } = React;
var StyleUtil = require('../../utils/StyleUtil');
var ImageControl = require('../../control/ImageControl');
var CompanyUserItem = React.createClass({
    render(){
        let userHeadPhotoProp = {
            imageStyle: StyleUtil.userHeadPhotoList
        };
        if (this.props.userInfo.logoImageUrl)
            userHeadPhotoProp.imageUri = this.props.userInfo.logoImageUrl;
        else
            userHeadPhotoProp.imageObj = require('../../images/user_photo_default.png');
        return (
            <View style={styles.main}>
                <TouchableHighlight underlayColor={'transparent'} onLongPress={() => Alert.alert(
            '确认要删除?',
            '',
            [
              {text: '取消', onPress: () => console.log('Cancel Pressed!')},
              {text: '确认', onPress: () => this.props._delete(this.props.userInfo)},
            ]
          )}>
                    <View style={styles.campaignItem}>
                        <View style={styles.campaignItemLeft}>
                            <ImageControl {...userHeadPhotoProp}/>
                        </View>
                        <View style={styles.campaignItemRight}>
                            <Text style={StyleUtil.FormFontLeftStyle} numberOfLines={1}
                                  allowFontScaling={false}>{this.props.userInfo.userName || this.props.userInfo.loginName}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
                <View style={StyleUtil.breakLineItem}/>
            </View>
        );
    }
});
var styles = StyleSheet.create({
    main: {
        backgroundColor: '#fff'
    },
    campaignItem: {
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row'
    },
    campaignItemLeft: {
        height: 55,
        flexDirection: 'column',
        flex: 2
    },
    campaignItemRight: {
        height: 55,
        flexDirection: 'column',
        flex: 8,
        justifyContent: 'center',
    },
    campaignItemRightText: {
        justifyContent: 'center'
    }
});
module.exports = CompanyUserItem;