import React, {
  Component,
  Dimensions,
  StyleSheet,
  Text,
  ListView,
  View
} from 'react-native'
import TouchRowControl from '../../control/TouchRowControl'
import ActionBar from '../../control/ActionBar'
import Rule from './Rule'
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})

export default class Rules extends Component{
  constructor(props){
    super(props)
    this.state = {
      rulelist: []
    }
  }
  componentWillMount() {
    this.props.maskViewHandler(true)
    this.props.sendPostJSON({
      url: 'http://mobiletest.yuanxin2015.com/LandPartnerAPI/api/LandInfo/LoadProtocolRruleInfoList',
      success: (response) => {
        this.props.maskViewHandler(false)
        let rulelist = JSON.parse(response.message).data.ProtocolRule
        this.setState({rulelist: rulelist})
      }
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <ActionBar actionName="用户协议"  isDefaultBack={this.props.jumpPop} />
        <ListView
          dataSource={ds.cloneWithRows(this.state.rulelist)}
          renderRow={(rowData) => <TouchRowControl text={rowData.Name} userTouch={() => this.props.jumpPushPage(Rule, "rule", params={...rowData})} />}
          renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.greyLine} />}
        />
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
