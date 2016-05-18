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
        this.props.tabList.forEach((v, i, a)=> {
            let itemStyle = [];
            itemStyle.push(styles.tabNavigatorItem);
            itemStyle.push({height: this.props.itemHiehgt || 25});
            itemStyle.push({borderColor: this.props.borderColor || '#fff'});
            if (v.selected)
                itemStyle.push({backgroundColor: this.props.itemSelectedColor || '#fff'});
            else
                itemStyle.push({backgroundColor: this.props.itemColor || '#333333'});
            if (i == 0)
                itemStyle.push(styles.tabNavigatorItemIndex);
            else
                itemStyle.push({marginLeft: -1});
            if (i == a.length - 1)
                itemStyle.push(styles.tabNavigatorItemLast);
            let textColor = {};
            if (v.selected)
                textColor.color = this.props.textSelectedColor || null;
            else
                textColor.color = this.props.textColor || '#fff';
            textColor.fontSize = this.props.fontSize || 13;
            dataList.push(
                <TouchableHighlight key={Util.GUID()} style={itemStyle}
                                    onPress={v.click?v.click:null}
                                    underlayColor={this.props.textSelectedColor||'#fff'}>
                    <Text allowFontScaling={false}
                          style={textColor}>
                        {v.text}
                    </Text>
                </TouchableHighlight>);
        });
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
    tabNavigatorItemIndex: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
    tabNavigatorItemLast: {
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
    },
    tabNavigatorItem: {
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        borderWidth: 1
    }
});
module.exports = TabNavigator;