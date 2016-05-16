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
                            <Text allowFontScaling={false} numberOfLines={1}
                                  style={StyleUtil.FormFontLeftStyle}>{this.props.title}</Text>
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
var UserTaskList = React.createClass({
    getInitialState(){
        return {
            selectTag: '进行中',
            tabList: [
                {
                    text: '进行中',
                    selected: true,
                    click:()=>this.setSelectTag('进行中')
                },
                {
                    text: '已完成',
                    click:()=>this.setSelectTag('已完成')
                }
            ]
        };
    },
    setSelectTag(tag){
        this.state.selectTag = tag;
        for (let i = 0; i < this.state.tabList.length; i++) {
            if (this.state.tabList[i].text == tag)
                this.state.tabList[i].selected = true;
            else
                this.state.tabList[i].selected = false;
        }
        this.setState(this.state);
    },
    render(){
        let actionBar = {
            actionName: ConfigUtil.InnerText.myOrders,
            isDefaultBack: this.props.jumpPop,
            titleTab: {
                tabList: this.state.tabList
            }
        };
        let taskList = [];
        if (this.state.selectTag == '进行中') {
            taskList.push({id: 1, title: '远洋国际中心2016年水果会', time: '2016-03-18'});
            taskList.push({id: 2, title: '远洋国际中心培训', time: '2016-03-20'});
        }
        else {
            taskList.push({id: 3, title: '远洋国际中心2016年春季出游', time: '2016-02-10'});
        }
        let taskRows = [];
        taskList.forEach(v=> {
            taskRows.push(<UserTaskRow key={v.title} {...v} jumpPushPage={this.props.jumpPushPage}/>);
        });
        return (
            <View style={StyleUtil.basicBackgroundColor}>
                <ActionBar {...actionBar} />
                <View style={styles.mainTask}>
                    {taskRows}
                </View>
            </View>
        );
    }
});
var styles = StyleSheet.create({
    topMenu: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff'
    },
    topMenuItem: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 44,
        flex: 5,
        flexDirection: 'column'
    },
    topMenuText: {
        fontSize: 15
    },
    topMenuTextSelected: {
        color: '#ff5001'
    },
    portraitBreakLine: {
        backgroundColor: '#ff5001',
        width: 1,
        height: 44
    },
    mainTask: {
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
module.exports = UserTaskList;