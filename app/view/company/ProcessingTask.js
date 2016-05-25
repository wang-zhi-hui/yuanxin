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
    Animated,
    StatusBar
} from 'react-native';
export default class ProcessingTask extends Component{
    render(){
        return (
            <View>

                    <StatusBar
                        backgroundColor='#ff0000'
                        //translucent={true}
                        //hidden={true}
                        animated={false}
                    />
                   <Text>年后</Text>

            </View>
        )
    }
}

