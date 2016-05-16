import React, {
	Component,
	Dimensions,
	StyleSheet,
	Image,
	Text,
	Picker,
	ScrollView,
	View
} from 'react-native'
import ActionBar from '../control/ActionBar'
import ProcessNav from './components/ProcessNav'
import InputLabel from './components/InputLabel'
import Button from './components/button'
import TransLand from './components/TransLand'
import AddRecom from './components/AddRecom'
import StorageUtil from '../utils/StorageUtil'
import SelectDataInfo from '../control/SelectDataInfo'
import Rules from './components/Rules'
var partnerData = {}
var typeinData = {}

var LandIndex = React.createClass({
	getInitialState() {
		return {
			LandSourcesName: '招拍挂',
			LandSourcesCode: '503ef520925049c4af8630e4b0505ca0',
			isShowSelectArea: 0,
			locationName: '请选择地区',
			position: '',
			selections: []
		}
	},
	_nextFun() {
		typeinData.LandSourcesCode = this.state.LandSourcesCode
		if (this.state.LandSourcesCode == '503ef520925049c4af8630e4b0505ca0') {
			this.props.jumpPushPage(AddRecom, 'addRecom', paramsAddRecom={...typeinData})
		} else {
			this.props.jumpPushPage(TransLand, 'transLand', paramsTransLand={...typeinData})
		}
	},
	getValue(value, label) {
		if (label == 'AddressDetail') {
      typeinData.AddressDetail = value
    }
	},
	showSelectDataReturn(id, name, tag, allID, allName) {
		this.state.isShowSelectArea = 0
		typeinData.LandSourcesCode = this.state.LandSourcesCode
		typeinData.Province = allName[0]
		typeinData.City = allName[1]
		typeinData.County = allName[2]
		let locationName = ''
		for (let item of allName) {
			locationName += item + '  '
		}
		this.state.locationName = locationName
		this.setState(this.state)
	},
	componentWillMount() {
		StorageUtil.getStorageItem('Partner', (error, result) =>{
			if (result) {
				partnerData = JSON.parse(result)
				for (let item of partnerData.data.LandResource.data) {
					 this.state.selections.push(<Picker.Item label={item.Name} value={item.Code} key={item.Code} />)
				}
				this.setState(this.state)
			} else {
				this.props.sendPostJSON({
		      url: 'http://mobiletest.yuanxin2015.com/LandPartnerAPI/api/LandInfo/GenerateDataDictionary',
		      success: (response) => {
						let selections = []
						for (let item of JSON.parse(response.message).data.LandResource.data) {
							selections.push(<Picker.Item label={item.Name} value={item.Code} key={item.Code} />)
						}
						this.setState({selections: selections})
						StorageUtil.setStorageItem('Partner', response.message)
					}
		    })
			}
		})
	},
	render() {
		let actionBarProp = {
			actionName: "土地合伙人",
			isDefaultBack: this.props.jumpPop,
			actionBarRightProp: {
				text: "查看规则",
				click: () => this.props.jumpPushPage(Rules, "rules")
			}
		}
		if (this.state.isShowSelectArea != 0) {
			let selectDataProps = {
				tag: 'area',
				storageKey: StorageUtil.AreaList,
				returnData: this.showSelectDataReturn
			}
			return (
				<View style={styles.container}>
					<ActionBar {...actionBarProp} />
					<ScrollView>
						<SelectDataInfo {...selectDataProps} />
					</ScrollView>
				</View>
			)
		} else {

			return (
				<View style={styles.container}>
					<ActionBar {...actionBarProp} />
					<ProcessNav status={1} />
					<View style={styles.greyLine}></View>

					<View style={styles.pickerControl}>
						<View style={styles.pickerTextContainer}>
							<Text style={styles.pickerText} >土地来源</Text>
						</View>

						<Picker
							selectedValue={this.state.LandSourcesCode}
							onValueChange={(value, label) => this.setState({LandSourcesCode: value, LandSourcesName: label})}
							mode="dropdown"
							style={styles.selectMe}>
						{this.state.selections}
						</Picker>
					</View>
					<View style={styles.selectContainer}>
						<Text style={styles.selectLeft}>所在地区</Text>
						<Text style={styles.selectRight} onPress={()=>this.setState({isShowSelectArea: 1})}>{this.state.locationName}</Text>
					</View>
					<InputLabel label="详细地址" tabs="AddressDetail" getValue={this.getValue} />
					<View style={styles.btnContainer}>
						<Button btnText="下一步" clickFun={this._nextFun} />
					</View>
				</View>
			)
		}

	}
})

const styles = StyleSheet.create({
  container: {
		height: Dimensions.get('window').height - 30,
    backgroundColor: '#FFFFFF',
  },
	greyLine: {
    height: 10,
    backgroundColor: '#efeff4',
    alignSelf: 'stretch'
  },
	btnContainer: {
		alignSelf: 'stretch',
		padding: 10,
		marginTop: 20
	},
	Addresscontainer:{
		flexDirection:'row',
		alignSelf:'stretch',
		alignItems: 'center',
		borderBottomColor:'#eaeaea',
		borderBottomWidth:1,
		padding: 10
	},
	AddressImg:{
		width:20,
		height:25,
		marginRight: 10
	},
	selectMe: {
		width: 140
	},
	pickerControl: {
    height: 50,
		alignSelf: 'stretch',
    flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb'
  },
	pickerTextContainer: {
    width: 100,
		height: 35,
		justifyContent: 'center'
	},
	pickerText: {
		color:'#000',
		fontSize:16,
  },
	selectContainer: {
		height: 50,
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#ebebeb'
	},
	selectLeft: {
		marginLeft: 10,
		marginRight: 40,
		fontSize: 16,
		color: '#000000'
	},
	selectRight: {
		fontSize: 16,
		flex: 1,
		alignSelf: 'stretch',
		marginTop: 15
	}
});
module.exports = LandIndex;
