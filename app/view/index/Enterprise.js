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
var ConfigUtil = require('../../utils/ConfigUtil');
var StyleUtil = require('../../utils/StyleUtil');
var Campaign = require('../Campaign');
var Enterprise = React.createClass({
    render(){
        return (
            <View style={StyleUtil.basicBackgroundColor}>
                <TouchableHighlight onPress={()=>this.props.jumpPushPage(Campaign,'campaign',null,{campaignID:'1'})}
                                    underlayColor={'transparent'}>
                    <Image style={styles.campaignImage} source={require('../../images/campaign1.png')}/>
                </TouchableHighlight>
                <View style={styles.campaignList}>
                    <View style={styles.campaignListTitle}>
                        <Text allowFontScaling={false} style={StyleUtil.FormFontLeftStyle}>{ConfigUtil.InnerText.campaignRecommend}</Text>
                    </View>
                    <View style={StyleUtil.breakLongLineItem}/>
                    <View>
                        <View style={styles.campaignListBody}>
                            <TouchableHighlight underlayColor={'transparent'}
                                                onPress={()=>this.props.jumpPushPage(Campaign,'campaign',null,{campaignID:'2'})}>
                                <View style={styles.campaignItem}>
                                    <View style={styles.campaignItemLeft}>
                                        <Image style={styles.campaignItemImage}
                                               source={require('../../images/campaigninfo.png')}/>
                                    </View>
                                    <View style={styles.campaignItemRight}>
                                        <View>
                                            <Text allowFontScaling={false} style={styles.campaignItemName}>{'下午茶'}</Text>
                                            <Text allowFontScaling={false} style={styles.campaignItemTime}>{'2016/03/07'}</Text>
                                        </View>
                                        <View style={styles.campaignItemContext}>
                                            <Text allowFontScaling={false} style={styles.campaignItemContextText}
                                                  numberOfLines={2}>{'下班后的时间和假日，你都是怎样替自己安排节目，让压抑许久的神经可以舒缓些呢？'}</Text></View>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        </View>
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
    campaignList: {
        marginTop: 10,
        backgroundColor: '#fff'
    },
    campaignListTitle: {
        height: 44,
        marginLeft: 10,
        justifyContent: 'center',
    },
    campaignItem: {
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row'
    },
    campaignItemImage: {
        width: 82,
        height: 68
    },
    campaignItemLeft: {
        flexDirection: 'column',
        flex: 3
    },
    campaignItemRight: {
        flexDirection: 'column',
        flex: 7
    },
    campaignItemName: {
        marginTop: 10,
        fontSize: 13
    },
    campaignItemTime: {
        position: 'absolute',
        right: 10,
        top: 10,
        fontSize: 11,
        color: '#a7a7a7'
    },
    campaignItemContext: {
        marginTop: 10,
        marginRight: 10
    },
    campaignItemContextText: {
        fontSize: 11,
        color: '#a7a7a7'
    }

});
module.exports = Enterprise;