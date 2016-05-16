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
            if (this.props.tabList[i].selected)
                itemStyle.push({backgroundColor: this.props.itemSelectedColor || '#fff'});
            else
                itemStyle.push({backgroundColor: this.props.itemColor || '#333333'});
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
            if (i != this.props.tabList.length - 1)
                dataList.push(<View key={Util.GUID()}
                                    style={[styles.tabNavigatorItemLine,{backgroundColor:this.props.borderColor||'#fff'}]}/>);
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
        flexDirection: 'row',
        borderRadius: 5,
        borderWidth: 1,
        overflow: 'hidden'
    },
    tabNavigatorText: {
        fontSize: 13
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
        flexDirection: 'column'
    }
});
module.exports = TabNavigator;