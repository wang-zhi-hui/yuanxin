/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Select extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.name,
      value: this.props.value
    }
  }
  setValue(result) {
    const {name} = this.state
    const {value} = this.state
    if (value.indexof(result != -1)) {

    }
  }
  render() {
    <SegmentedControlIOS
      values={this.state.value}
      selectedIndex={1}
      onValueChange={(value) => this.setValue(value)}
    />
  }
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
