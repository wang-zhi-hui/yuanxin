'use strict';
var React = require('react-native');

var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    TextInput,
    } = React;
var StyleUtil = require('../utils/StyleUtil');
var ConfigUtil = require('../utils/ConfigUtil');
var ActionBar = require('../control/ActionBar');
var WebModule = require('./WebModule');
var TouchRowControl = require('../control/TouchRowControl');
var ReleaseList=React.createClass({
    render(){
        let actionBarProp = {
            actionName: ConfigUtil.InnerText.release,
            isDefaultBack: this.props.jumpPop
        };
        return (
            <View style={StyleUtil.basicBackgroundColor}>
                <ActionBar {...actionBarProp} />
                <View style={styles.userOperationBlock}>
                    <TouchRowControl text={ConfigUtil.InnerText.releaseSource}
                                     userTouch={()=>this.props.jumpPushPage(WebModule,'webmodule',null,{url:ConfigUtil.htmlUrl.releaseSource})}/>
                </View>
            </View>
        );
    }
});
var styles=StyleSheet.create({
    userOperationBlock: {
        marginTop: 10,
        backgroundColor: '#fff'
    }
});
module.exports=ReleaseList;