
import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native'
import ActionBar from '../control/ActionBar'
import LandIndex from './LandIndex'
import Recommend from './Recommend'
import FormRowInput from '../control/FormRowInput'
import InputLabel from './components/InputLabel'
import ProgramInfo from './components/ProgramInfo'
import StorageUtil from '../utils/StorageUtil'
var Partner = React.createClass({
  getInitialState() {
    return {
      actionName: "合伙人"
    }
  },
  componentWillMount() {
    this.props.sendPostJSON({
      url: 'http://www.yuanxin2015.com/MobileBusiness/LandInfoService/api/LandInfo/GenerateDataDictionary',
      success: (response) => {
        StorageUtil.setStorageItem('Partner', response.message)
        StorageUtil.setStorageItem('Area_Landpartner', JSON.stringify(JSON.parse(response.message).area))
      }
    })

  },
  render: function() {
    return (

      <View style={styles.container}>
        <LandIndex {...this.props} />

      </View>
    )
  }
})
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1
  }
})
module.exports = Partner;
