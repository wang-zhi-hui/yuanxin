import React, {
  Component,
  Dimensions,
  View,
  Text,
  ListView,
  StyleSheet
} from 'react-native'
import RecommendItem from './components/RecommendItem'
import StorageUtil from '../utils/StorageUtil'
import ActionBar from '../control/ActionBar'
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
var dataSource = []

var Recommend = React.createClass({
  getInitialState() {

    return {
      actionName: '我的推荐',
      dataSource: ds.cloneWithRows(dataSource)
    }
  },
  componentWillMount() {
      this.props.sendPostJSON({
        url: 'http://mobiletest.yuanxin2015.com/LandPartnerAPI/api/LandInfo/LoadRecommendList',
        success: (response) => this.setState({dataSource: ds.cloneWithRows(JSON.parse(response.message).data.LandInfo)})
      })
  },
  _next(result) {
    this.props.jumpPushPage(RecommendDesc, 'recommendDesc')
  },
  render() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    return (
      <View style={styles.container}>
        <ActionBar actionName={this.state.actionName} isDefaultBack={this.props.jumpPop} />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <RecommendItem {...rowData} {...this.props} /> }
          renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.greyLine} />}
        />
      </View>
    );
  }
})

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height - 30,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF'
  },
  greyLine: {
    height: 10,
    flex: 1,
    backgroundColor: '#efeff4',
    alignSelf: 'stretch'
  }
})
module.exports = Recommend;
