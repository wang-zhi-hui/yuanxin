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
var StyleUtil=require('../utils/StyleUtil');
var TouchRowTextControl=React.createClass({
    render(){
        return (
            <TouchableHighlight onPress={this.props.userTouch()} underlayColor={'transparent'}>
                <View style={StyleUtil.lineRow}>
                    <View style={this.props.leftStyle}>
                        <Text allowFontScaling={false} style={StyleUtil.FormFontLeftStyle}>{this.props.leftText}</Text>
                    </View>
                    <View style={StyleUtil.lineRowRight}>
                        <Text allowFontScaling={false} style={StyleUtil.FormFontRightStyle}>{this.props.title}</Text>
                        <Image style={StyleUtil.arrowButtonRight} source={require('../images/arrow_right.png')} />
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
});
module.exports=TouchRowTextControl;