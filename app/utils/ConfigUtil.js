/**
 * Created by lemon on 16/2/18.
 */
var NetWorkSite = {
    oauthServicesSite: 'http://mobiletest.yuanxin2015.com/',
    yuanXinSite: 'http://www.yuanxin2015.com/'
};
var ConfigUtil = {
    //验证码发送间隔
    verifyCodeTime: 60,
    netWorkApi: {
        //获取验证码
        getVerifyCode: NetWorkSite.yuanXinSite + 'MobileBusiness/MobileBusiness.Common/Services/PostSMSForDHST.asmx/GetSMSVerification',
        //检查验证码正确
        checkVerifyCode: NetWorkSite.yuanXinSite + 'MobileBusiness/MobileBusiness.Common/Services/PostSMSForDHST.asmx/CheckVerification',
        //注册
        register: NetWorkSite.oauthServicesSite + 'OAuthServices/account/PhoneRegister',
        //修改密码
        updatePassword: NetWorkSite.oauthServicesSite + 'OAuthServices/account/UpdatePassword',
        //修改手机号
        updateMobileNumber: NetWorkSite.oauthServicesSite + 'OAuthServices/account/ChangePhoneNumber',
        //修改姓名
        updateUserName: NetWorkSite.oauthServicesSite + 'OAuthServices/account/ChangeUserName',
        //修改邮箱
        updateEmail: NetWorkSite.oauthServicesSite + 'OAuthServices/account/ChangeEmail',
        //登录
        login: NetWorkSite.oauthServicesSite + 'OAuthServices/token',
        //获取用户信息
        getUserInfo: NetWorkSite.oauthServicesSite + 'OAuthServices/account/UserProfile',
        //获取城市列表
        getArea: NetWorkSite.oauthServicesSite + 'BusinessService/basic/areas',
        //基础数据
        getBasicsData: NetWorkSite.oauthServicesSite + 'BusinessService/basic/BasicsData',
        //退出登录
        loginOut: NetWorkSite.oauthServicesSite + 'OAuthServices/account/logout',
        //添加商户
        addCopmany: NetWorkSite.oauthServicesSite + 'BusinessService/copmany/businessRegister',
        //修改商户资料
        updateCopmany: NetWorkSite.oauthServicesSite + 'BusinessService/copmany/businessUpdate',
        //获取商户
        getCopmany: NetWorkSite.oauthServicesSite + 'BusinessService/copmany/businessInfo',
        //更新用户头像
        uploadUserHeadPhoto: NetWorkSite.oauthServicesSite + 'OAuthServices/account/ChangePhoto',
        //找回密码
        findPassword: NetWorkSite.oauthServicesSite + 'OAuthServices/account/BackPassword',
        //获取商户用户
        copmanyUserList: NetWorkSite.oauthServicesSite + 'BusinessService/copmany/businessUsers',
        //添加商户用户
        copmanyUserAdd: NetWorkSite.oauthServicesSite + 'BusinessService/copmany/businessUserAdd',
        //删除商家用户
        copmanyUserDelete: NetWorkSite.oauthServicesSite + 'BusinessService/copmany/businessUserDel'


    },
    InnerText: {
        companyNumber: '商家编号',
        companyLogo: '商家LOGO',
        merchantInfo: '公司信息',
        merchantName: '商家名称',
        merchantNamePlaceholder: '请输入商家名称',
        selectArea: '选择区域',
        selectAreavalidate: '请选择区域',
        selectAreaPlaceholder: '请选择省、市、区、县',
        address: '详细地址',
        addressValidate: '请输入详细地址',
        addressPlaceholder: '请输入街道门牌号信息',
        selectMerchantType: '选择商家分类',
        selectMerchantTypePlaceholder: '请选择商家分类',
        businessNumber: '营业执照注册号',
        businessNumberPlaceholder: '请输入营业执照注册号',
        businessPhoto: '营业执照扫描件',
        businessPhotoError: '请上传营业执照扫描件',
        aptitudePhoto: '行业资质证明(可以添加3个)',
        aptitudePhotoError: '请上传行业资质证明',
        aptitudePhotoView: '行业资质证明',
        juridicalPerson: '法人',
        juridicalPersonName: '法人姓名',
        juridicalPersonNamePlaceholder: '请输入法人姓名',
        contactPerson: '联系人',
        contactPersonError: '请输入联系人',
        juridicalPersonPhone: '联系人手机号',
        juridicalPersonPhonePlaceholder: '请输入联系人手机号',
        juridicalPersonPhoneError: '请输入正确的联系人手机号',
        juridicalPersonIDCard: '法人身份证',
        juridicalPersonIDCardPlaceholder: '请输入法人身份证',
        juridicalPersonIDCardError: '请输入正确的身份证',
        idCardPhotoFront: '法人身份证扫描件(正面)',
        idCardPhotoFrontError: '请上传法人身份证扫描件(正面)',
        idCardPhotoBack: '法人身份证扫描件(背面)',
        idCardPhotoBackError: '请上传法人身份证扫描件(背面)',
        businessAdd: '商家入驻',
        PersonalCompanyAdd: '个人入驻',
        businessInfo: '商家信息',
        buttonSubmit: '提交',
        submitSuccess: '提交成功',
        lastIncomeText: '最近收入（元）',
        orderCountText: '接单数',
        monthMoneyText: '本月收入（元）',
        sumMoneyText: '累计收入（元）',
        register: '注册',
        registerSuccess: '注册成功',
        msgCodePlaceholder: '请输入短信验证码',
        validatePhoneNumber: '验证手机号',
        validatePhoneNumberError: '请输入正确的手机号',
        login: '登录',
        loginSuccess: '登录成功',
        loginError: '登录状态异常',
        loginTimeOutError: '登录状态过期',
        phonePlaceholder: '请输入手机号',
        getVerifyCode: '获取验证码',
        getVerifyCodeSuccess: '验证码发送成功,请注意查收',
        findPassWord: '找回密码',
        findpassWordSuccess: '找回密码成功',
        phoneLogin: '手机快捷登录',
        userInfo: '账户信息',
        validateVerifyCodeError: '请输入验证码',
        validateSessionIDError: '尚未获取验证码',
        myIncome: '我的收入',
        myDoWork: '我的任务',
        myMessage: '我的消息',
        setUp: '设置',
        help: '帮助与反馈',
        helpInfo: '帮助',
        aboutUs: '关于我们',
        loginOut: '退出登录',
        loginOutSuccess: '退出登录成功',
        loginName: '账号',
        userHeadPhoto: '头像',
        username: '姓名',
        email: '邮箱',
        campaignInfo: '活动详情',
        campaignRecommend: '活动推荐',
        addCampaign: '发起活动',
        task: '接单',
        userTaskInfo: '详细信息',
        addSource: '发起资源',
        myOrders: '我的订单',
        processing: '进行中',
        finished: '已完成',
        edit: '编辑',
        editPassword: '修改密码',
        newsPassword: '输入新密码',
        confirmPassword: '确定新密码',
        passwordMinError: '密码不能小于6位',
        confirmPasswordError: '两次输入密码不一致',
        updatePasswordSuccess: '修改密码成功请',
        registerAgreementError: '必须同意注册协议',
        registerAgreement: '注册协议',
        registerAgreementAbout: '远薪平台注册协议',
        agreeRegisterAgreement: '同意以下协议并注册',
        updateUserHeadPhotoSuccess: '修改用户头像成功',
        passwordPlaceholder: '请输入密码',
        updateUserName: '修改姓名',
        updateEmail: '修改邮箱',
        save: '保存',
        saveSuccess: '保存成功',
        usernamePlaceholder: '请输入姓名',
        emailPlaceholder: '请输入邮箱',
        emailError: '请输入正确的邮箱',
        updateMobileNumber: '修改手机号',
        oldMobileNumber: '原号码',
        newsMobileNumber: '新号码',
        oldPhoneEqualNewsPhone: '两次输入号码一致',
        updateMobileNumberSuccess: '更新手机号成功请重新登录',
        realName: '真实姓名',
        realNamePlaceholder: '请输入真实姓名',
        mobileNumber: '手机号',
        mobileNumberPlaceholder: '请输入手机号',
        personalIdCardPhotoFront: '身份证正面',
        personalIdCardPhotoFrontError: '请上传身份证正面',
        personalIdCardPhotoBack: '身份证背面',
        personalIdCardPhotoBackError: '请上传身份证背面',
        mobileNumberError: '请输入正确的手机号',
        selectCompanyType: '入驻类别选择',
        companyTypeName: '我是商家',
        companyUserManager: '商家用户管理',
        companyUserAdd: '添加商家用户',
        personalCompanyTypeName: '我是个人',
        showImage: '图片浏览',
        buttonSearch: '搜索',
        searchCompanyUser: '请输入手机号码/姓名进行搜索',
        userAdd: '添加用户',
        buttonDelete: '删除',
        sourceList: '查看资源',
        myHome: '我的主页',
        mySubscribeSource: '我预订的资源',
        myReleaseSource: '我发布的资源',
        release: '发布',
        releaseSource: '发布资源',
        deleteCompanyUserAdminError: '无法删除商家管理员',
        deleteSuccess: '删除成功',
        landInfo: '土地信息',
        myLand: '我的土地'
    },
    touchColor: {
        lineTouch: '#B5B5B5'
    },
    basic: {
        basicBackgroundColor: '#efeff4',
        progressColor: '#a7a7a7',
        appID: '0653e13535d046789ba5b0b7b2094d73'
    },
    htmlUrl: {
        //查看资源
        sourceList: 'http://www.yuanxin2015.com/MobileBusiness/ResourceShare/view/resource.html',
        //发布资源
        releaseSource: 'http://www.yuanxin2015.com/MobileBusiness/ResourceShare/view/resource-type.html',
        //我的主页
        myHome: 'http://www.yuanxin2015.com/MobileBusiness/ResourceShare/view/business-info.html',
        //我发布的资源
        myReleaseSource: 'http://www.yuanxin2015.com/MobileBusiness/ResourceShare/view/mypublishedres.html',
        //我订阅的资源
        mySubscribeSource: 'http://www.yuanxin2015.com/MobileBusiness/ResourceShare/view/mybookedres.html'
    }
};
module.exports = ConfigUtil;