/**
 * Created by lemon on 16/5/10.
 */
'use strict';
import React,{
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Image
} from 'react-native';
import Util from '../utils/Util';
var MenuGroup = React.createClass({
    render(){
        let menuList = [];
        let menuLine;
        this.props.menuList.forEach((v, i, a)=> {
            if (i == 0 || i % this.props.lineCount == 0)
                menuLine = [];
            menuLine.push(
                <TouchableHighlight key={Util.GUID()} style={styles.contentItem}
                                    underlayColor={this.props.clickColor||'transparent'}
                                    onPress={v.click}>
                    <View style={styles.contentItem}>
                        <Image style={styles.contentItemImage} source={v.icon}/>
                        <Text allowFontScaling={false}
                              style={styles.contentItemText}>{v.text}</Text>
                    </View>
                </TouchableHighlight>);
            if (i != a.length - 1) {
                if ((i + 1) % this.props.lineCount == 0) {
                    menuList.push(
                        <View key={Util.GUID()} style={styles.content}>
                            {menuLine}
                        </View>
                    );
                }
            }
            else {
                if (a.length >= this.props.lineCount && this.props.lineCount % a.length == 0) {
                    menuList.push(
                        <View key={Util.GUID()} style={styles.content}>
                            {menuLine}
                        </View>
                    );
                }
                else {
                    let differCount = a.length > this.props.lineCount ?
                    this.props.lineCount - a.length % this.props.lineCount : this.props.lineCount - a.length;
                    for (let j = 0; j < differCount; j++) {
                        menuLine.push(
                            <View key={Util.GUID()} style={styles.contentItem}>
                                <View style={styles.contentItem}/>
                            </View>);
                    }
                    menuList.push(
                        <View key={Util.GUID()} style={styles.content}>
                            {menuLine}
                        </View>
                    );
                }
            }
        });
        return <View>{menuList}</View>;
    }
});
var styles = StyleSheet.create({
    content: {
        marginTop: 10,
        flexDirection: 'row'
    },
    contentItem: {
        alignItems: 'center',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center'
    },
    contentItemImage: {
        height: 24,
        width: 24
    },
    contentItemText: {
        marginTop: 10,
        fontSize: 11
    }
});
module.exports = MenuGroup;