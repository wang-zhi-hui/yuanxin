/**
 * Created by lemon on 16/2/18.
 */
var AttrUtil={
    textInput:{
        /**
         * 输入框基本属性
         * @returns {{underlineColorAndroid: string, placeholderTextColor: string}}
         */
        basicTextInput:function ()
        {
            return {
                underlineColorAndroid:"transparent",
                placeholderTextColor:'#a7a7a7'
            };
        },
        /**
         * 身份证输入框
         */
        idCardTextInput(){
            return {
                underlineColorAndroid:"transparent",
                placeholderTextColor:'#a7a7a7',
                maxLength:18
            };
        },
        /**
         * 密码输入框
         * @returns {{underlineColorAndroid: string, placeholderTextColor: string, maxLength: number, secureTextEntry: boolean}}
         */
        passwordTextInput:function ()
        {
            return {
                underlineColorAndroid:"transparent",
                placeholderTextColor:'#a7a7a7',
                maxLength:16,
                secureTextEntry:true
            };
        },
        /**
         * 手机号输入框
         * @returns {{underlineColorAndroid: string, placeholderTextColor: string, maxLength: number, keyboardType: string}}
         */
        phoneTextInput:function (){
            return {
                underlineColorAndroid:"transparent",
                placeholderTextColor:'#a7a7a7',
                maxLength:11,
                keyboardType:'numeric'
            };
        },
        /**
         * 验证码输入框
         * @returns {{underlineColorAndroid: string, placeholderTextColor: string, maxLength: number, keyboardType: string}}
         */
        verifyCodeTextInput:function (){
            return {
                underlineColorAndroid:"transparent",
                placeholderTextColor:'#a7a7a7',
                maxLength:4,
                keyboardType:'numeric'
            };
        }
    }


};
module.exports=AttrUtil;