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
    TextInput
    } = React;
var StyleUtil=require('../utils/StyleUtil');
var Util=require('../utils/Util');
var TextInputRowControl=React.createClass({
    getInitialState(){
        return {
            controlID:Util.GUID()
        };
    },
    clearFocus(){
        this.refs[this.state.controlID].blur();
    },
    render(){
        return (
            <View style={StyleUtil.textInputRow}>
                <TextInput ref={this.state.controlID} style={StyleUtil.textInputRowContent} {...this.props.textInputProp} />
            </View>
        );
    }
});
module.exports=TextInputRowControl;