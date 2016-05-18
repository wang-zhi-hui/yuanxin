/**
 * Created by lemon on 16/5/12.
 */
'use strict';
import React,{
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';
import Util from '../utils/Util';
var YuanXinSelectItem = React.createClass({
    render(){
        let dataList = [];
        let menuLine;
        this.props.tabList.forEach((v, i, a)=> {
            if (i == 0 || i % this.props.lineCount == 0)
                menuLine = [];
            let itemTextStyle = {};
            itemTextStyle.fontSize = this.props.fontSize || 13;
            let itemStyle = [styles.selectItem, styles.selectItemBorder];
            itemStyle.push({height: this.props.itemHeight || 25});
            itemStyle.push({borderColor: this.props.borderColor || '#fff', marginRight: this.props.spacing || 10});
            if (v.selected) {
                itemStyle.push({backgroundColor: this.props.itemSelectedColor || null});
                itemTextStyle.color = this.props.textSelectedColor || null;
            }
            else {
                itemStyle.push({backgroundColor: this.props.itemColor || null});
                itemTextStyle.color = this.props.textColor || null;
            }
            menuLine.push(
                <TouchableHighlight key={Util.GUID()} style={itemStyle}
                                    onPress={v.click?v.click:null}
                                    underlayColor={this.props.textSelectedColor||'transparent'}>
                    <Text allowFontScaling={false} style={itemTextStyle}>{v.text}</Text>
                </TouchableHighlight>
            );
            if (i != this.props.tabList.length - 1) {
                if ((i + 1) % this.props.lineCount == 0) {
                    dataList.push(
                        <View key={Util.GUID()} style={[styles.selectRow,{marginTop:dataList.length==0?0:10}]}>
                            {menuLine}
                        </View>
                    );
                }
            }
            else {
                if (this.props.tabList.length >= this.props.lineCount &&
                    this.props.lineCount % this.props.tabList.length == 0) {
                    dataList.push(
                        <View key={Util.GUID()} style={[styles.selectRow,{marginTop:dataList.length==0?0:10}]}>
                            {menuLine}
                        </View>
                    );
                }
                else {
                    let differCount = this.props.tabList.length > this.props.lineCount ?
                    this.props.lineCount - this.props.tabList.length % this.props.lineCount :
                    this.props.lineCount - this.props.tabList.length;
                    for (let j = 0; j < differCount; j++) {
                        menuLine.push(
                            <View key={Util.GUID()}
                                  style={[styles.selectItem,{marginRight: this.props.spacing || 10}]}/>);
                    }
                    dataList.push(
                        <View key={Util.GUID()} style={[styles.selectRow,{marginTop:dataList.length==0?0:10}]}>
                            {menuLine}
                        </View>
                    );
                }
            }
        });
        return (
            <View>
                {dataList}
            </View>
        );
    }
});
var styles = StyleSheet.create({
    selectRow: {
        flexDirection: 'row'
    },
    selectItemBorder: {
        borderWidth: 1
    },
    selectItem: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column'
    }
});
module.exports = YuanXinSelectItem;