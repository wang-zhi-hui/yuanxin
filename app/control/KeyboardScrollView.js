/**
 * Created by lemon on 16/4/20.
 */
'use strict';
var React = require('react-native');

var {
    ScrollView,
    DeviceEventEmitter
    } = React;
var KeyboardScrollView = React.createClass({
    getInitialState(){
        return {
            keyboardSpace: 0,
            contentOffset: {x: 0, y: 0},
            scrollViewLayout: {y: 0, x: 0, width: 0, height: 0},
            controlList: [],
            nowControl: null
        };
    },
    checkSelectedTextInput(){
        for (let i = 0; i < this.state.controlList.length; i++) {
            if (this.state.controlList[i].tag == this.state.nowControl) {
                this.calculateHeight(this.state.controlList[i]);
                break;
            }
        }
    },
    calculateHeight(controlObj){
        if ((controlObj.offSet.y + this.state.keyboardSpace + controlObj.offSet.height + 30) > this.state.scrollViewLayout.height) {
            let scrollY = ((controlObj.offSet.y + controlObj.offSet.height + 30) - (this.state.scrollViewLayout.height - this.state.keyboardSpace));
            this._scrollViewTo(scrollY);
        }
    },
    _scrollViewTo(y){
        this.refs.keyboardScrollView.scrollTo({x: 0, y: y});
    },
    updateKeyboardSpace: function (frames) {
        const keyboardSpace = frames.endCoordinates.height;
        this.state.keyboardSpace = keyboardSpace;
        this.setState(this.state);
    },
    setTextInputOffset(event, tag){
        console.log(tag+':'+JSON.stringify(event.nativeEvent.layout));
        this.state.controlList.push({tag: tag, offSet: event.nativeEvent.layout});
        this.setState(this.state);
    },
    _onFocus(event, tag){
        this.state.nowControl = tag;
        this.setState(this.state);
        setTimeout(this.checkSelectedTextInput, 200);
    },
    _onLayout(event){
        this.state.scrollViewLayout = event.nativeEvent.layout;
        this.setState(this.state);
    },
    resetKeyboardSpace: function () {
        this.state.keyboardSpace = 0;
        this.setState(this.state);
        setTimeout(this.checkSelectedTextInput, 200);
    },
    componentDidMount: function () {
        DeviceEventEmitter.addListener('keyboardWillShow', this.updateKeyboardSpace);
        DeviceEventEmitter.addListener('keyboardWillHide', this.resetKeyboardSpace);
    },
    componentWillUnmount() {
        DeviceEventEmitter.removeAllListeners('keyboardWillShow');
        DeviceEventEmitter.removeAllListeners('keyboardWillHide');
    },
    _onScroll(event){
        this.state.contentOffset = event.nativeEvent.contentOffset;
        this.setState(this.state);
    },
    scrollToTop(){
        this.refs.keyboardScrollView.scrollTo({x: 0, y: 0});
    },
    render(){
        return (
            <ScrollView ref="keyboardScrollView" onScroll={this._onScroll}
                        contentInset={{bottom: this.state.keyboardSpace}}
                        onLayout={(event) => this._onLayout(event)} {...this.props}>{this.props.children}</ScrollView>
        );
    }
});
module.exports = KeyboardScrollView;