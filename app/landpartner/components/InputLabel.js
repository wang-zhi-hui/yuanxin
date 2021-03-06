import React, {
	Component,
	StyleSheet,
	View,
	Text,
	TextInput
} from 'react-native'
import Util from '../../utils/Util'
import StorageUtil from '../../utils/StorageUtil'
var InputLabel = React.createClass({
	getInitialState() {
		return {
			value: '',
		}
	},
	getInputValue(value) {
		this.props.getValue(value, this.props.tabs)
	},
	componentWillMount() {
		this.setState({value: this.props.value})
	},
	render(){
		let tag = null
		if (this.props.tags) {
			tag = <Text allowFontScaling={false} style={styles.starView}>{this.props.tags}</Text>
		}
		return (
			<View style={styles.container}>
				<View style={styles.labelTextView}>
					<Text allowFontScaling={false} style={styles.labelLeftText}>
						{this.props.label}
					</Text>
				</View>
				<View style={styles.labelTextRightView}>
						<TextInput
							underlineColorAndroid="transparent"
							placeholderTextColor="#a7a7a7"
							onChangeText={(text) => this.getInputValue(text)}
							style={styles.labelInput}
							placeholder="请输入"
							placeholderTextColor="#a7a7a7"
							keyboardType={this.props.boardType}
							defaultValue={this.state.value}
						/>
					</View>
				{tag}
			</View>
		)
	}
})


const styles = StyleSheet.create({
	container: {
		height: 40,
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: '#ebebeb',
		paddingLeft: 10
	},
	starView:{
		fontSize:12,
		color:'#a7a7a7',
		position:'absolute',
		top:10,
		right:10,
	},
	star:{
		position:'absolute',
		top:10,
		left:5,
		fontSize:12,
		color:'#f00',
	},
	labelTextView:{
		flex:4,
		justifyContent: 'center',
	},
	labelTextLeftView:{
		justifyContent:'center',
	},
	labelLeftText: {
		color:'#3b3b3b',
		fontSize:15,
		marginLeft:5,
	},
	labelTextRightView:{
		flex: 6,
		justifyContent:'center',
		alignSelf:'center'
	},
	labelInput: {
		height: 40,
		fontSize: 15,
		color: '#a7a7a7',
		paddingTop:11,
		paddingBottom:10

	}
})

module.exports = InputLabel;
