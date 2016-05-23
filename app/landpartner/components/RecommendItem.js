import React, {
    Component,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
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
            <Text allowFontScaling={false} style={styles.CreateTimeText}>{this.props.CreateTime}</Text>
            <View style={styles.evaluateText}>
              <Text allowFontScaling={false} style={styles.evaluate}>{this.props.StatusImageInfoName}</Text>
            </View>
          </View>
          <View style={styles.reAddress}>
            <Text allowFontScaling={false} style={styles.reLandLeft}>土地来源：<Text allowFontScaling={false} style={styles.reLandLeftText}>{this.props.LandSourcesName}</Text></Text>
            <Text allowFontScaling={false} style={styles.reLandLeft}>建设用地面积：<Text allowFontScaling={false} style={styles.reLandLeftText}>{this.props.BuildLandAreas}m²</Text></Text>
            <Text allowFontScaling={false} style={styles.reLandLeft}>所在地区： <Text allowFontScaling={false} style={styles.reLandLeftText}>{this.props.Address}</Text></Text>
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
    flex:1,
  },
  CreateTimeText:{

  },
  reStatus: {
    marginLeft:10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:12,
  },
  reAddress: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop:4,
    marginBottom:10,
  },
  reLandLeft:{
    marginLeft:10,
    marginTop:2,

  },
  reLandLeftText:{
    fontSize:15,
    color:'#a7a7a7'
  },
  reLandRight:{
    marginTop:3,
    marginLeft:20,
  },
  reLandRightText:{
    fontSize:15,
    color:'#a7a7a7'
  },
  noSub: {
    color:'#a7a7a7'
  },
  evaluateText:{
    position:'absolute',
    top:-3,
    right:10,
    borderWidth:1,
    borderColor:'#ff5001',
    borderRadius:5,
    paddingLeft:6,
    paddingRight:6,
    paddingTop:3,
    paddingBottom:3,
  },
  evaluate: {
    color: '#ff5001',
    alignItems:'center'
  }
})
