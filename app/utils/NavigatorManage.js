/**
 * Created by lemon on 16/2/17.
 */
'use strict';
var React = require('react-native');

var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View
    } = React;
var UserLogin=require('../view/login/UserLogin');
var NavigatorManage = {
    getNavigatorView(route, basicProp){
        let routeName = route.name;
        let RouteView=route.component;
        if (route.params) {
            basicProp.params = route.params;
        }
        if(route.callBack){
            basicProp.callBack = route.callBack;
        }
        if(RouteView)
        {
            return <RouteView {...basicProp} />
        }
        else if(routeName=='userlogin'){
            return <UserLogin {...basicProp} />;
        }

    }
};
module.exports = NavigatorManage;