'use strict';
var React = require('react-native');

var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View
    } = React;
var Message=React.createClass({
    render(){
        return (
            <Text allowFontScaling={false}>{'消息'}</Text>
        );
    }
});
module.exports = Message;