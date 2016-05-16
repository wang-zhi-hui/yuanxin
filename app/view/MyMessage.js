'use strict';
var React = require('react-native');

var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View
    } = React;
var ActionBar = require('../control/ActionBar');
var StyleUtil = require('../utils/StyleUtil');
var ConfigUtil = require('../utils/ConfigUtil');
var MyMessage = React.createClass({
    render(){
        let actionBar = {
            actionName: ConfigUtil.InnerText.myMessage,
            isDefaultBack: this.props.jumpPop
        };
        return (
            <View style={StyleUtil.basicBackgroundColor}>
                <ActionBar {...actionBar} />
                <View style={styles.main}><Text allowFontScaling={false}>{'暂无消息'}</Text></View>
            </View>
        );
    }
});
var styles = StyleSheet.create({
    main: {
        marginTop: 10,
        height: 44,
        justifyContent: 'center',
        backgroundColor: '#fff',
        alignItems: 'center'
    }
});
module.exports = MyMessage;