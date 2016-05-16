/**
 * Created by lemon on 16/4/30.
 */
'use strict';
var React = require('react-native');

var {
    View
    } = React;
var StyleUtil = require('../utils/StyleUtil');
var ButtonControl = require('./ButtonControl');
var ConfigUtil = require('../utils/ConfigUtil');
var ListTopSearchControl = React.createClass({
    render(){
        let buttonSearch = {
            buttonStyle: StyleUtil.SearchStyle,
            buttonTextStyle: StyleUtil.SubmitTextStyle,
            buttonText: ConfigUtil.InnerText.buttonSearch
        };
        return (
            <View style={styles.searchUserMain}>
                <View style={styles.searchUser}>
                    <View style={styles.searchLeft}>
                        <TextInput returnKeyType="search"
                                   placeholder={ConfigUtil.InnerText.searchCompanyUser}
                                   style={[StyleUtil.FromFontSizeInput,StyleUtil.FormTextInput]}/>
                    </View>
                    <View style={styles.searchRight}>
                        <ButtonControl {...buttonSearch} />
                    </View>
                </View>
                <View style={StyleUtil.breakLongLineItem}/>
            </View>
        );
    }
});
module.exports = ListTopSearchControl;