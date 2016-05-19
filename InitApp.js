'use strict';
var React = require('react-native');

var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    ProgressBarAndroid,
    TouchableHighlight,
    Platform
    } = React;
var StorageUtil = require('./app/utils/StorageUtil');
var ConfigUtil = require('./app/utils/ConfigUtil');
var Util = require('./app/utils/Util');
var UserLogin = require('./app/view/login/UserLogin');
var Home = require('./app/view/index/Home');
var SelectCompanyType = require('./app/view/company/SelectCompanyType');
var isLoadArea = false;
var isLoadData = false;
var codeTimer;
var InitApp = React.createClass({
    getInitialState(){
        return {
            isLoadSuccess: false,
            isLoadingCopmany: false,
            isLoadError: false,
            loadingImages: [
                require('./app/images/loading5.png'),
                require('./app/images/loading1.png'),
                require('./app/images/loading2.png'),
                require('./app/images/loading3.png'),
                require('./app/images/loading4.png')
            ],
            selectedImageIndex: 0
        };
    },
    getHtttpError(error){
        if (!this.state.isLoadError) {
            this.state.isLoadError = true;
            this.setState(this.state);
        }
    },
    timerHandler(){
        if (!this.state.isLoadError) {
            if (this.state.selectedImageIndex == 4)
                this.state.selectedImageIndex = 0;
            else
                this.state.selectedImageIndex++;
            this.setState(this.state);
        }
    },
    componentWillUnmount(){
        codeTimer && clearInterval(codeTimer);
    },
    componentDidMount(){
        if (Platform.OS != 'android' && !codeTimer) {
            codeTimer = setInterval(this.timerHandler, 200);
        }
        if (!isLoadArea) {
            StorageUtil.getStorageItem(StorageUtil.AreaList, function (error, result) {
                if (!result && !error) {
                    var postProps = {
                        url: ConfigUtil.netWorkApi.getArea,
                        errorFun: (error)=>this.getHtttpError(error)
                    }
                    Util.HttpHelper.SendGetJSon(postProps).then((responseText)=>{
                        if (responseText.code == 200) {
                            StorageUtil.setStorageItem(StorageUtil.AreaList, responseText.message.toString());
                            isLoadArea = true;
                            if (isLoadArea && isLoadData && !this.state.isLoadSuccess) {
                                this.state.isLoadSuccess = true;
                                this.setState(this.state);
                            }
                        }
                        else {
                            if (!this.state.isLoadError) {
                                this.state.isLoadError = true;
                                this.setState(this.state);
                            }
                        }
                    });
                }
                else {
                    isLoadArea = true;
                    if (isLoadArea && isLoadData && !this.state.isLoadSuccess) {
                        this.state.isLoadSuccess = true;
                        this.setState(this.state);
                    }
                }
            }.bind(this));
        }
        if (!isLoadData) {
            var postProps = {
                url: ConfigUtil.netWorkApi.getBasicsData + '?dt=',
                errorFun: (error)=>this.getHtttpError(error)
            };
            Util.HttpHelper.SendGetJSon(postProps).then((responseText)=>{
                if (responseText.code == 200) {
                    var basicsData = JSON.parse(responseText.message);
                    StorageUtil.setStorageItem(StorageUtil.BusinesType, JSON.stringify(basicsData.Business));
                    StorageUtil.setStorageItem(StorageUtil.FunctionalModules, JSON.stringify(basicsData.FunctionalModules));
                    StorageUtil.setStorageItem(StorageUtil.BasicsDataUpdateTime, basicsData.VersionDate)
                    isLoadData = true;
                    if (isLoadArea && isLoadData && !this.state.isLoadSuccess) {
                        this.state.isLoadSuccess = true;
                        this.setState(this.state);
                    }
                }
                else {
                    if (!this.state.isLoadError) {
                        this.state.isLoadError = true;
                        this.setState(this.state);
                    }
                }
            });
        }
    },
    getCopmanyInfoSuccess(result){
        if (result.message) {
            StorageUtil.setStorageItem(StorageUtil.CopmanyInfo, result.message);
            this.props.jumpReplacePage(Home, 'home');
        }
        else {
            this.props.jumpReplacePage(SelectCompanyType, 'selectcompanytype');
        }
    },
    getCopmanyInfo(){
        this.props.sendPostJSON(
            {
                url: ConfigUtil.netWorkApi.getCopmany,
                success: (responseText)=>this.getCopmanyInfoSuccess(responseText)
            }
        );
    },
    componentDidUpdate(){
        if (this.state.isLoadSuccess && !this.state.isLoadingCopmany) {
            this.state.isLoadingCopmany = true;
            this.setState(this.state);
            StorageUtil.getStorageItem(StorageUtil.OAuthToken, function (error, result) {
                if (!error && result) {
                    this.props.setLoginUserInfo(result);
                    this.getCopmanyInfo();
                }
                else
                    this.props.jumpReplacePage(UserLogin, 'userlogin');
            }.bind(this));
        }
    },
    refreshData(){
        if (this.state.isLoadError) {
            this.state.isLoadError = false;
            this.state.isLoadingCopmany = false;
            this.setState(this.state);
            this.componentDidMount();
        }
    },
    render(){
        var loadingView;
        if (Platform.OS == 'android') {
            if (!this.state.isLoadError) {
                loadingView = (
                    <Image style={styles.initAppImage} source={require('./app/images/initapp.png')}>
                        <ProgressBarAndroid styleAttr='Inverse'/>
                    </Image>
                );
            }
            else {
                loadingView = (
                    <TouchableHighlight underlayColor={'transparent'} onPress={()=>this.refreshData()}>
                        <View>
                            <Image style={styles.initAppImage} source={require('./app/images/initapp.png')}>
                                <Text allowFontScaling={false}>{'加载错误,点击重新加载!'}</Text>
                            </Image>
                        </View>
                    </TouchableHighlight>
                );
            }
        }
        else {
            if (!this.state.isLoadError) {
                loadingView = (
                    <View style={styles.initLoadingView}>
                        <Image style={styles.initLoading}
                               source={this.state.loadingImages[this.state.selectedImageIndex]}/>
                        <Text allowFontScaling={false}>{'加载中...'}</Text>
                    </View>
                );
            }
            else {
                loadingView = (
                    <TouchableHighlight style={styles.initAppImage} underlayColor={'transparent'} onPress={()=>this.refreshData()}>
                        <View style={styles.initLoadingView}>
                            <Image style={styles.initLoading}
                                   source={this.state.loadingImages[this.state.selectedImageIndex]}/>
                            <Text allowFontScaling={false}>{'加载错误,点击重新加载!'}</Text>
                        </View>
                    </TouchableHighlight>
                );
            }
        }

        return (
            <View style={[styles.loading,{backgroundColor:Platform.OS != 'android'?'#f5f4f9':null}]}>
                {loadingView}
            </View>
        );
    }
});
var styles = StyleSheet.create({
    loading: {
        marginTop: Platform.OS == 'android' ? 0 : 20,
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    initLoadingView: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    initLoading: {
        height: 58,
        width: 55,
        marginBottom: 10
    },
    initAppImage: {
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    }
});
module.exports = InitApp;