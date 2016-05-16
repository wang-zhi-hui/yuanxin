'use strict';
var React = require('react-native');

var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Image
    } = React;
var ActionBar = require('../control/ActionBar');
var ConfigUtil = require('../utils/ConfigUtil');
var StyleUtil = require('../utils/StyleUtil');
var UserTaskInfo = React.createClass({
    render(){
        let actionBar = {
            actionName: ConfigUtil.InnerText.userTaskInfo,
            isDefaultBack: this.props.jumpPop
        };
        let campaignInfo = {};
        if (this.props.params.id == 1) {
            campaignInfo.title = '远洋国际中心2016年水果会';
            campaignInfo.time = '2016-03-18';
            campaignInfo.address = '北京市 朝阳区远洋国际中心A座2006';
            campaignInfo.info = '下班后的时间和假日，你都是怎样替自己安排节目，让压抑许久的神经可以舒缓些呢？';
        }
        else if (this.props.params.id == 2) {
            campaignInfo.title = '远洋国际中心培训';
            campaignInfo.time = '2016-03-20';
            campaignInfo.address = '北京市 朝阳区远洋国际中心A座2006';
            campaignInfo.info = '想增加更多知识就来参加培训吧';
        }
        else {
            campaignInfo.title = '远洋国际中心2016年春季出游';
            campaignInfo.time = '2016-02-10';
            campaignInfo.address = '北京市怀柔区慕田峪长城植树';
            campaignInfo.info = '北京市怀柔区慕田峪长城植树';
        }
        return (
            <View style={StyleUtil.basicBackgroundColor}>
                <ActionBar {...actionBar} />
                <View style={styles.campaignBlock}>
                    <View style={styles.campaignRow}>
                        <Text allowFontScaling={false} style={StyleUtil.FormFontLeftStyle}>{campaignInfo.title}</Text>
                    </View>
                    <View style={StyleUtil.breakLongLineItem} />
                    <View style={styles.campaignRow}>
                        <Text allowFontScaling={false} style={StyleUtil.FormFontLeftStyle}>{campaignInfo.time}</Text>
                    </View>
                    <View style={StyleUtil.breakLongLineItem} />
                    <View style={styles.campaignRow}>
                        <Text allowFontScaling={false} style={StyleUtil.FormFontLeftStyle}>{campaignInfo.address}</Text>
                    </View>
                    <View style={StyleUtil.breakLongLineItem} />
                </View>
                <View style={styles.campaignBlock}>
                    <View style={styles.campaignRow}>
                        <Text allowFontScaling={false} style={StyleUtil.FormFontLeftStyle}>{ConfigUtil.InnerText.campaignInfo}</Text>
                    </View>
                    <View style={StyleUtil.breakLongLineItem} />
                    <View style={styles.campaignContext}>
                        <Text allowFontScaling={false} style={StyleUtil.FormFontLeftStyle}>{campaignInfo.info}</Text>
                    </View>
                </View>
            </View>
        );
    }
});
var styles = StyleSheet.create({
    campaignBlock: {
        marginTop: 10,
        backgroundColor: '#fff'
    },
    campaignRow: {
        height: 44,
        justifyContent: 'center',
        marginLeft: 10
    },
    campaignContext: {
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10
    }

});
module.exports = UserTaskInfo;