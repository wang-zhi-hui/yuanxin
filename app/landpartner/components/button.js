import React, {
	Component,
	StyleSheet,
	View,
	Text,
	TouchableOpacity
} from 'react-native'

class Button extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		return (
			<TouchableOpacity
				style={styles.btn}
				onPress={() => this.props.clickFun()}>
					<Text style={styles.btnText} >{this.props.btnText}</Text>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	btn: {
		alignSelf: 'stretch',
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FF0000',
		borderRadius: 10
	},
	btnText: {
		color: '#FFFFFF',

	}
})

module.exports = Button
