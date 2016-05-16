import ALocation from 'react-native-amap-location';
import React,{
  Component,
  Dimensions,
  View,
  StyleSheet,
  Text
} from 'react-native'
import StorageUtil from '../../utils/StorageUtil'

var AmapGhl=React.createClass({

  componentDidMount() {
    this.unlisten = ALocation.addEventListener((data) =>
      StorageUtil.setStorageItem('position', data.address)
    )
    ALocation.startLocation({
      accuracy: 'HighAccuracy',
      killProcess: true,
      needDetail: true,
    });
  },
  componentWillUnmount() {
    ALocation.stopLocation();
    this.unlisten();
  },
  render() {
    return (
      <View style={styles.container}>
      </View>
    )
  }
});
const styles = StyleSheet.create({
  address: {
    flexWrap: 'wrap',
    width: Dimensions.get('window').width - 50,
    alignSelf: 'stretch',
    fontSize: 16
  }
})


module.exports = AmapGhl;
