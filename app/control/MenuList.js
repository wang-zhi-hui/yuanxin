/**
 * Created by lemon on 16/5/11.
 */
'use strict';
import React,{
    StyleSheet,
    View,
} from 'react-native';
import TouchRowControl from './TouchRowControl';
import StyleUtil from '../utils/StyleUtil';
import Util from '../utils/Util';
var MenuList = React.createClass({
    render(){
        let menuList = [];
        this.props.menuList.forEach((v, i, a)=> {
            let breackLine = i != a.length - 1 ? <View style={StyleUtil.breakLineItem}/> : null;
            menuList.push(
                <View key={Util.GUID()}>
                    <TouchRowControl text={v.text}
                                     userTouch={v.click}/>
                    {breackLine}
                </View>
            );
        });
        return (
            <View style={styles.userOperationBlock}>
                {menuList}
            </View>
        );
    }
});
var styles = StyleSheet.create({
    userOperationBlock: {
        backgroundColor: '#fff'
    }
});
module.exports = MenuList;