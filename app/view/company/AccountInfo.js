/**
 * Created by Administrator on 2016/5/20.
 */
import React,{
    AppRegistry,
    Component,
    View,
    StyleSheet,
    ScrollView,
    Text,
    Platform,
    TouchableHighlight,
    Image,
    Dimensions,
    InteractionManager
} from 'react-native';
import ActionBar from '../../control/ActionBar';
import ConfigUtil from '../../utils/ConfigUtil';
import FormRowInput from '../../control/FormRowInput';
import StyleUtil from '../../utils/StyleUtil';
//import Util from '../../utils/Util';
//import StorageUtil from'../../utils/StorageUtil';
import SelectPhotoUtil from '../../utils/SelectPhotoUtil';
import OSSUtil from '../../utils/OSSUtil';
import TouchRowTextControl from '../../control/TouchRowTextControl';
//import ImageControl from '../../control/ImageControl';
//import UpdateMobileNumber from'../user/UpdateMobileNumber';
//import UpdateUserInfo  from'../user/UpdateUserInfo';
export default class AccountInfo extends Component{
      constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
            showVieType: 1
        };
      }
    componentDidMount(){
        InteractionManager.runAfterInteractions(() => {
            this.getUserInfo();
        });
    }
    getUserInfo(){
        this.props.maskViewHandler(true);//等待圈显示
        this.props.sendPostJSON({
            url: ConfigUtil.netWorkApi.getUserInfo,
            body:"loginName="+this.props.params.loginName,
            success: (responseText)=>this.successFun(responseText)
        });
    }
    successFun(result){
        this.props.maskViewHandler(false);
        this.state.userInfo = JSON.parse(result.message);
        this.setState(this.state);

    }

    render(){
        let userHeadPhoto = {
            imageStyle: styles.userHeadPhoto
        };
        if (this.state.userInfo.logoImageUrl)
            userHeadPhoto.imageUri = this.state.userInfo.logoImageUrl;
        else
            userHeadPhoto.imageObj = require('../../images/user_info_photo_default.png');
        var mainView;
        mainView = (
            <View style={styles.main}>
                    <View style={styles.userPhoto}>
                        <View style={styles.userItemLeft}>
                            <Text allowFontScaling={false} style={StyleUtil.FormFontLeftStyle}>
                                {ConfigUtil.InnerText.userHeadPhoto}
                            </Text>
                        </View>
                        <View style={styles.userItemRight}>
                            <ImageControl {...userHeadPhoto} />
                        </View>
                    </View>
                <View style={StyleUtil.breakLineItem}/>
                    <View style={styles.userInfoRow}>
                        <View style={styles.userItemLeft}>
                            <Text allowFontScaling={false} style={StyleUtil.FormFontLeftStyle}>
                                {ConfigUtil.InnerText.loginName}
                            </Text>
                        </View>
                        <View style={styles.userItemRight}>
                            <Text allowFontScaling={false} style={StyleUtil.FormFontRightStyle}>
                                {this.state.userInfo.loginName || ''}
                            </Text>
                        </View>
                    </View>
                <View style={StyleUtil.breakLineItem}/>
                    <View style={styles.userInfoRow}>
                        <View style={styles.userItemLeft}>
                            <Text allowFontScaling={false} style={StyleUtil.FormFontLeftStyle}>
                                {ConfigUtil.InnerText.username}
                            </Text>
                        </View>
                        <View style={styles.userItemRight}>
                            <View style={styles.userInfoText}>
                                <Text allowFontScaling={false} numberOfLines={1} style={StyleUtil.FormFontRightStyle}>
                                    {this.state.userInfo.userName || ''}
                                </Text>
                            </View>
                        </View>
                    </View>
                <View style={StyleUtil.breakLineItem}/>
                    <View style={styles.userInfoRow}>
                        <View style={styles.userItemLeft}>
                            <Text allowFontScaling={false} style={StyleUtil.FormFontLeftStyle}>
                                {ConfigUtil.InnerText.email}
                            </Text>
                        </View>
                        <View style={styles.userItemRight}>
                            <View style={styles.userInfoText}>
                                <Text allowFontScaling={false} numberOfLines={1} style={StyleUtil.FormFontRightStyle}>
                                    {this.state.userInfo.email || '未填写邮箱'}
                                </Text>
                            </View>
                        </View>
                    </View>
            </View>
        );
        return (
            <View>
                {mainView}
            </View>
        )
    }
}
var styles = StyleSheet.create({
    main: {
        marginTop: 10
    },
    userPhoto: {
        height: 78,
        backgroundColor: '#fff',
        flexDirection: 'row'
    },
    userHeadPhoto: {
        height: 60,
        width: 60,
        borderRadius: 32
    },
    userItemLeft: {
        marginLeft: 10,
        width: 50,
        justifyContent: 'center'
    },
    userItemRight: {
        flex: 1,
        marginRight: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    userInfoRow: {
        height: 44,
        backgroundColor: '#fff',
        flexDirection: 'row'
    },
    userInfoText: {
        width: (Dimensions.get('window').width - 90),
        alignItems: 'flex-end'
    },
    clickImage: {
        marginLeft: 10,
        width: 7,
        height: 11
    }
});

