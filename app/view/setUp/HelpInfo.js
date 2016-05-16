'use strict';
var React = require('react-native');

var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    InteractionManager
    } = React;
var ActionBar = require('../../control/ActionBar');
var StyleUtil = require('../../utils/StyleUtil');
var ConfigUtil = require('../../utils/ConfigUtil');
var Util = require('../../utils/Util');
var TouchRowControl = require('../../control/TouchRowControl');
var HelpInfo = React.createClass({
    getInitialState(){
        return {
            title: '',
            context: ''
        };
    },
    componentDidMount(){
        InteractionManager.runAfterInteractions(() => {
            if (this.props.params.id == 1) {
                this.state.title = '1.商家注册要求？';
                this.state.context = '商家注册需要完成3个步骤：验证手机号、设置密码、商家入驻。\n商家入驻步骤中，用户必须认真填写商家信息并上传商家资质，否则将注册不成功。';
            }
            else if (this.props.params.id == 2) {
                this.state.title = '2.忘记登录密码如何处理？';
                this.state.context = '您可以通过手机号+验证码完成登录。\n手机号必须是注册时绑定的手机号。';
            }
            else {
                this.state.title = '3.个人用户能否注册远薪商家端？';
                this.state.context = '远薪商家端目前只接受正式商家在平台注册。\n商家注册时必须完成商家入驻步骤，提交相关商家资质。';
            }
            this.setState(this.state);
        });
    },
    render(){
        let actionBarProp = {
            actionName: ConfigUtil.InnerText.helpInfo,
            isDefaultBack: this.props.jumpPop
        };
        return (
            <View style={StyleUtil.basicBackgroundColor}>
                <ActionBar {...actionBarProp} />
                <View style={styles.main}>
                    <TouchRowControl hideRight={true} text={this.state.title}/>
                    <View style={StyleUtil.breakLineItem}/>
                    <View style={styles.context}>
                        <Text allowFontScaling={false} style={StyleUtil.FormFontLeftStyle}>{this.state.context}</Text>
                    </View>
                </View>
            </View>
        );
    }
});
var styles = StyleSheet.create({
    main: {
        backgroundColor: '#fff',
        marginTop: 10
    },
    context: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10
    }
});
module.exports = HelpInfo;