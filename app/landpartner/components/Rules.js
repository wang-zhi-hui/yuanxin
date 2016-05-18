import React, {
  Component,
  Dimensions,
  StyleSheet,
  Text,
  View
} from 'react-native'
import TouchRowControl from '../../control/TouchRowControl'
import ActionBar from '../../control/ActionBar'
import Rule1 from './Rule1'
import Rule2 from './Rule2'
import Rule3 from './Rule3'

export default class Rules extends Component{

  render() {
    return (
      <View style={styles.container}>
        <ActionBar actionName="用户协议"  isDefaultBack={this.props.jumpPop} />
        <View style={styles.greyLine}></View>
        <TouchRowControl text="合伙人须知" userTouch={() => this.props.jumpPushPage(Rule1, "rule1")} />
        <View style={styles.greyLine}></View>
        <TouchRowControl text="合伙人协议" userTouch={() => this.props.jumpPushPage(Rule2, "rule2")} />
        <View style={styles.greyLine}></View>
        <TouchRowControl text="平台用户协议" userTouch={() => this.props.jumpPushPage(Rule3, "rule3")} />
        <View style={styles.greyLine}></View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    backgroundColor: '#FFFFFF'
  },
  greyLine: {
    height: 10,
    backgroundColor: '#efeff4',
    alignSelf: 'stretch'
  },
})
