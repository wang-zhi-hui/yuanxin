/**
 * Created by lemon on 16/2/19.
 * 点击按钮
 * @author lemon
 * @param userClick点击事件
 * @param buttonStyle按钮样式
 * @param buttonTextStyle文字样式
 * @param buttonText显示文字
 */
'use strict';
var React = require('react-native');

var {
    Text,
    TouchableHighlight
    } = React;
var ButtonControl = React.createClass({
    render(){
        return (
            <TouchableHighlight style={this.props.buttonStyle||null} underlayColor={'transparent'}
                                onPress={()=>this.props.userClick()}>
                <Text allowFontScaling={false} style={this.props.buttonTextStyle||null}>{this.props.buttonText}</Text>
            </TouchableHighlight>
        );
    }
});
module.exports = ButtonControl;