/**
 * Created by lemon on 16/2/17.
 */
'use strict';
import React from 'react-native';
import UserLogin from '../view/login/UserLogin';
class NavigatorManage {
    static getNavigatorView(route, basicProp){
        let routeName = route.name;
        let RouteView=route.component;
        if (route.params)
            basicProp.params = route.params;
        if(route.callBack)
            basicProp.callBack = route.callBack;
        if(RouteView)
            return <RouteView {...basicProp} />
        else if(routeName=='userlogin')
            return <UserLogin {...basicProp} />;
    };
};
module.exports = NavigatorManage;