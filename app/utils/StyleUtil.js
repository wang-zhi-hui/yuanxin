/**
 * Created by lemon on 16/3/1.
 */
'use strict';
var React = require('react-native');

var {Platform} = React;
var StyleUtil = {
    basicBackgroundColor:{
        backgroundColor:'#efeff4',
        flex:1
    },
    menubarBottom:{ //底部导航
        position: 'absolute',
        backgroundColor:'#fff',
        left: 0 ,
        right: 0,
        bottom: 0
    },
    touchitem:{
        backgroundColor:'#ffffff',
        flex: 1,
        height: 56
    },
    menubar:{
        height: 56,
        flexDirection:'row'
    },
    menuitemrow:{
        flexDirection:'row'
    },
    menubaritem:{
        flex: 1,
        height: 56,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 8,
        paddingRight: 8,
        backgroundColor:'transparent',
    },
    actionText:{
        marginTop:5,
        color: '#3b3b3b',
        textAlign: 'center',
        fontSize:11
    },
    actionSelect: {
        color:'#e89311'
    },
    menuImage:{
        width:24,
        height:24
    },
    ActionBarIOSTop:{
        height:20,
        backgroundColor: '#333333'
    },
    ActionBar: { //头部导航
        height: 44,
        flexDirection: 'row',
        backgroundColor: '#333333'
    },
    ActionBarLeft: { //左侧菜单
        flex: 2,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    ActionBarLeftTouch: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    ActionBarLeftText:  //左侧菜单文字
    {
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 15
    },
    ActionBarTitle: {    //头部标题
        flex: 6,
        alignItems: 'center',
        justifyContent: 'center',
        height:44
    },
    ActionBarTitleText: {    //头部标题文字
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 15
    },
    ActionBarRight: {    //右侧菜单
        marginRight: 10,
        flex: 2,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    ActionBarRightTouch: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    ActionBarRightText: {    //右侧菜单文字
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 15
    },
    SmallFontStyle: {    //小号字体
        color: '#a7a7a7',
        fontSize: 13
    },
    SubmitStyle: {   //提交按钮
        height: 40,
        borderRadius: 5,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        backgroundColor: '#ff5001',
        alignItems: 'center',
        justifyContent: 'center'
    },
    SearchStyle:{
        borderRadius: 5,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#ff5001',
        height:30,
        flexDirection: 'column',
        justifyContent:'center',
        alignItems: 'center',
    },
    SubmitTextStyle: {   //提交按钮文字
        fontSize: 15,
        color: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    VerifyCodeText:{
        fontSize:15,
        color:'#ff5001'
    },
    VerifyCodeStyle: {   //验证码按钮
        padding:4,
        height:26,
        justifyContent: 'center',
        alignItems:'center',
        marginRight:10,
        flex: 3,
        backgroundColor:'#ffffff',
        borderColor:'#ff5001',
        borderWidth:1
    },
    FormFontLeftStyle: { //表单左侧字体
        fontSize: 15,
        color: '#3b3b3b'
    },
    FormFontRightStyle: {
        fontSize: 15,
        color: '#a7a7a7'
    },
    FormTitleBold:{
        fontSize: 15,
        justifyContent: 'center',
        fontWeight:'bold'
    },
    FromFontSizeInput: { //表单输入框
        fontSize: 15,
        justifyContent: 'center',
    },
    FormTextInput: {
        flex: 1,
        color: '#a7a7a7'
    },
    FormInputRightStyle: {
        marginLeft: 0
    },
    breakLineItem: {
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#efeff4',
        height: 1
    },
    breakLongLineItem: {
        backgroundColor: '#efeff4',
        height: 1
    },
    breakBoldLineItem:{
        backgroundColor: '#efeff4',
        height: 10
    },
    userOperationItem:{
        marginLeft:10,
        marginRight:10,
        height:44,
        backgroundColor:'#fff',
        flexDirection: 'row'
    },
    userOperationItemLeft:{
        flex: 9,
        flexDirection: 'column',
        height:44,
        justifyContent: 'center'
    },
    userOperationItemRight:{
        marginLeft:10,
        flex: 1,
        flexDirection: 'column',
        height:44,
        justifyContent: 'center',
        alignItems:'flex-end'
    },
    userOperationItemArrow:{
        width:7,
        height:11
    },
    textInputRow:{
        height:44,
        borderWidth: 0,
        backgroundColor:'#ffffff',
        justifyContent: 'center'
    },
    textInputRowContent:{
        paddingLeft:10,
        flex: 1,
        fontSize:15
    },
    itemTitle:{
        marginLeft:10,
        marginTop:1,
        height:44,
        justifyContent: 'center'
    },
    lineRow:{
        height:44,
        backgroundColor:'#fff',
        flexDirection: 'row'
    },
    lineRowRight:{
        flex:1,
        marginRight:10,
        flexDirection: 'row',
        justifyContent:'flex-end',
        alignItems:'center'
    },
    arrowButtonRight:{
        marginLeft:10,
        width:7,
        height:11
    },
    userHeadPhotoList:{
        height: 50,
        width: 50,
        borderRadius: 25
    }
};
module.exports = StyleUtil;