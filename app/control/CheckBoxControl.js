/**
 * Created by lemon on 16/2/20.
 */
'use strict';
var React = require('react-native');

var {
    StyleSheet,
    View,
    Image,
    TouchableHighlight
    } = React;
var CheckBoxControl = React.createClass({
    render(){
        let checkBox = this.props.isChecked ?
            <Image source={require('../images/checked.png')} style={styles.checkImage}/> :
            <Image source={require('../images/check.png')} style={styles.checkImage}/>;
        return (
            <View>
                <TouchableHighlight underlayColor={'transparent'} onPress={()=>this.props.setCheckBox()}>
                    {checkBox}
                </TouchableHighlight>
            </View>
        );
    }
});
var styles = StyleSheet.create({
    checkImage: {
        marginLeft: 5,
        height: 15,
        width: 15
    }
});
module.exports = CheckBoxControl;