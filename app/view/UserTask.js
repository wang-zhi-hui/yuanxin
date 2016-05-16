'use strict';
var React = require('react-native');

var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    TouchableHighlight
    } = React;
var ActionBar = require('../control/ActionBar');
var StyleUtil = require('../utils/StyleUtil');
var ConfigUtil = require('../utils/ConfigUtil');
var UserTaskInfo = require('./UserTaskInfo');
var UserTaskRow = React.createClass({
    render(){
        return (
            <View>
                <TouchableHighlight underlayColor='transparent'
                                    onPress={()=>this.props.jumpPushPage(UserTaskInfo,'usertaskinfo',null,{id:this.props.id})}>
                    <View style={styles.taskRow}>
                        <View style={styles.taskTitle}>
                            <Text allowFontScaling={false} numberOfLines={1} style={StyleUtil.FormFontLeftStyle}>{this.props.title}</Text>
                        </View>
                        <View style={styles.taskTime}>
                            <Text allowFontScaling={false} style={StyleUtil.FormFontLeftStyle}>{this.props.time}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
                <View style={StyleUtil.breakLineItem}/>
            </View>
        );
    }
});
var UserTask = React.createClass({
    render(){
        let taskList = [];
        taskList.push({id: 1, title: '远洋国际中心2016年水果会', time: '2016-03-18'});
        taskList.push({id: 2, title: '远洋国际中心培训', time: '2016-03-20'});
        let taskRows = [];
        taskList.forEach(function (v) {
            taskRows.push(<UserTaskRow key={v.title} {...v} jumpPushPage={this.props.jumpPushPage}/>);
        }.bind(this));
        let actionBar = {
            actionName: '待办列表',
            isDefaultBack: this.props.jumpPop
        };
        return (
            <View style={StyleUtil.basicBackgroundColor}>
                <ActionBar {...actionBar} />
                <View style={styles.main}>
                    {taskRows}
                </View>
            </View>
        );
    }
});
var styles = StyleSheet.create({
    main: {
        backgroundColor: '#fff',
        marginTop: 10
    },
    taskRow: {
        marginLeft: 10,
        marginRight: 10,
        height: 44,
        flexDirection: 'row'
    },
    taskTitle: {
        justifyContent: 'center',
        flexDirection: 'column',
        flex: 7
    },
    taskTime: {
        marginLeft: 10,
        alignItems: 'flex-end',
        justifyContent: 'center',
        flex: 3,
        flexDirection: 'column'
    }
});
module.exports = UserTask;