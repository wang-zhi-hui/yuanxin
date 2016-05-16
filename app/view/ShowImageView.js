'use strict';
var React = require('react-native');

var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View
    } = React;
var ActionBar = require('../control/ActionBar');
var ConfigUtil = require('../utils/ConfigUtil');
var ImageControl=require('../control/ImageControl');
var ShowImageView = React.createClass({
    render(){
        let actionBarProp={
            actionName:ConfigUtil.InnerText.showImage,
            isDefaultBack:this.props.jumpPop
        };
        let imageProp={
            imageUri:this.props.params.imageUrl,
            imageStyle:{flex:1}
        };
        return (
            <View>
                <ActionBar {...actionBarProp} />
                <ImageControl {...imageProp} />
            </View>
        );
    }
});
module.exports = ShowImageView;