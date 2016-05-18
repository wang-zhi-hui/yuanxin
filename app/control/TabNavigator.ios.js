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
        let itemLine = [styles.tabNavigatorItemLine, {backgroundColor: this.props.borderColor || '#fff'}];
        itemLine.push({height: this.props.itemHiehgt || 25});
        this.props.tabList.forEach((v, i, a)=> {
            let itemStyle = [];
            itemStyle.push(styles.tabNavigatorItem);
            itemStyle.push({height: this.props.itemHiehgt || 25});
            if (v.selected)
                itemStyle.push({backgroundColor: this.props.itemSelectedColor || '#fff'});
            else
                itemStyle.push({backgroundColor: this.props.itemColor || '#333333'});
            let textColor = {};
            if (v.selected)
                textColor.color = this.props.textSelectedColor || null;
            else
                textColor.color = this.props.textColor || '#fff';
            let itemTextStyle = [textColor];
            itemTextStyle.push({fontSize: this.props.fontSize || 13});
            dataList.push(
                <TouchableHighlight key={Util.GUID()} style={itemStyle}
                                    onPress={v.click?v.click:null}
                                    underlayColor={this.props.textSelectedColor||'#fff'}>
                    <Text allowFontScaling={false}
                          style={itemTextStyle}>
                        {v.text}
                    </Text>
                </TouchableHighlight>);
            if (i != a.length - 1)
                dataList.push(<View key={Util.GUID()}
                                    style={itemLine}/>);
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
        flexDirection: 'row',
        borderRadius: 5,
        borderWidth: 1,
        overflow: 'hidden'
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
        flex: 1,
        flexDirection: 'column'
    }
});
module.exports = TabNavigator;