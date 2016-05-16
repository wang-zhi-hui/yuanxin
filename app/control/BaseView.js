'use strict';
var React = require('react-native');

var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View
    } = React;
var BaseView=React.createClass({
    render(){
        return <View>{this.props.view}</View>;
    }
});
module.exports=BaseView;