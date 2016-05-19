'use strict';
var React = require('react-native');

var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableHighlight
    } = React;
var ConfigUtil = require('../../utils/ConfigUtil');
var UserTask = require('../UserTask');
var WebModule = require('../WebModule');
var Util = require('../../utils/Util');
var TestWebView = require('../TestWebView');
var ProfitInfo = require('../profit/ProfitInfo');
var MenuGroup = require('../../control/MenuGroup');
var Index = React.createClass({
    render(){
        let menuProps = {
            menuList: [
                {
                    text: ConfigUtil.InnerText.task,
                    icon: require('../../images/task.png'),
                    click: ()=>this.props.jumpPushPage(UserTask, 'usertask')
                },
                {
                    text: ConfigUtil.InnerText.releaseSource,
                    icon: require('../../images/release_source.png'),
                    click: ()=>this.props.jumpPushPage(WebModule, 'webmodule', null, {url: ConfigUtil.htmlUrl.releaseSource})
                },
                {
                    text: ConfigUtil.InnerText.releaseSource,
                    icon: require('../../images/release_source.png'),
                    click: ()=>this.props.jumpPushPage(TestWebView, 'webmodule', null, {url: ConfigUtil.htmlUrl.releaseSource})
                }
            ],
            lineCount: 4
        };
        return (
            <View style={styles.mainIndex}>
                <ProfitInfo />
                <MenuGroup {...menuProps} />
            </View>
        );
    }
});
var styles = StyleSheet.create({
    mainIndex: {
        flex: 1,
        backgroundColor: '#fff'
    }
});
module.exports = Index;