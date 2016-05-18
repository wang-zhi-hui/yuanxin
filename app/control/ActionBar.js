/**
 * Created by lemon on 16/3/1.
 */
'use strict';
var React = require('react-native');

var {
    Image,
    Text,
    View,
    TouchableHighlight,
    Platform
    } = React;
var hoverActionColor = 'transparent';
var StyleUtil = require('../utils/StyleUtil');
var TabNavigator = require('./TabNavigator');
var ActionBar = React.createClass({
    backClick(){
        this.props.isDefaultBack();
    },
    render(){
        let leftButton = null;
        let leftButtonClick = null;
        let rightButtonClick = null;
        if (this.props.isDefaultBack) {
            leftButtonClick = this.backClick;
            leftButton = (
                <View style={StyleUtil.ActionBarLeftTouch}>
                    <Image style={StyleUtil.ActionBarLeftBackImage} source={require('../images/left_back.png')}/>
                </View>
            );
        }
        else {
            if (this.props.actionBarLeftProp != null) {
                leftButtonClick = this.props.actionBarLeftProp.click;
                leftButton = (
                    <View style={StyleUtil.ActionBarLeftTouch}>
                        {this.props.actionBarLeftProp.image}
                        <Text allowFontScaling={false}
                              style={StyleUtil.ActionBarLeftText}>{this.props.actionBarLeftProp.text || null}</Text>
                    </View>
                );
            }
        }
        let rightButton = null;
        if (this.props.actionBarRightProp) {
            rightButtonClick = this.props.actionBarRightProp.click;
            if (this.props.actionBarRightProp.image) {
                rightButton = (
                    <View style={this.props.rightTouch}>
                        {this.props.actionBarRightProp.image}
                    </View>
                );
            }
            else {
                rightButton = (
                    <View style={StyleUtil.ActionBarRightTouch}>
                        <Text
                            allowFontScaling={false}
                            style={StyleUtil.ActionBarRightText}>{this.props.actionBarRightProp.text}</Text></View>
                );
            }
        }
        var iosBar = null;
        if (Platform.OS == 'ios') {
            iosBar = <View style={StyleUtil.ActionBarIOSTop}/>
        }
        let actionTitle = null;
        if (this.props.titleTab) {
            actionTitle = (
                <View style={StyleUtil.ActionBarTitle}>
                    <TabNavigator {...this.props.titleTab} />
                </View>
            );
        }
        else {
            actionTitle = (
                <TouchableHighlight onPress={this.props.click||null} underlayColor={hoverActionColor}
                                    style={StyleUtil.ActionBarTitle}>
                    <Text allowFontScaling={false} style={StyleUtil.ActionBarTitleText}>{this.props.actionName}</Text>
                </TouchableHighlight>
            );
        }
        return (
            <View>
                {iosBar}
                <View style={StyleUtil.ActionBar}>
                    <TouchableHighlight style={StyleUtil.ActionBarLeft} underlayColor={hoverActionColor}
                                        onPress={leftButtonClick}><View>{leftButton}</View></TouchableHighlight>
                    {actionTitle}
                    <TouchableHighlight underlayColor={hoverActionColor}
                                        onPress={rightButtonClick}
                                        style={StyleUtil.ActionBarRight}><View>{rightButton}</View></TouchableHighlight>
                </View>
            </View>
        );
    }
});

module.exports = ActionBar;