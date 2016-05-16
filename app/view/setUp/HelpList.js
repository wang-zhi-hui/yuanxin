'use strict';
var React = require('react-native');

var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    InteractionManager
    } = React;
var ActionBar = require('../../control/ActionBar');
var StyleUtil = require('../../utils/StyleUtil');
var ConfigUtil = require('../../utils/ConfigUtil');
var Util = require('../../utils/Util');
var TouchRowControl = require('../../control/TouchRowControl');
var HelpInfo = require('./HelpInfo');
var HelpList = React.createClass({
    getInitialState(){
        return {
            list: []
        };
    },
    componentDidMount(){
        InteractionManager.runAfterInteractions(() => {
            let list = [];
            list.push({id: 1, title: '1.商家注册要求？'});
            list.push({id: 2, title: '2.忘记登录密码如何处理？'});
            list.push({id: 3, title: '3.个人用户能否注册远薪商家端？'});
            this.state.list = list;
            this.setState(this.state);
        });
    },
    render(){
        let actionBarProp = {
            actionName: ConfigUtil.InnerText.help,
            isDefaultBack: this.props.jumpPop
        };
        let listView = [];
        this.state.list.forEach(v=> {
            listView.push(
                <View key={v.id}>
                    <TouchRowControl text={v.title}
                                     userTouch={()=>this.props.jumpPushPage(HelpInfo,'helpinfo',null,{id:v.id})}/>
                    <View style={StyleUtil.breakLineItem}/>
                </View>);
        });
        return (
            <View style={StyleUtil.basicBackgroundColor}>
                <ActionBar {...actionBarProp} />
                <View style={styles.main}>{listView}</View>
            </View>
        );
    }
});
var styles = StyleSheet.create({
    main: {
        backgroundColor: '#fff',
        marginTop: 10
    }
});
module.exports = HelpList;