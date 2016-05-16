/**
 * Created by lemon on 16/3/1.
 */
'use strict';
var React = require('react-native');

var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight
    } = React;
var StyleUtil = require('../utils/StyleUtil');
var TouchRowControl = React.createClass({
    render(){
        var arrowRightView = null;
        if (this.props.hideRight) {
            arrowRightView = null;
        }
        else {
            arrowRightView =
                <Image style={StyleUtil.userOperationItemArrow} source={require('../images/arrow_right.png')}/>;
        }
        return (
            <TouchableHighlight underlayColor={'transparent'} onPress={this.props.userTouch||null}>
                <View style={StyleUtil.userOperationItem}>
                    <View style={StyleUtil.userOperationItemLeft}>
                        <Text allowFontScaling={false} numberOfLines={1}
                              style={StyleUtil.FormFontLeftStyle}>{this.props.text}</Text>
                    </View>
                    <View style={StyleUtil.userOperationItemRight}>{arrowRightView}</View>
                </View>
            </TouchableHighlight>
        );
    }
});
module.exports = TouchRowControl;
