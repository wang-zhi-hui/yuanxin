import React, {
  Component,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  View
} from 'react-native'
import ProcessNav from './ProcessNav'
import ActionBar from '../../control/ActionBar'

export default class SubSuccess extends Component {
  constructor(props) {
    super(props)
    this.state = {
      actionName: '推荐'
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <ActionBar actionName={this.state.actionName} isDefaultBack={this.props.jumpPop} />
        <View style={styles.header}>
          <Text allowFontScaling="false" style={styles.headerText}>{paramsSubSuccess.successTille}</Text>
        </View>
        <ProcessNav status={3} />
        <View style={styles.greyLine}>
        </View>
        <View style={styles.success}>
          <Image
            source={require('../images/subOk.png')}
            style={styles.subOk}
          />
          <Text allowFontScaling={false} style={styles.subText}>
            提交成功！
          </Text>
          <Text allowFontScaling={false} style={styles.subDesc}>
            非常感谢您的参与！项目情况有了新的进展将会及时跟您联系，请及时关注！
          </Text>
        </View>

      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
    height: Dimensions.get('window').height
  },
  success: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 50
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#FF5001',
    borderStyle: 'solid',
    padding: 5
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20
  },
  greyLine: {
    height: 10,
    backgroundColor: '#efeff4',
  },
  subOk: {
    width: 126,
    height: 126,
  },
  subText: {
    fontSize: 20,
    color: '#ff0000',
    margin: 30
  },
  subDesc: {
    fontSize: 15,
    padding: 15
  }
})
