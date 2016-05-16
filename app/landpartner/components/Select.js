/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Dimensions,
  Component,
  StyleSheet,
  Text,
  Picker,
  View
} from 'react-native';

export default class Select extends Component {
  constructor(props) {
    super(props)
    this.state = {
      def: this.props.def,
      language: ''
    }
  }

  render() {
    let pickerItems = this.props.pickerItems
    return (
      <View style={styles.container}>
      <Text>这是选择器</Text>
        <Picker
        selectedValue={this.state.def}
        onValueChange={(value) => this.setState({value: value})}
        mode="dropdown"
        style={styles.selectMe}>
          for (var pickerItem of pickerItems) {
            <Picker.Item label={pickerItem.label} value={pickerItem.value} />
          }
        </Picker>
        <Text>
        你选择的值是:{this.state.language}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  selectMe: {
    width: 100
  }
});
