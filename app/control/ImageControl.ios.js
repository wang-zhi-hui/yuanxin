/**
 * Created by lemon on 16/5/17.
 */
'use strict';
var React = require('react-native');

var {
    StyleSheet,
    Image,
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
        let loadingView = this.state.loading ? <ActivityIndicatorIOS size="large"/> : null;
        let imageStyle = null;
        let imageProp = null;
        if (this.props.imageUri)
            imageProp = {uri: this.props.imageUri};
        else
            imageProp = this.props.imageObj;
        return (
            <Image source={imageProp}
                   style={[this.props.imageStyle,styles.loadingImage]}
                   onError={(e)=>this.imageOnError(e)} onLoadStart={(e)=>this.imageOnLoadStart(e)}
                   onLoad={(e)=>this.imageOnLoad(e)}>
                {loadingView}
                {this.props.control || null}
            </Image>
        );
    }
});
var styles = StyleSheet.create({
    loadingImage: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});
module.exports = ImageControl;