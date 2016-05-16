'use strict';
import React,{
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View
} from 'react-native';
var MainToolbar = require('../../control/MainToolbar');
var ActionBar = require('../../control/ActionBar');
var Index = require('./Index');
var Enterprise = require('./Enterprise');
var BusinessManage = require('./BusinessManage');
var Me = require('./Me');
var Home = React.createClass({
    getInitialState(){
        return {
            bottomMenu: [
                {
                    text: '主页',
                    value: 'home',
                    icon: require('../../images/menu_index.png'),
                    iconSelected: require('../../images/menu_index_down.png'),
                    isSelected: true
                },
                {
                    text: '业务办理',
                    value: 'business',
                    icon: require('../../images/menu_business.png'),
                    iconSelected: require('../../images/menu_business_down.png')
                },
                {
                    text: '企业圈',
                    value: 'enterprise',
                    icon: require('../../images/menu_enterprise.png'),
                    iconSelected: require('../../images/menu_enterprise_down.png')
                },
                {
                    text: '我',
                    value: 'me',
                    icon: require('../../images/menu_me.png'),
                    iconSelected: require('../../images/menu_me_down.png')
                }
            ]
        };
    },
    setSelectAction(selectActionValue)
    {
        this.state.bottomMenu.forEach(v=> {
            if (v.value == selectActionValue)
                v.isSelected = true;
            else
                v.isSelected = false;
        });
        this.setState(this.state);
    },
    render(){
        let actionName = '';
        for (let i = 0; i < this.state.bottomMenu.length; i++) {
            if (this.state.bottomMenu[i].isSelected) {
                actionName = this.state.bottomMenu[i].text;
                break;
            }
        }
        let actionBarProp = {
            actionName: actionName
        };
        let bottomActionBarProp = {
            selectAction: this.setSelectAction,
            bottomMenus: this.state.bottomMenu
        };
        let homeMain;
        let homeSubsetProps = {
            navigator: this.props.navigator,
            getCurrUserInfo: this.props.getCurrUserInfo,
            getRefreshUserInfo: this.props.getRefreshUserInfo,
            maskViewHandler: this.maskViewHandler,
            jumpPushPage: this.props.jumpPushPage,
            sendPostJSON: this.props.sendPostJSON
        };
        if (this.state.bottomMenu[0].isSelected) {
            homeMain = <Index {...homeSubsetProps} />;
        }
        else if (this.state.bottomMenu[1].isSelected) {
            homeMain = <BusinessManage {...homeSubsetProps} />;
        }
        else if (this.state.bottomMenu[2].isSelected) {
            homeMain = <Enterprise {...homeSubsetProps} />;
        }
        else {
            homeMain = <Me {...homeSubsetProps} />;
        }
        return (
            <View style={styles.mainview}>
                <ActionBar {...actionBarProp} />
                {homeMain}
                <MainToolbar {...bottomActionBarProp} />
            </View>
        );
    }
});
var styles = StyleSheet.create({
    mainview: {
        flex: 1,
        flexDirection: 'column'
    }
});
module.exports = Home;