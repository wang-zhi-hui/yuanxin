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
import ALocation from 'react-native-amap-location'
import ActionBar from '../control/ActionBar'
import ButtonControl from '../control/ButtonControl'
import TabNavigator from '../control/TabNavigator'
import InputLabel from './components/InputLabel'
import TransLand from './components/TransLand'
import AddRecom from './components/AddRecom'
import StorageUtil from '../utils/StorageUtil'
import SelectDataInfo from '../control/SelectDataInfo'
import Rules from './components/Rules'
var typeinData = {}

var LandIndex = React.createClass({
	getInitialState() {
		return {
			LandSourcesName: '招拍挂',
			isShowSelectArea: 0,
			locationName: '请选择地区',
			position: '',
			selections: []
		}
	},
	_nextFun() {
		if (this.state.LandSourcesName == '招拍挂') {
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
				lists = JSON.parse(result).data.LandResource.data
				let selections = []
				for (let i = 0; i < lists.length; i++) {
					selections.push({text: lists[i].Name, selected: false, code: lists[i].Code, click: () => this.setValue(i)})
				}
				this.setState({selections: selections})
			} else {
				this.props.sendPostJSON({
		      url: 'http://mobiletest.yuanxin2015.com/LandPartnerAPI/api/LandInfo/GenerateDataDictionary',
		      success: (response) => {
						let selections = []
						let lists = JSON.parse(response.message).data.LandResource.data
						for (let i = 0; i < lists.length; i++) {
							selections.push({text: lists[i].Name, selected: false, code: lists[i].Code, click: () => this.setValue(i)})
						}
						this.setState({selections: selections})
						StorageUtil.setStorageItem('Partner', response.message)
					}
		    })
			}
		})
	},
	setValue(result) {
		const {selections} = this.state
		for (let item of selections) {
			item.selected = false
		}
		selections[result].selected = true
		this.state.selections = selections
		this.state.LandSourcesName = selections[result].text
		typeinData.LandSourcesCode = selections[result].code
		this.setState(this.state)
	},
	getPosition() {
		this.unlisten = ALocation.addEventListener((data) => this.setState({position: data.address}))
		ALocation.startLocation({
      accuracy: 'HighAccuracy',
      killProcess: true,
      needDetail: true,
    })
		ALocation.stopLocation()
    this.unlisten()

	},
	render() {

		if (this.state.isShowSelectArea != 0) {
			let actionBarProp = {
				actionName: "土地合伙人",
				actionBarRightProp: {
					text: "用户协议",
					click: () => this.props.jumpPushPage(Rules, "rules")
				}
			}
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
			let actionBarProp = {
				actionName: "土地合伙人",
				isDefaultBack: this.props.jumpPop,
				actionBarRightProp: {
					text: "用户协议",
					click: () => this.props.jumpPushPage(Rules, "rules")
				}
			}
			let tabNavigatorProps = {
				tabList: this.state.selections,
				borderColor: "#FF5001",
				itemColor: "#FFFFFF",
				itemSelectedColor: "#FF5001",
				textColor: "#FF5001",
				textSelectedColor: "#FFFFFF"
			}
			return (
				<View style={styles.container}>
					<ActionBar {...actionBarProp} />
					<View style={styles.pickerControl}>
						<View style={styles.pickerTextContainer}>
							<Text style={styles.pickerText} >土地来源</Text>
						</View>
						<View style={styles.pickerLeftControl}>
							<View style={styles.selectMe}>
								<TabNavigator {...tabNavigatorProps} />
							</View>
						</View>
					</View>
					<View style={styles.selectContainer}>
						<Text style={styles.selectLeft}>所在地区</Text>
						<Text style={styles.selectRight} onPress={()=>this.setState({isShowSelectArea: 1})}>{this.state.locationName}</Text>
					</View>
					<View style={styles.InputLabelText}>
						<InputLabel label="详细地址" tabs="AddressDetail" getValue={this.getValue} />
					</View>
					<ButtonControl
						userClick={this._nextFun}
						buttonStyle={styles.btnContainer}
						buttonTextStyle={styles.btnText}
						buttonText="下一步"
					/>
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
		height:40,
		margin:10,
		marginTop: 20,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		backgroundColor: '#ff5001',
	},
	btnText:{
		justifyContent: 'center',
		alignItems: 'center',
		color:'#fff',
		fontSize:15,
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

	pickerControl: {
		height: 40,
		alignSelf: 'stretch',
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#ebebeb'
	},
	pickerLeftControl: {
		flex:7,
		height: 40,
		alignSelf: 'stretch',
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#ebebeb'
	},
	pickerTextContainer: {
		flex:3,
		justifyContent: 'center'
	},
	pickerText: {
		color:'#3b3b3b',
		fontSize:15,
		marginTop:3,
  },
	selectMe: {
		flex:7,
		marginRight:10,
	},
	selectContainer: {
		height: 40,
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#ebebeb'
	},
	selectLeft: {
		flex:3,
		marginLeft: 10,
		fontSize: 15,
		color: '#3b3b3b'
	},
	selectRight: {
		fontSize: 15,
		flex:7,
		color:"#a7a7a7"
	},

});
module.exports = LandIndex;
