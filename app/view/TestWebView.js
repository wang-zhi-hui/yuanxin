'use strict';
var React = require('react-native');

var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Navigator,
    TimerMixin,
    BackAndroid,
    Platform,
    StatusBar,
    DeviceEventEmitter,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Picker,
    TouchableHighlight,
    WebView,
    BGWASH
    } = React;
var KeyboardScrollView = require('../control/KeyboardScrollView');
var Util = require('../utils/Util');
var YuanXinWebView = require('../control/YuanXinWebView');
var YuanXinNativeModule = require('../utils/YuanXinNativeModule');
var YuanXinSelectItem = require('../control/YuanXinSelectItem');
var TestWebView = React.createClass({
    getInitialState(){
        return {
            focusField: 1,
            keyboardSpace: 0
        };
    },
    _refreshToken(){
        let webviewbridge = this.refs['webviewbridge'];

        webviewbridge.sendToBridge(JSON.stringify(
            {
                type: 3,
                data: this.props.getCurrUserInfo()
            }));
    },
    onBridgeMessage: function (message) {
        console.log(message);
        let webviewbridge = this.refs['webviewbridge'];
        webviewbridge.sendToBridge('sdsd');
    },
    render () {
        let scrollTemp = (
            <KeyboardScrollView ref="keyboardView">
                <TextInput placeholder="23"/>
                <TextInput placeholder="23" style={{height:40}}/>
                <View onLayout={(event) => this.refs['keyboardView'].setTextInputOffset(event,'txt5')}>
                    <TextInput
                        onFocus={(event) => this.refs['keyboardView']._onFocus(event,'txt5')} placeholder="txt5"
                        style={{height:40}}/>
                </View>
                <TextInput placeholder="23" style={{height:40}}/>
                <TextInput placeholder="23" style={{height:40}}/>
                <TextInput placeholder="23" style={{height:40}}/>
                <TextInput placeholder="23" style={{height:40}}/>
                <TextInput placeholder="23" style={{height:40}}/>
                <TextInput placeholder="23" style={{height:40}}/>
                <View onLayout={(event) => this.refs['keyboardView'].setTextInputOffset(event,'444')}>
                    <TextInput placeholder="444" style={{height:40}}
                               onFocus={(event) => this.refs['keyboardView']._onFocus(event,'444')}/>
                </View>
                <TextInput placeholder="555" style={{height:40}}/>
                <TextInput placeholder="666" style={{height:40}}/>
                <TextInput placeholder="777" style={{height:40}}/>
                <TextInput placeholder="23" style={{height:40}}/>
                <TextInput placeholder="23" style={{height:40}}/>
                <View onLayout={(event) => this.refs['keyboardView'].setTextInputOffset(event,'txt999')}>
                    <TextInput
                        onFocus={(event) => this.refs['keyboardView']._onFocus(event,'txt999')} placeholder="txt999"
                        style={{height:40}}/></View>
                <TextInput placeholder="333" style={{height:40}}/>
                <TextInput placeholder="333" style={{height:40}}/>
                <TextInput placeholder="555" style={{height:40}}/>
                <TextInput placeholder="666" style={{height:40}}/>
                <TextInput placeholder="777" style={{height:40}}/>
                <TextInput placeholder="23" style={{height:40}}/>
                <TextInput placeholder="23" style={{height:40}}/>
                <TextInput placeholder="333" style={{height:40}}/>
                <TextInput placeholder="333" style={{height:40}}/>
                <View onLayout={(event) => this.refs['keyboardView'].setTextInputOffset(event,'txt1')}>
                    <TextInput
                        onFocus={(event) => this.refs['keyboardView']._onFocus(event,'txt1')} placeholder="txt1"
                        style={{height:40}}/></View>
                <View onLayout={(event) => this.refs['keyboardView'].setTextInputOffset(event,'txt2')}>
                    <TextInput
                        onFocus={(event) => this.refs['keyboardView']._onFocus(event,'txt2')} placeholder="txt2"
                        style={{height:40}}/></View>
                <View onLayout={(event) => this.refs['keyboardView'].setTextInputOffset(event,'txt3')}>
                    <TextInput
                        onFocus={(event) => this.refs['keyboardView']._onFocus(event,'txt3')} placeholder="txt3"
                        style={{height:40}}/></View>
                <View onLayout={(event) => this.refs['keyboardView'].setTextInputOffset(event,'txt4')}>
                    <TextInput
                        onFocus={(event) => this.refs['keyboardView']._onFocus(event,'txt4')} placeholder="txt4"
                        style={{height:40}}/>
                </View>
            </KeyboardScrollView>
        );
        let webView = (
            <YuanXinWebView
                ref="webviewbridge"
                onBridgeMessage={this.onBridgeMessage}
                javaScriptEnabled={true}
                source={{uri: "http://baokaoxinxi.com/demo.html?sd="+(new Date()).toString()}}/>
        );
        let tabArr = {
            tabList: [
                {
                    text: '进行中',
                    selected: true
                },
                {
                    text: '已结束',
                    selected: true
                },
                {
                    text: '已开始'
                },
                {
                    text: '已开始'
                },
                {
                    text: '已开始'
                }
            ],
            borderColor: 'red',
            textSelectedColor: '#fff',
            itemColor: '#fff',
            itemSelectedColor: 'red',
            textColor: 'red',
            lineCount: 3,
            spacing: -1
        };
        return (
            <View style={styles.main}>
                <View style={{height:100}}></View>
                <YuanXinSelectItem {...tabArr} />
            </View>
        )
    }
});
var styles = StyleSheet.create({
    tabNavigator: {
        height: 100
    },
    textInput: {
        height: 40
    },
    tempView: {
        height: 40,
        borderTopLeftRadius: 5,
        backgroundColor: '#333333'
    },
    main: {
        flex: 1,
        backgroundColor: '#fff'
    },
    webView: {
        backgroundColor: BGWASH,
        height: 350,
    },
    map: {
        height: 150,
        margin: 10,
        borderLeftWidth: 1,
        borderColor: '#000000',
    },
});
module.exports = TestWebView;