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
    Dimensions,
    Image
    } = React;
var ActionBar = require('../control/ActionBar');
var ConfigUtil = require('../utils/ConfigUtil');
var StyleUtil = require('../utils/StyleUtil');
var Campaign = React.createClass({
    render(){
        let actionBar = {
            isDefaultBack: this.props.jumpPop,
            actionName: ConfigUtil.InnerText.campaignInfo
        };
        let campaignInfo = {};
        let campaignLogo;
        if (this.props.params.campaignID == '1') {
            campaignInfo.title = '水果会';
            campaignInfo.time = '2016/03/07 11:03至 2016/03/10 10:03';
            campaignInfo.address = '北京市 朝阳区远洋国际中心A座2006';
            campaignInfo.info = '下班后的时间和假日，你都是怎样替自己安排节目，让压抑许久的神经可以舒缓些呢？';
            campaignLogo = <Image style={styles.campaignImage} source={require('../images/campaign1.png')}/>;
        }
        else {
            campaignInfo.title = '远洋国际中心2016年春季出游';
            campaignInfo.time = '2016/03/09 15:03至 2016/03/09 16:30';
            campaignInfo.address = '北京市 朝阳区远洋国际中心A座2006';
            campaignInfo.info = '下班后的时间和假日，你都是怎样替自己安排节目，让压抑许久的神经可以舒缓些呢？';
            campaignLogo = <Image style={styles.campaignImage} source={require('../images/campaign2.png')}/>;
        }
        return (
            <View style={StyleUtil.basicBackgroundColor}>
                <ActionBar {...actionBar} />
                {campaignLogo}
                <View style={styles.campaignBlock}>
                    <View style={styles.campaignRow}>
                        <Text allowFontScaling={false} style={StyleUtil.FormFontLeftStyle}>{campaignInfo.title}</Text>
                    </View>
                    <View style={StyleUtil.breakLongLineItem}/>
                    <View style={styles.campaignRow}>
                        <Text allowFontScaling={false} style={StyleUtil.FormFontLeftStyle}>{campaignInfo.time}</Text>
                    </View>
                    <View style={StyleUtil.breakLongLineItem}/>
                    <View style={styles.campaignRow}>
                        <Text allowFontScaling={false} style={StyleUtil.FormFontLeftStyle}>{campaignInfo.address}</Text>
                    </View>
                    <View style={StyleUtil.breakLongLineItem}/>
                </View>
                <View style={styles.campaignBlock}>
                    <View style={styles.campaignRow}>
                        <Text allowFontScaling={false} style={StyleUtil.FormFontLeftStyle}>{ConfigUtil.InnerText.campaignInfo}</Text>
                    </View>
                    <View style={StyleUtil.breakLongLineItem}/>
                    <View style={styles.campaignContext}>
                        <Text allowFontScaling={false} style={StyleUtil.FormFontLeftStyle}>{campaignInfo.info}</Text>
                    </View>
                </View>
            </View>
        );
    }
});
var styles = StyleSheet.create({
    campaignImage: {
        width: Dimensions.get('window').width,
        height: 160
    },
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
module.exports = Campaign;