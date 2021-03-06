import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native'

export default class RecommendInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.infoTop}>
          <Text allowFontScaling={false} style={styles.h3}>位置信息：</Text>
          <View style={styles.bottomInfo}>
            <Text allowFontScaling={false}>土地来源：招拍挂</Text>
            <Text allowFontScaling={false}>所在地区：北京市朝阳区四环到五环之间</Text>
            <Text allowFontScaling={false}>详细地址：远洋国际中心A座</Text>
          </View>
        </View>
        <View style={styles.infoBottom}>
          <View style={styles.bottomH3}>
            <Text allowFontScaling={false} style={styles.h3}>地块详情:</Text>
          </View>
          <View style={styles.bottomContain}>
            <View style={styles.bottomInfo}>
              <Text allowFontScaling={false}>用地性质：居住用地</Text>
              <Text allowFontScaling={false}>规划建筑面积：30000㎡</Text>
              <Text allowFontScaling={false}>绿化率：30%</Text>
              <Text allowFontScaling={false}>通平情况：七通一平</Text>
              <Text allowFontScaling={false}>推出时间：2015-09-20</Text>
            </View>
            <View style={styles.bottomInfo}>
              <Text allowFontScaling={false}>建设用地面积：10000㎡</Text>
              <Text allowFontScaling={false}>出让形式：招标</Text>
              <Text allowFontScaling={false}>限高：100米</Text>
              <Text allowFontScaling={false}>拆迁情况：已拆迁</Text>
              <Text allowFontScaling={false}>起始价：185万元</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column'
  },
  infoTop: {
    flexDirection: 'column'
  },
  infoBottom: {

  },
  h3: {
    fontWeight: 'bold'
  },
  bottomH3: {

  },
  bottomContain: {
    flexDirection: 'row'
  },
  bottomInfo: {
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 10
  }
})
