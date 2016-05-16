'use strict';
var React = require('react-native');

var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Dimensions,
    Image
    } = React;
var ConfigUtil = require('../../utils/ConfigUtil');
var StyleUtil = require('../../utils/StyleUtil');
var UserTaskInfo = require('../UserTaskInfo');
var WebModule = require('../WebModule');
var Partner = require('../../landpartner/Partner');
var Util = require('../../utils/Util');
var MenuGroup = require('../../control/MenuGroup');
var BusinessManage = React.createClass({
    render(){
        let menuProps = {
            menuList: [
                {
                    text: ConfigUtil.InnerText.releaseSource,
                    icon: require('../../images/release_source.png'),
                    click: ()=>this.props.jumpPushPage(WebModule, 'webmodule', null, {url: ConfigUtil.htmlUrl.releaseSource})
                },
                {
                    text: ConfigUtil.InnerText.sourceList,
                    icon: require('../../images/sourcelist.png'),
                    click: ()=>this.props.jumpPushPage(WebModule, 'webmodule', null, {url: ConfigUtil.htmlUrl.sourceList})
                },
                {
                    text: ConfigUtil.InnerText.landInfo,
                    icon: require('../../images/land.png'),
                    click: ()=>Util.AlertMessage('敬请期待')
                }
            ],
            lineCount: 4
        };
        return (
            <View style={styles.mainIndex}>
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
module.exports = BusinessManage;