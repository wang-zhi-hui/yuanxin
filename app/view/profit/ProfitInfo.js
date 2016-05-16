/**
 * Created by lemon on 16/5/10.
 */
'use strict';
var React = require('react-native');

var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableHighlight
    } = React;
var ConfigUtil = require('../../utils/ConfigUtil');
var ProfitInfo = React.createClass({
    render(){
        return (
            <Image style={styles.top} source={require('../../images/index_top.jpg')}>
                <View style={styles.lastIncome}>
                    <Text allowFontScaling={false} style={styles.incomeText}>10,000</Text>
                    <Text allowFontScaling={false}
                          style={styles.lastIncomeText}>{ConfigUtil.InnerText.lastIncomeText}</Text>
                </View>
                <View style={styles.breakLine}/>
                <View style={styles.incomeInfo}>
                    <View style={styles.incomeItem}>
                        <Text allowFontScaling={false} style={styles.incomeItemMoney}>2</Text>
                        <Text allowFontScaling={false}
                              style={styles.incomeItemText}>{ConfigUtil.InnerText.orderCountText}</Text>
                    </View>
                    <View style={styles.portraitBreakLine}/>
                    <View style={styles.incomeItem}>
                        <Text allowFontScaling={false} style={styles.incomeItemMoney}>10,000</Text>
                        <Text allowFontScaling={false}
                              style={styles.incomeItemText}>{ConfigUtil.InnerText.monthMoneyText}</Text>
                    </View>
                    <View style={styles.portraitBreakLine}/>
                    <View style={styles.incomeItem}>
                        <Text allowFontScaling={false} style={styles.incomeItemMoney}>10,000</Text>
                        <Text allowFontScaling={false}
                              style={styles.incomeItemText}>{ConfigUtil.InnerText.sumMoneyText}</Text>
                    </View>
                </View>
            </Image>
        );
    }
});
var styles=StyleSheet.create({
    top: {
        height: 213,
        width: Dimensions.get('window').width
    },
    lastIncome: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 158
    },
    incomeText: {
        fontSize: 28,
        color: '#fff',
        backgroundColor: 'transparent'
    },
    lastIncomeText: {
        fontSize: 11,
        color: '#fff',
        marginTop: 20,
        backgroundColor: 'transparent'
    },
    breakLine: {
        backgroundColor: '#f37d20',
        height: 1
    },
    incomeInfo: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 53,
        flexDirection: 'row'
    },
    incomeItem: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column'
    },
    incomeItemMoney: {
        fontSize: 18,
        color: '#fff',
        backgroundColor: 'transparent'
    },
    incomeItemText: {
        marginTop: 10,
        fontSize: 11,
        color: '#fff',
        backgroundColor: 'transparent'
    },
    portraitBreakLine: {
        backgroundColor: '#f37d20',
        width: 1,
        height: 28
    }
});
module.exports = ProfitInfo;