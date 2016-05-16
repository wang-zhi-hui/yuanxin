/**
 * Created by lemon on 16/3/1.
 */
'use strict';
var React = require('react-native');

var {
    Text,
    View,
    TextInput
    } = React;
var StyleUtil = require('../utils/StyleUtil');
var ButtonControl = require('./ButtonControl');
var Util = require('../utils/Util');
var FormRowInput = React.createClass({
    getInitialState(){
        return {
            controlID: Util.GUID()
        };
    },
    clearFocus(){
        this.refs[this.state.controlID].blur();
    },
    render(){
        let showFromInput;
        if (this.props.isType == 1)    //输入框
        {
            let _onFocus = this.props._onFocus ? (event) => this.props._onFocus(event, this.props.controlTag) : null;
            showFromInput = (
                <View style={this.props.formRow} onLayout={this.props.setTextInputOffset ? (event) => this.props.setTextInputOffset(event, this.props.controlTag) : null}>
                    <View style={this.props.itemLeft}>
                        <Text allowFontScaling={false} style={StyleUtil.FormFontLeftStyle}>{this.props.leftText}</Text>
                    </View>
                    <View style={this.props.itemRight}>
                        <TextInput onFocus={_onFocus} ref={this.state.controlID} value={this.props.value||''}
                                   style={[StyleUtil.FromFontSizeInput,StyleUtil.FormTextInput,this.props.textStyle||null]} {...this.props.inputProps} />
                    </View>
                </View>
            );
        }
        else if (this.props.isType == 2)  //选择项
        {
            showFromInput = (
                <View style={this.props.formRow}>
                    <View style={this.props.itemLeft}>
                        <Text allowFontScaling={false} style={StyleUtil.FormFontLeftStyle}>{this.props.leftText}</Text></View>
                    <ButtonControl {...this.props.inputProps} />
                </View>
            );
        }
        else if (this.props.isType == 3)   //只读项
        {
            showFromInput = (
                <View style={this.props.formRow}>
                    <View style={this.props.itemLeft}><Text allowFontScaling={false}
                                                            style={StyleUtil.FormFontLeftStyle}>{this.props.leftText}</Text></View>
                    <View style={this.props.itemRight}><Text numberOfLines={2} allowFontScaling={false}
                                                             style={StyleUtil.FormFontRightStyle}>{this.props.value}</Text></View>
                </View>
            );
        }
        return showFromInput;
    }
});
module.exports = FormRowInput;