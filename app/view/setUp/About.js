'use strict';
var React = require('react-native');

var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight
    } = React;
var ActionBar = require('../../control/ActionBar');
var ConfigUtil = require('../../utils/ConfigUtil');
var StyleUtil = require('../../utils/StyleUtil');
var TouchRowControl = require('../../control/TouchRowControl');
var RegisterAgreement = require('../register/RegisterAgreement');
var About = React.createClass({
    render(){
        let actionBarProp = {
            actionName: ConfigUtil.InnerText.aboutUs,
            isDefaultBack: this.props.jumpPop
        };
        return (
            <View style={StyleUtil.basicBackgroundColor}>
                <ActionBar {...actionBarProp} />
                <View style={styles.main}>
                    <View style={styles.logo}>
                        <Image source={require('../../images/about_logo.png')} style={styles.logoImage}/>
                        <Text allowFontScaling={false}
                              style={[styles.versionCode,StyleUtil.FormFontLeftStyle]}>{'v1.1.4'}</Text>
                    </View>
                </View>
                <View style={styles.common}>
                    <TouchRowControl text={ConfigUtil.InnerText.registerAgreementAbout}
                                     userTouch={()=>this.props.jumpPushPage(RegisterAgreement,'registeragreement')}/>
                </View>
            </View>
        );
    }
});
var styles = StyleSheet.create({
    main: {
        marginTop: 10,
        backgroundColor: '#fff',
    },
    logo: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoImage: {
        width: 78,
        height: 82
    },
    versionCode: {
        marginTop: 10
    },
    common: {
        backgroundColor: '#fff',
        marginTop: 10
    }
});
module.exports = About;