'use strict';
var React = require('react-native');

var {
    StyleSheet,
    View,
    InteractionManager,
    Dimensions,
    TextInput,
    ListView,
    RefreshControl
    } = React;
var ActionBar = require('../../control/ActionBar');
var StyleUtil = require('../../utils/StyleUtil');
var ConfigUtil = require('../../utils/ConfigUtil');
var Util = require('../../utils/Util');
var ButtonControl = require('../../control/ButtonControl');
var CompanyUserItem = require('../listItem/CompanyUserItem');
var CompanyUserAdd = require('./CompanyUserAdd');
var Swipeout = require('react-native-swipeout');
var CompanyUserManager = React.createClass({
    getInitialState(){
        return {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            dataList: [],
            isRefreshing: false,
            selectText: '',
            isFirst: true
        };
    },
    _deleteSuccess(result){
        let deleteMessage = JSON.parse(result.message);
        if (deleteMessage.isSuccess) {
            Util.AlertMessage(ConfigUtil.InnerText.deleteSuccess);
            this._searchCopmanyUserList();
        }
        else {
            Util.AlertMessage(deleteMessage.errorMessage.m_StringValue);
        }
    },
    _delete(e){
        if (e.isManager)
            Util.AlertMessage(ConfigUtil.InnerText.deleteCompanyUserAdminError);
        else
            this.props.sendPostJSON({
                url: ConfigUtil.netWorkApi.copmanyUserDelete,
                body: JSON.stringify({
                    code: e.code
                }),
                success: (responseText)=>this._deleteSuccess(responseText)
            });
    },
    _handleSwipeout(sectionID, rowID){
        for (var i = 0; i < this.state.dataList.length; i++) {
            if (i != rowID) this.state.dataList[i].active = false
            else this.state.dataList[i].active = true
        }
        this.setState(this.state);
    },
    _searchHandler(){
        this._searchCopmanyUserList();
    },
    _searchSuccess(result){
        this.state.dataList = JSON.parse(result.message);
        if (this.state.dataList.length == 0)
            this.state.dataList.push({});
        this.state.isRefreshing = false;
        this.setState(this.state);
        this.props.maskViewHandler(false);
    },
    componentDidMount(){
        InteractionManager.runAfterInteractions(() => {
            this.props.maskViewHandler(true);
            this._searchCopmanyUserList();
        });
    },
    _searchCopmanyUserList(){
        this.props.sendPostJSON({
            url: ConfigUtil.netWorkApi.copmanyUserList,
            body: JSON.stringify({
                SelectStr: this.state.selectText
            }),
            success: (responseText)=>this._searchSuccess(responseText)
        });
    },
    _renderRow(rowData, sectionID, rowID, highlightRow){
        if (rowData.loginName) {
            let deleteButton = [
                {
                    text: ConfigUtil.InnerText.buttonDelete,
                    onPress: ()=>this._delete(rowData),
                    backgroundColor: '#ff5001'
                }
            ];
            return (
                <Swipeout close={!rowData.active} onOpen={(sectionID, rowID) => this._handleSwipeout(sectionID, rowID)}
                          right={deleteButton}>
                    <CompanyUserItem _delete={this._delete} userInfo={rowData} {...this.props} />
                </Swipeout>
            );
        }
        else
            return null;

    },
    _userInput(text){
        this.state.selectText = text;
        this.setState(this.state);
    },
    _renderHeader(){
        let buttonSearch = {
            userClick: ()=>this._searchHandler(),
            buttonStyle: StyleUtil.SearchStyle,
            buttonTextStyle: StyleUtil.SubmitTextStyle,
            buttonText: ConfigUtil.InnerText.buttonSearch
        };

        return (
            <View>
                <View style={styles.searchUser}>
                    <View style={styles.searchLeft}>
                        <TextInput onChangeText={(text)=>this._userInput(text)} ref="txtSearch"
                                   underlineColorAndroid="transparent" returnKeyType="search"
                                   onSubmitEditing={()=>this._searchHandler()}
                                   placeholder={ConfigUtil.InnerText.searchCompanyUser}
                                   maxLength={50}
                                   style={[StyleUtil.FromFontSizeInput,StyleUtil.FormTextInput]}/>
                    </View>
                    <View style={styles.searchRight}>
                        <ButtonControl {...buttonSearch} />
                    </View>
                </View>
                <View style={StyleUtil.breakLongLineItem}/>
            </View>
        );
    },
    _onRefresh(){
        this.state.isRefreshing = true;
        this.setState(this.state);
        this._searchCopmanyUserList();
    },
    render(){
        let actionBarProp = {
            actionName: ConfigUtil.InnerText.companyUserManager,
            isDefaultBack: this.props.jumpPop,
            actionBarRightProp: {
                text: ConfigUtil.InnerText.userAdd,
                click: ()=> {
                    this.props.jumpPushPage(CompanyUserAdd, 'companyuseradd', this._searchCopmanyUserList);
                }
            }
        };
        return (
            <View style={StyleUtil.basicBackgroundColor}>
                <ActionBar {...actionBarProp} />
                <ListView
                    renderSectionHeader={this._renderHeader}
                    initialListSize={10}
                    dataSource={this.state.dataSource.cloneWithRows(this.state.dataList)}
                    renderRow={this._renderRow}
                    refreshControl={
                        <RefreshControl
                          refreshing={this.state.isRefreshing}
                          onRefresh={this._onRefresh}
                          tintColor={ConfigUtil.basic.progressColor}
                          colors={[ConfigUtil.basic.progressColor]}
                          progressBackgroundColor="#ffffff"/>}
                />
            </View>
        );
    }
});
var styles = StyleSheet.create({
    actionRightImage: {
        height: 20,
        width: 20
    },
    searchUser: {
        flexDirection: 'row',
        height: 44,
        backgroundColor: '#fff'
    },
    buttonStyle: {
        width: 40,
        height: 40,
        justifyContent: 'center'
    },
    searchLeft: {
        height: 44,
        marginLeft: 10,
        flexDirection: 'column',
        flex: 8,
        justifyContent: 'center'
    },
    searchRight: {
        height: 44,
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    scrollView: {
        height: (Dimensions.get('window').height - 120)
    }
});
module.exports = CompanyUserManager;