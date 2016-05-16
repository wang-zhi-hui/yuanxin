/**
 * Created by lemon on 16/4/1.
 */
'use strict';
var React = require('react-native');

var {
    StyleSheet,
    View,
    Image,
    Platform,
    ProgressBarAndroid,
    ActivityIndicatorIOS
    } = React;
var ImageControl = React.createClass({
    getInitialState(){
        return {
            error: false,
            loading: false
        };
    },
    imageOnLoad(e){
        this.state.loading = false;
        this.setState(this.state);
    },
    imageOnLoadStart(e){
        this.state.loading = true;
        this.setState(this.state);
    },
    imageOnError(e){
        this.state.error = e.nativeEvent.error;
        this.setState(this.state);
    },
    render(){
        let lodingView = null;
        let imageStyle = null;
        if (this.state.loading) {
            if (Platform.OS == 'android') {
                lodingView = <ProgressBarAndroid styleAttr='Inverse'/>;
            }
            else {
                lodingView = <ActivityIndicatorIOS size="large"/>;
            }
        }
        let imageProp=null;
        if(this.props.imageUri)
            imageProp={uri:this.props.imageUri};
        else
            imageProp=this.props.imageObj;
        return (
            <View style={[this.props.imageStyle,styles.loadingImage]}>
                <Image source={imageProp}
                       style={[this.props.imageStyle,this.state.loading?styles.loadingImageView:null]}
                       onError={(e)=>this.imageOnError(e)} onLoadStart={(e)=>this.imageOnLoadStart(e)}
                       onLoad={(e)=>this.imageOnLoad(e)}>
                    {this.props.control || null}
                </Image>
                {lodingView}
            </View>
        );
    }
});
var styles = StyleSheet.create({
    loadingImage: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingImageView: {
        top: 0,
        left: 0,
        position: 'absolute'
    }
});
module.exports = ImageControl;