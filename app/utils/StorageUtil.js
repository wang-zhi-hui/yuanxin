/**
 * Created by lemon on 16/3/1.
 */
'use strict';
var React = require('react-native');

var {AsyncStorage}=React;
var StorageUtil = {
    //登录手机号
    UserPhoneNumber: 'cache_user_phone_number',
    //请求票据
    OAuthToken: 'cache_oauth_token',
    //城市地区
    AreaList: 'cache_area',
    //商户分类
    BusinesType: 'cache_businesType',
    //功能模块
    FunctionalModules: 'cache_functional_modules',
    //基础数据请求时间
    BasicsDataUpdateTime: 'cache_basics_data_updateTime',
    //商户信息
    CopmanyInfo: 'cache_copmany_info',
    getStorageItem: function (key, callback) {
        try {
            AsyncStorage.getItem(key, callback);
        }
        catch (error) {
            console.log('读取storage错误:' + error.message);
        }
    },
    setStorageItem: function (key, value, callback) {
        try {
            AsyncStorage.setItem(key, value, callback);
        }
        catch (error) {
            console.log('存储storage错误:' + error.message);
        }
    },
    removeStorageItem: function (key, callback) {
        AsyncStorage.removeItem(key, callback);
    }
};
module.exports = StorageUtil;