import React, {
  Component,
  Dimensions,
  StyleSheet,
  Text,
  View
} from 'react-native'
import TouchRowControl from '../../control/TouchRowControl'
import ActionBar from '../../control/ActionBar'

export default class Rule1 extends Component{

  render() {
    return (
      <View style={styles.container}>
        <ActionBar actionName="合伙人须知"  isDefaultBack={this.props.jumpPop} />
        <Text style={styles.showText}>
          这里是合伙人须知的具体内容
        </Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    backgroundColor: '#FFFFFF'
  },
  showText: {
    fontSize: 16,
    lineHeight: 24,
    margin:10,
  }
})
