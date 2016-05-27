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
var pageIndex = 1
var Recommend = React.createClass({
  getInitialState() {

    return {
      actionName: '我的推荐',
      // dataSource: ds.cloneWithRows(dataSource)
      dataSource: []
    }
  },
  componentWillMount() {
    this.props.maskViewHandler(true)
      this.props.sendPostJSON({
        url: 'http://www.yuanxin2015.com/MobileBusiness/LandInfoService/api/LandInfo/LoadRecommendList',
        body: JSON.stringify({pageIndex: 1, pageSize: 10}),
        success: (response) => {
          console.log(response.message)
          this.setState({dataSource: JSON.parse(response.message).data.LandInfo})
          this.props.maskViewHandler(false)
        }
      })
  },
  fetchData(){
    pageIndex+=1
    this.props.sendPostJSON({
      url: 'http://www.yuanxin2015.com/MobileBusiness/LandInfoService/api/LandInfo/LoadRecommendList',
      body: JSON.stringify({pageIndex: pageIndex, pageSize: 10}),
      success: (response) => {
        for (let item of JSON.parse(response.message).data.LandInfo) {
          this.state.dataSource.push(item)
        }
        this.setState(this.state)
        this.props.maskViewHandler(false)
      }
    })
  },
  _next(result) {
    this.props.jumpPushPage(RecommendDesc, 'recommendDesc')
  },
  render() {
    return (
      <View style={styles.container}>
        <ActionBar allowFontScaling="false" actionName="我的推荐" isDefaultBack={this.props.jumpPop} />
        <ListView
          dataSource={ds.cloneWithRows(this.state.dataSource)}
          onEndReachedThreshold={30}
          onEndReached={this.fetchData}
          renderRow={(rowData) => <RecommendItem {...rowData} {...this.props} /> }
          renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.greyLine} />}
        />
      </View>
    );
  }
})

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
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
