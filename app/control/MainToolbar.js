/**
 * Created by lemon on 16/2/20.
 */
'use strict';
var React = require('react-native');

var {
    Text,
    View,
    TouchableHighlight,
    Image
    } = React;
var StyleUtil = require('../utils/StyleUtil');
var hoverActionColor = 'transparent';

var MainToolbar = React.createClass({
    onActionClick(actionValue){
        this.props.selectAction(actionValue);
    },
    render: function () {
        var menuList = [];
        this.props.bottomMenus.forEach((item, index, array)=> {
            let selectImage = item.isSelected ? item.iconSelected : item.icon;
            menuList.push(
                <TouchableHighlight style={StyleUtil.touchItem} underlayColor={hoverActionColor}
                                    onPress={()=> this.onActionClick(item.value)} key={item.value}>
                    <View style={StyleUtil.menuBarItem}>
                        <Image style={StyleUtil.menuImage} source={selectImage}/>
                        <View style={StyleUtil.menuItemRow}>
                            <Text allowFontScaling={false}
                                  style={[StyleUtil.actionText,item.isSelected?StyleUtil.actionSelect:null]}>{item.text}</Text>
                        </View>
                    </View>
                </TouchableHighlight>);
        });
        return (
            <View style={StyleUtil.menuBarBottom}>
                <View style={StyleUtil.breakLongLineItem}/>
                <View style={StyleUtil.menuBar}>{menuList}</View>
            </View>
        );
    }
});
module.exports = MainToolbar;
