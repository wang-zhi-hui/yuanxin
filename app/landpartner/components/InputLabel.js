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
			tag = <Text>{this.props.tags}</Text>
		}
		return (
			<View style={styles.container}>
				<Text style={styles.labelText}>
					{this.props.label}
				</Text>
				<TextInput
					onChangeText={(text) => this.getInputValue(text)}
					style={styles.labelInput}
					placeholder="请输入"
					keyboardType={this.props.boardType}
					defaultValue={this.state.value}
				/>
				{tag}
			</View>
		)
	}
})


const styles = StyleSheet.create({
	container: {
		height: 50,
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: '#ebebeb',
		paddingLeft: 10
	},
	labelText: {
		width: 100,
		height: 30,
		lineHeight: 30,
		color:'#000',
		fontSize:16,
		marginTop: 20
	},
	labelInput: {
		flex: 1,
		height: 50,
		lineHeight: 50,
		fontSize:16,
		marginTop:9,
		marginLeft:20,

	},

})

module.exports = InputLabel;
