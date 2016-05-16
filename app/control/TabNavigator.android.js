/**
 * Created by lemon on 16/5/8.
 */
'use strict';
import React,{
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';
import Util from '../utils/Util';
var TabNavigator = React.createClass({
    render(){
        let dataList = [];
        for (let i = 0; i < this.props.tabList.length; i++) {
            let itemStyle = [];
            itemStyle.push(styles.tabNavigatorItem);
            itemStyle.push({borderColor: this.props.borderColor || '#fff'});
            if (this.props.tabList[i].selected)
                itemStyle.push({backgroundColor: this.props.itemSelectedColor || '#fff'});
            else
                itemStyle.push({backgroundColor: this.props.itemColor || '#333333'});
            if (i == 0)
                itemStyle.push(styles.tabNavigatorItemIndex);
            else
                itemStyle.push({marginLeft: -1});
            if (i == this.props.tabList.length - 1)
                itemStyle.push(styles.tabNavigatorItemLast);
            let textColor = {};
            if (this.props.tabList[i].selected)
                textColor.color = this.props.textSelectedColor || null;
            else
                textColor.color = this.props.textColor || '#fff';
            dataList.push(
                <TouchableHighlight key={Util.GUID()} style={itemStyle}
                                    onPress={this.props.tabList[i].click?this.props.tabList[i].click:null}
                                    underlayColor={this.props.textSelectedColor||'#fff'}>
                    <Text allowFontScaling={false}
                          style={[styles.tabNavigatorText,textColor]}>
                        {this.props.tabList[i].text}
                    </Text>
                </TouchableHighlight>);
        }
        return (
            <View style={[styles.tabNavigator,{borderColor: this.props.borderColor||'#fff'}]}>
                {dataList}
            </View>
        );
    }
});
var styles = StyleSheet.create({
    tabNavigator: {
        flexDirection: 'row'
    },
    tabNavigatorText: {
        fontSize: 13
    },
    tabNavigatorItemIndex: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
    tabNavigatorItemLast: {
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
    },
    tabNavigatorItemLine: {
        height: 25,
        width: 1
    },
    tabNavigatorItem: {
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 25,
        flex: 1,
        flexDirection: 'column',
        borderWidth: 1
    }
});
module.exports = TabNavigator;