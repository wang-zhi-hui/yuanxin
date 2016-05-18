import React, {
  Component,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  DatePickerAndroid,
  Picker,
  ListView,
  ScrollView,
  View
} from 'react-native'
import InputLabel from './InputLabel'
import ButtonControl from '../../control/ButtonControl'
import TabNavigator from '../../control/TabNavigator'
import SelectDataInfo from '../../control/SelectDataInfo'
import ActionBar from '../../control/ActionBar'
import StorageUtil from '../../utils/StorageUtil'
import Util from '../../utils/Util'
var typeinData = {
  LandInfo: {}
}

export default class TransLandEdit extends Component{
  constructor(props) {
    super(props)
    this.state = {
      actionName: '土地信息',
      EstimateTransferTime: paramsTransLand.EstimateTransferTime,
      isShowSelectArea: 0,
      LandNature: [],
      RelocatesSituation: [],
      LevelingCondition: paramsTransLand.MunicipalSupporName
    }
  }
  _submit() {
    typeinData.OperationType = 0
    if (this.state.LaunchTime != '请选择日期') {
      typeinData.LandInfo.LaunchTime = this.state.LaunchTime
    }
    typeinData.LandInfo.Code = paramsTransLand.Code
    typeinData.LandInfo.LandSourcesCode = paramsTransLand.LandSourcesCode
    typeinData.LandInfo.Province = paramsTransLand.Province
    typeinData.LandInfo.City = paramsTransLand.City
    typeinData.LandInfo.County = paramsTransLand.County
    typeinData.LandInfo.AddressDetail = paramsTransLand.AddressDetail
    typeinData.LandInfo.LandNatureCode = this.state.LandNatureCode
    typeinData.LandInfo.MunicipalSupporCode = this.state.MunicipalSupporCode
    typeinData.LandInfo.DemolitionSituationCode = this.state.DemolitionSituationCode
    if (typeinData.LandInfo.LandNatureCode == '') {
      return Util.AlertMessage('用地性质不能为空')
    }
    if (typeinData.LandInfo.BuildLandAreas == '') {
      return Util.AlertMessage('请填写建筑用地面积')
    }
    if (typeinData.LandInfo.PlanBuildAreas == '') {
      return Util.AlertMessage('请填写用规划建筑面积')
    }
    this.props.maskViewHandler(true)
    this.props.sendPostJSON({
      url: 'http://mobiletest.yuanxin2015.com/LandPartnerAPI/api/LandInfo/UpdateLandInfoToLandDataBaseAndSeagull2DataBase',
      body: JSON.stringify(typeinData),
      success: (response) => {
        this.props.maskViewHandler(false)
        if (JSON.parse(response.message).status == 'SUCCESS') {
          Util.AlertMessage("提交成功")
          this.props.navigator.popToTop()
        } else {
          Util.AlertMessage("提交失败")
          this.props.navigator.popToTop()
        }
      }
    })
  }
  getValue(value, label) {
    if (label == 'LandScope') {
      typeinData.LandInfo.LandScope = value
    }
    if (label == 'PlanBuildAreas') {
      typeinData.LandInfo.PlanBuildAreas = value
    }
    if (label == 'BuildLandAreas') {
      typeinData.LandInfo.BuildLandAreas = value
    }
    if (label == 'GreeninGate') {
      typeinData.LandInfo.GreeninGate = value
    }
    if (label == 'HighLimit') {
      typeinData.LandInfo.HighLimit = value
    }
    if (label == 'EstimateTransferTime') {
      typeinData.LandInfo.LaunchTime = value
    }
    if (label == 'EstimateTransactionPrice') {
      typeinData.LandInfo.StartingPrice = value
    }
  }
  componentWillMount() {
    StorageUtil.getStorageItem('Partner', (error, result) =>{
      if (result) {
        let partnerData = JSON.parse(result)
        let LandNature = []
        let LevelingCondition = []
        let RelocatesSituation = []

        let listLandNature = partnerData.data.LandNature.data
        for (let i = 0; i < listLandNature.length; i++) {
          if (listLandNature[i].Code == paramsTransLand.LandNatureCode) {
            LandNature.push({text: listLandNature[i].Name, selected: true, code: listLandNature[i].Code, click: ()=>this.setValue(i, "LandNature")})
          } else {
            LandNature.push({text: listLandNature[i].Name, selected: false, code: listLandNature[i].Code, click: ()=>this.setValue(i, "LandNature")})
          }
        }
        let listRelocatesSituation = partnerData.data.RelocatesSituation.data
        for (let i = 0; i < listRelocatesSituation.length; i++) {
          if (listRelocatesSituation[i].Code == paramsTransLand.DemolitionSituationCode) {
            RelocatesSituation.push({text: listRelocatesSituation[i].Name, selected: true, code: listRelocatesSituation[i].Code, click: ()=>this.setValue(i, "RelocatesSituation")})
          } else {
            RelocatesSituation.push({text: listRelocatesSituation[i].Name, selected: false, code: listRelocatesSituation[i].Code, click: ()=>this.setValue(i, "RelocatesSituation")})
          }
        }
        this.setState({
          LandNature: LandNature,
          LevelingCondition: LevelingCondition,
          RelocatesSituation: RelocatesSituation
        })
      } else {
        this.props.sendPostJSON({
          url: 'http://mobiletest.yuanxin2015.com/LandPartnerAPI/api/LandInfo/GenerateDataDictionary',
          success: (response) => {
            let partnerData = JSON.parse(response.message)
            let LandNature = []
            let LevelingCondition = []
            let RelocatesSituation = []

            let listLandNature = partnerData.data.LandNature.data
            for (let i = 0; i < listLandNature.length; i++) {
              if (listLandNature[i].Code == paramsTransLand.LandNatureCode) {
                LandNature.push({text: listLandNature[i].Name, selected: true, code: listLandNature[i].Code, click: ()=>this.setValue(i, "LandNature")})
              } else {
                LandNature.push({text: listLandNature[i].Name, selected: false, code: listLandNature[i].Code, click: ()=>this.setValue(i, "LandNature")})
              }
            }
            let listRelocatesSituation = partnerData.data.RelocatesSituation.data
            for (let i = 0; i < listRelocatesSituation.length; i++) {
              if (listRelocatesSituation[i].Code == paramsTransLand.DemolitionSituationCode) {
                RelocatesSituation.push({text: listRelocatesSituation[i].Name, selected: true, code: listRelocatesSituation[i].Code, click: ()=>this.setValue(i, "RelocatesSituation")})
              } else {
                RelocatesSituation.push({text: listRelocatesSituation[i].Name, selected: false, code: listRelocatesSituation[i].Code, click: ()=>this.setValue(i, "RelocatesSituation")})
              }
            }
            this.setState({
              LandNature: LandNature,
              LevelingCondition: LevelingCondition,
              RelocatesSituation: RelocatesSituation
            })
            StorageUtil.setStorageItem('Partner', response.message)
          }
        })
      }
		})
    typeinData.LandInfo.LandNatureCode = paramsTransLand.LandNatureCode
    typeinData.LandInfo.MunicipalSupportCode = paramsTransLand.MunicipalSupportCode
    typeinData.LandInfo.DemolitionSituationCode = paramsTransLand.DemolitionSituationCode
    typeinData.LandInfo.LandScope = paramsTransLand.LandScope
    typeinData.LandInfo.PlanBuildAreas = paramsTransLand.PlanBuildAreas
    typeinData.LandInfo.BuildLandAreas = paramsTransLand.BuildLandAreas
    typeinData.LandInfo.GreeninGate = paramsTransLand.GreeninGate
    typeinData.LandInfo.HighLimit = paramsTransLand.HighLimit
    typeinData.LandInfo.LaunchTime = paramsTransLand.LaunchTime
    typeinData.LandInfo.StartingPrice = paramsTransLand.StartingPrice
  }
  async showPicker(stateKey, options) {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open(options)
        var date = new Date(year, month, day)
        this.state.showText = date.toLocaleDateString()
      this.setState(this.state)
    } catch ({code, message}) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  }
  setValue(item, result) {
    const {LandNature} = this.state
    const {LevelingCondition} = this.state
    const {RelocatesSituation} = this.state
    if (result == "LandNature") {
      for (let item of LandNature) {
        item.selected = false
      }
      LandNature[item].selected = true
      this.state.LandNature = LandNature
      typeinData.LandInfo.LandNatureCode = LandNature[item].code
    }
    if (result == "LevelingCondition") {
      for (let item of LevelingCondition) {
        item.selected = false
      }
      LevelingCondition[item].selected = true
      this.state.LevelingCondition = LevelingCondition
      typeinData.LandInfo.MunicipalSupportCode = LevelingCondition[item].code
    }
    if (result == "RelocatesSituation") {
      for (let item of RelocatesSituation) {
        item.selected = false
      }
      RelocatesSituation[item].selected = true
      this.state.RelocatesSituation = RelocatesSituation
      typeinData.LandInfo.DemolitionSituationCode = RelocatesSituation[item].code
    }
    this.setState(this.state)
  }
  showSelectDataReturn(id, name) {
    typeinData.LandInfo.MunicipalSupportCode = id
    this.setState({
      isShowSelectArea: 0,
      LevelingCondition: name
    })
  }
  render() {
    if (this.state.isShowSelectArea == 1) {
      let selectDataProps = {
        tag: 'LevelingCondition',
        storageKey: "LevelingCondition",
        returnData: this.showSelectDataReturn.bind(this)
      }
      return (
          <View style={styles.container}>
            <ActionBar actionName={this.state.actionName} />
            <View>
              <SelectDataInfo {...selectDataProps} />
            </View>
          </View>
      )
    } else {

    }
    let listLandNatureProps = {
      tabList: this.state.LandNature,
      borderColor: "#FF5001",
      itemColor: "#FFFFFF",
      itemSelectedColor: "#FF5001",
      textColor: "#FF5001",
      textSelectedColor: "#FFFFFF"
    }
    let listRelocatesSituation = {
      tabList: this.state.RelocatesSituation,
      borderColor: "#FF5001",
      itemColor: "#FFFFFF",
      itemSelectedColor: "#FF5001",
      textColor: "#FF5001",
      textSelectedColor: "#FFFFFF"
    }
    return (
        <ScrollView style={styles.viewContainer} keyboardShouldPersistTaps={true}>
          <ActionBar actionName={this.state.actionName} isDefaultBack={this.props.jumpPop}/>
          <InputLabel label="四至" boardType="default" tabs="LandScope" getValue={this.getValue} value={paramsTransLand.LandScope} />
          <View style={styles.pickerControl}>
            <View style={styles.pickerTextContainer}>
              <Text style={styles.pickerText} >用地性质</Text>
            </View>
            <View style={styles.pickerLeftControl}>
              <View style={styles.selectMe}>
                <TabNavigator {...listLandNatureProps} />
              </View>
            </View>
          </View>
          <InputLabel label="建设用地面积" boardType="numeric" tabs="BuildLandAreas" getValue={this.getValue} value={paramsTransLand.BuildLandAreas.toString()} />
          <InputLabel label="规划建筑面积" boardType="numeric" tabs="PlanBuildAreas" getValue={this.getValue} value={paramsTransLand.PlanBuildAreas.toString()} />
          <InputLabel label="绿化率" boardType="numeric" tabs="GreeninGate" getValue={this.getValue} value={paramsTransLand.GreeninGate.toString()} />
          <InputLabel label="限高" boardType="numeric" tabs="HighLimit" getValue={this.getValue} value={paramsTransLand.HighLimit.toString()} />
          <View style={styles.pickerControlLeft}>
            <View style={styles.pickerTextContainerLeft}>
              <Text style={styles.pickerTextLeft} >通平情况</Text>
            </View>
            <View style={styles.pickerLeftControl}>
              <View style={styles.selectMe}>
                <Text style={styles.selectMeRight} onPress={()=>this.setState({isShowSelectArea: 1})}>{this.state.LevelingCondition}</Text>
              </View>
            </View>
          </View>
          <View style={styles.pickerControl}>
            <View style={styles.pickerTextContainer}>
              <Text style={styles.pickerText} >拆迁情况</Text>
            </View>
            <View style={styles.pickerLeftControl}>
              <View style={styles.selectMe}>
                <TabNavigator {...listRelocatesSituation} />
              </View>
            </View>
          </View>
          <View style={styles.datepickerContainer}>
            <Text style={styles.datePickerText}>预计转让时间</Text>
            <TouchableHighlight
                style={styles.datePickerRight}
                onPress={this.showPicker.bind(this)}>
              <Text style={styles.buttonText}>{this.state.EstimateTransferTime}</Text>
            </TouchableHighlight>
          </View>
          <InputLabel label="预计交易价格" boardType="numeric" tabs="EstimateTransactionPrice" getValue={this.getValue} value={paramsTransLand.EstimateTransactionPrice.toString()} />
          <ButtonControl
              userClick={this._submit.bind(this)}
              buttonStyle={styles.btnContainer}
              buttonTextStyle={styles.btnText}
              buttonText="提交"
          />
        </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    backgroundColor:'#ffffff',
    height: Dimensions.get('window').height
  },
  viewContainer: {
    backgroundColor: '#FFFFFF',
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#FF5001',
    borderStyle: 'solid',
    padding: 5
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20
  },
  greyLine: {
    height: 10,
    flex: 1,
    backgroundColor: '#efeff4',
    alignSelf: 'stretch'

  },
  selectMe: {
    flex:7,
    marginRight:10,
  },
  selectMeRight:{
    color:'#a7a7a7',
    fontSize:15,
  },
  listItems: {
    padding: 5,
    backgroundColor: '#FFFFFF'
  },
  pickerControl: {
    height:40,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb',
  },
  pickerControlLeft: {
    height:40,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb',
  },
  pickerTextContainerLeft: {
    flex:3,
    justifyContent: 'center'
  },
  pickerTextLeft: {
    flex:7,
    color:'#3b3b3b',
    fontSize:15,
  },
  pickerTextRight: {
    flex:3,
    color:'#3b3b3b',
    fontSize:15,
  },
  pickerLeftControl: {
    flex:7,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerTextContainer: {
    width: 100,
    justifyContent: 'center'
  },
  pickerText: {
    flex:3,
    color:'#3b3b3b',
  },
  datePickerRight: {
    flex:7,
    height: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb'
  },
  datepickerContainer: {
    height: 40,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb'
  },
  datePickerText: {
    flex:3,
    justifyContent: 'center',
    fontSize: 15,
    color: '#3b3b3b'
  },
  datePicker: {
    flex:3,
  },
  buttonText: {
    flex:7,
    color:'#a7a7a7',
    fontSize: 15,
    marginTop:10,
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
})
