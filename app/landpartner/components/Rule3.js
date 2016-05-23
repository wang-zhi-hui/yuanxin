import React, {
  Component,
  Dimensions,
  StyleSheet,
  Text,
  View
} from 'react-native'
import TouchRowControl from '../../control/TouchRowControl'
import ActionBar from '../../control/ActionBar'

export default class Rules extends Component{

  render() {
    return (
      <View style={styles.container}>
        <ActionBar actionName="平台用户协议"  isDefaultBack={this.props.jumpPop} />
        <Text allowFontScaling={false} style={styles.showText}>
          这里是平台用户协议的具体内容
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
    margin: 10,
    fontSize: 16,
    lineHeight: 24
  }
})
