import React, {
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import RecommendDesc from './RecommendDesc'

export default class RecommendItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: this.props.status
    }
  }
  _nextFun() {
    this.props.jumpPushPage(RecommendDesc, 'recommendDesc', paramsRecommendDesc={...this.props})
  }
  render() {
    return (
      <TouchableHighlight onPress={this._nextFun.bind(this)}>
        <View style={styles.container}>
          <View style={styles.reStatus}>
            <Text>{this.props.CreateTime}</Text>
            <Text style={styles.evaluate}>{this.props.StatusImageInfoName}</Text>
          </View>
          <View style={styles.reAddress}>
            <Text>所在地区：{this.props.Address}</Text>
          </View>
          <View style={styles.reLand}>
            <Text>建设用地面积：{this.props.BuildLandAreas}</Text>
            <Text>土地来源：{this.props.LandSourcesName}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    flex: 1
  },
  reStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb',
    padding: 5
  },
  reAddress: {
    marginTop: 10,
    marginBottom: 10,
    padding: 5
  },
  reLand: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5
  },
  noSub: {
    color: '#666'
  },
  evaluate: {
    color: '#FF0000'
  }
})
