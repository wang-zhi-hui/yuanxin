/**
 * Created by lemon on 16/3/15.
 */
'use strict';
var React = require('react-native');

var {
    StyleSheet,
    Text,
    View,
    TouchableHighlight
    } = React;
var StyleUtil = require('../utils/StyleUtil');
var StorageUtil = require('../utils/StorageUtil');
var ConfigUtil = require('../utils/ConfigUtil');
var SelectDataRow = React.createClass({
    render(){
        return (
            <View>
                <TouchableHighlight underlayColor={ConfigUtil.touchColor.lineTouch}
                                    onPress={()=>this.props.returnData(this.props.itemData.ID,this.props.itemData.Name)}>
                    <View style={styles.dataRowHeigh}>
                        <Text allowFontScaling={false}
                              style={StyleUtil.FormFontLeftStyle}>{this.props.itemData.Name}</Text>
                    </View>
                </TouchableHighlight>
                <View style={StyleUtil.breakLineItem}/>
            </View>
        );
    }
});
var SelectDataInfo = React.createClass({
    getInitialState(){
        return {
            dataList: [],
            allText: [],
            allCode: [],
            selectPrentID: '',
            nowShowDataList: []
        };
    },
    returnSelectData(id, value){
        var tempNowShowDataList = this.getNowShowDataList(id);
        setTimeout(function () {
            if (tempNowShowDataList.length == 0) {
                this.state.allCode.push(id);
                this.state.allText.push(value);
                this.props.returnData(id, value, this.props.tag, this.state.allCode, this.state.allText);
            }
            else {
                this.state.allCode.push(id);
                this.state.allText.push(value);
                this.state.selectPrentID = id;
                this.state.nowShowDataList = tempNowShowDataList;
                this.setState(this.state);
                if (this.props.click)
                    setTimeout(this.props.click, 200);
            }
        }.bind(this), 50);
    },
    getNowShowDataList(selectID){
        selectID = selectID || this.state.selectPrentID;
        var tempNowShowDataList = [];
        this.state.dataList.forEach(v=> {
            if (v.PrentID == selectID)
                tempNowShowDataList.push(v);
        });
        return tempNowShowDataList;
    },
    componentDidMount(){
        StorageUtil.getStorageItem(this.props.storageKey, function (error, result) {
            var jsonDataList = JSON.parse(result);
            this.state.dataList = jsonDataList;
            this.state.dataList = this.state.dataList || [];
            this.state.nowShowDataList = this.getNowShowDataList();
            this.setState(this.state);

        }.bind(this));
    },
    render(){
        var dataRowList = [];
        this.state.nowShowDataList.forEach(v=> {
            dataRowList.push(<SelectDataRow tag={this.props.tag} key={v.ID}
                                            itemData={v}
                                            returnData={this.returnSelectData}/>);
        });
        return (
            <View style={styles.dataMain}>
                {dataRowList}
            </View>
        );
    }
});
var styles = StyleSheet.create({
    dataMain: {
        marginTop: 10,
        backgroundColor: '#fff'
    },
    dataRowHeigh: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 1,
        height: 44,
        justifyContent: 'center'
    }
});
module.exports = SelectDataInfo;