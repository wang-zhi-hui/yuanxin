/**
 * Created by yaderick on 2016/5/13.
 */
import React,{
    AppRegistry,
    Component,
    View,
    StyleSheet,
    ScrollView,
    Text,
    Dimensions,
    PixelRatio,
    Platform,
    ToastAndroid,
    AlertIOS,
    TouchableHighlight,
    Animated
} from 'react-native';
//
import ActionBar from '../../control/ActionBar';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import AccountInfo from './AccountInfo';
import DidTask from './DidTask';
import ProcessingTask from './ProcessingTask';
export default class DeleteUser extends Component{
    render(){
        let leftBar={
            isDefaultBack:()=>this.props.jumpPop(),
            text:'返回',
            actionName:"删除用户 ",
        }
        return (
            <View style={styles.container}>
                <ActionBar {...leftBar}/>
                <ScrollableTabView tabBarInactiveTextColor='#3b3b3b'
                                       tabBarUnderlineColor='#f00'
                                       tabBarActiveTextColor='#f00'
                                       style={{borderBottomWidth:2}}>
                    <AccountInfo tabLabel='账户信息' {...this.props}></AccountInfo>
                    <ProcessingTask tabLabel='进行任务' {...this.props}></ProcessingTask>
                    <DidTask tabLabel='完成任务' {...this.props}></DidTask>
                </ScrollableTabView>
            </View>
        );
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#EFEFF4',
    },
});