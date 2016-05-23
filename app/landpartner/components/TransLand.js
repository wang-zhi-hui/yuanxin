import React, {
    Component,
    Dimensions,
    Platform,
    StyleSheet,
    Text,
    TouchableHighlight,
    DatePickerAndroid,
    DatePickerIOS,
    Picker,
    Modal,
    ListView,
    ScrollView,
    View
} from 'react-native'
import InputLabel from './InputLabel'
import ButtonControl from '../../control/ButtonControl'
import TabNavigator from '../../control/TabNavigator'
import SelectDataInfo from '../../control/SelectDataInfo'
import ActionBar from '../../control/ActionBar'
import ProgramInfo from './ProgramInfo'
import StorageUtil from '../../utils/StorageUtil'
import Util from '../../utils/Util'
var typeinData = {
  LandInfo: {}
}

export default class TransLand extends Component{
  constructor(props) {
    super(props)
    this.state = {
      actionName: '土地信息',
      EstimateTransferTime: '请选择时间',
      date: new Date(),
      modalVisible: false,
      isShowSelectArea: 0,
      LandNature: [],
      RelocatesSituation: [],
      LandNatureCode: '',
      MunicipalSupportCode: '',
      DemolitionSituationCode: '',
      LevelingCondition: "请选择通平情况",
      LandScope: '',
      BuildLandAreas: '',
      PlanBuildAreas: '',
      GreeninGate: '',
      HighLimit: '',
      EstimateTransactionPrice: ''
    }
  }
  _nextFun() {
    if (!this.state.LandNatureCode) {
      return Util.AlertMessage('请选择用地性质')
    }
    if (!typeinData.LandInfo.BuildLandAreas) {
      return Util.AlertMessage('请填写建筑用地面积')
    }
    if (!typeinData.LandInfo.PlanBuildAreas) {
      return Util.AlertMessage('请填写用规划建筑面积')
    }
    typeinData.OperationType = 0
    if (this.state.LaunchTime != '请选择日期') {
      typeinData.LandInfo.LaunchTime = this.state.LaunchTime
    }
    typeinData.LandInfo.LandSourcesCode = paramsTransLand.LandSourcesCode
    typeinData.LandInfo.Province = paramsTransLand.Province
    typeinData.LandInfo.City = paramsTransLand.City
    typeinData.LandInfo.County = paramsTransLand.County
    typeinData.LandInfo.AddressDetail = paramsTransLand.AddressDetail
    typeinData.LandInfo.LandNatureCode = this.state.LandNatureCode
    typeinData.LandInfo.MunicipalSupportCode = this.state.MunicipalSupportCode
    typeinData.LandInfo.DemolitionSituationCode = this.state.DemolitionSituationCode
    console.log(typeinData)
    this.props.jumpPushPage(ProgramInfo, 'programInfo', paramsProgramInfo={...typeinData})
    typeinData = {
      LandInfo: {}
    }
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
          if (i == 0) {
            this.state.LandNatureCode = listLandNature[0].Code
            LandNature.push({text: listLandNature[i].Name, selected: true, code: listLandNature[i].Code, click: ()=>this.setValue(i, "LandNature")})
          } else {
            LandNature.push({text: listLandNature[i].Name, selected: false, code: listLandNature[i].Code, click: ()=>this.setValue(i, "LandNature")})
          }
        }
        let listLevelingCondition = partnerData.data.LevelingCondition.data
        for (let item of listLevelingCondition) {
          LevelingCondition.push({ID: item.Code, Name: item.Name, PrentID: ""})
        }
        StorageUtil.setStorageItem("LevelingCondition", JSON.stringify(LevelingCondition))
        let listRelocatesSituation = partnerData.data.RelocatesSituation.data
        for (let i = 0; i < listRelocatesSituation.length; i++) {
          if (i == 0) {
            this.state.DemolitionSituationCode = listRelocatesSituation[0].Code
            RelocatesSituation.push({text: listRelocatesSituation[i].Name, selected: true, code: listRelocatesSituation[i].Code, click: ()=>this.setValue(i, "RelocatesSituation")})
          } else {
            RelocatesSituation.push({text: listRelocatesSituation[i].Name, selected: false, code: listRelocatesSituation[i].Code, click: ()=>this.setValue(i, "RelocatesSituation")})
          }
        }
        this.state.LandNature = LandNature
        this.state.RelocatesSituation = RelocatesSituation
        this.setState(this.state)
      } else {
        this.props.sendPostJSON({
          url: 'http://mobiletest.yuanxin2015.com/LandPartnerAPI/api/LandInfo/GenerateDataDictionary',
          success: (response) => {
            let LandNature = []
            let LevelingCondition = []
            let RelocatesSituation = []

            let listLandNature = partnerData.data.LandNature.data
            for (let i = 0; i < listLandNature.length; i++) {
              if (i == 0) {
                this.state.LandNatureCode = listLandNature[0].Code
                LandNature.push({text: listLandNature[i].Name, selected: true, code: listLandNature[i].Code, click: ()=>this.setValue(i, "LandNature")})
              } else {
                LandNature.push({text: listLandNature[i].Name, selected: false, code: listLandNature[i].Code, click: ()=>this.setValue(i, "LandNature")})
              }
            }
            let listLevelingCondition = partnerData.data.LevelingCondition.data
            for (let item of listLevelingCondition) {
              LevelingCondition.push({ID: item.Code, Name: item.Name, PrentID: ""})
            }
            StorageUtil.setStorageItem("LevelingCondition", JSON.stringify(LevelingCondition))
            let listRelocatesSituation = partnerData.data.RelocatesSituation.data
            for (let i = 0; i < listRelocatesSituation.length; i++) {
              if (i == 0) {
                this.state.DemolitionSituationCode = listRelocatesSituation[0].Code
                RelocatesSituation.push({text: listRelocatesSituation[i].Name, selected: true, code: listRelocatesSituation[i].Code, click: ()=>this.setValue(i, "RelocatesSituation")})
              } else {
                RelocatesSituation.push({text: listRelocatesSituation[i].Name, selected: false, code: listRelocatesSituation[i].Code, click: ()=>this.setValue(i, "RelocatesSituation")})
              }
            }
            this.state.LandNature = LandNature
            this.state.RelocatesSituation = RelocatesSituation
            this.setState(this.state)
            StorageUtil.setStorageItem('Partner', response.message)
          }
        })
      }
    })
  }
  async showPicker(stateKey, options) {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open(options)
        var date = new Date(year, month, day)
        this.state.EstimateTransferTime = date.toLocaleDateString()
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
      this.state.LandNatureCode = LandNature[item].code
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
      this.state.DemolitionSituationCode = RelocatesSituation[item].code
    }
    this.setState(this.state)
  }
  showSelectDataReturn(id, name) {
    typeinData.LandInfo.MunicipalSupportCode = id
    this.state.isShowSelectArea = 0
    this.state.LevelingCondition = name
    this.state.LandScope = typeinData.LandInfo.LandScope
    this.state.BuildLandAreas = typeinData.LandInfo.BuildLandAreas
    this.state.PlanBuildAreas = typeinData.LandInfo.PlanBuildAreas
    this.state.GreeninGate = typeinData.LandInfo.GreeninGate
    this.state.HighLimit = typeinData.LandInfo.HighLimit
    this.state.EstimateTransactionPrice = typeinData.LandInfo.EstimateTransactionPrice
    this.setState(this.state)
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
      let datePickerButton
      if (Platform.OS == 'ios') {
        datePickerButton = <View style={styles.selectDate}>
          <Text allowFontScaling={false} style={styles.dateTextIOS} onPress={()=>this.setState({modalVisible: true})}>{this.state.date.toLocaleDateString()}</Text>
        </View>
      } else {
        datePickerButton = <TouchableHighlight
            style={styles.datePickerRight}
            onPress={this.showPicker.bind(this)}>
          <Text allowFontScaling={false} style={styles.buttonText}>{this.state.EstimateTransferTime}</Text>
        </TouchableHighlight>
      }
      return (
        <View style={styles.container}>
          <ActionBar actionName={this.state.actionName} isDefaultBack={this.props.jumpPop}/>
          <ScrollView style={styles.viewContainer} >
            <InputLabel label="四至" boardType="default" tabs="LandScope" getValue={this.getValue} value={this.state.LandScope} />
            <View style={styles.pickerControl}>
              <Text allowFontScaling={false} style={styles.starView}>*</Text>
              <View style={styles.pickerTextContainer}>
                <Text allowFontScaling={false} style={styles.pickerText} >用地性质</Text>
              </View>
              <View style={styles.pickerLeftControl}>
                <View style={styles.selectMe}>
                  <TabNavigator {...listLandNatureProps} />
                </View>
              </View>
            </View>
            <View>
              <Text allowFontScaling={false} style={styles.starView}>*</Text>
              <InputLabel label="建设用地面积" boardType="numeric" tabs="BuildLandAreas" tags="m²" getValue={this.getValue} value={this.state.BuildLandAreas} />
            </View>
            <View>
              <Text allowFontScaling={false} style={styles.starView}>*</Text>
              <InputLabel label="规划建筑面积" boardType="numeric" tabs="PlanBuildAreas" tags="m²" getValue={this.getValue} value={this.state.PlanBuildAreas} />
            </View>
              <InputLabel label="绿化率" boardType="numeric" tabs="GreeninGate" tags="%" getValue={this.getValue} value={this.state.GreeninGate} />
              <InputLabel label="限高" boardType="numeric" tabs="HighLimit" tags="m" getValue={this.getValue} value={this.state.HighLimit} />

            <View style={styles.pickerControlLeft}>
              <View style={styles.pickerTextContainerLeft}>
                <Text allowFontScaling={false} style={styles.pickerTextLeft} >通平情况</Text>
              </View>
              <View style={styles.pickerLeftControl}>
                <View style={styles.selectMe}>
                  <Text allowFontScaling={false} style={styles.selectMeRight} onPress={()=>this.setState({isShowSelectArea: 1})}>{this.state.LevelingCondition}</Text>
                </View>
              </View>
            </View>
            <View style={styles.pickerControl}>
              <View style={styles.pickerTextContainer}>
                <Text allowFontScaling={false} style={styles.pickerText} >拆迁情况</Text>
              </View>
              <View style={styles.pickerLeftControl}>
                <View style={styles.selectMe}>
                  <TabNavigator {...listRelocatesSituation} />
                </View>
              </View>
            </View>
            <View>
              <InputLabel label="预计交易价格" boardType="numeric" tabs="EstimateTransactionPrice" tags="万元" getValue={this.getValue} value={paramsTransLand.EstimateTransactionPrice} />
            </View>
            <View style={styles.datepickerContainer}>
              <Text allowFontScaling={false} style={styles.datePickerText}>预计转让时间</Text>
              {datePickerButton}
              <Modal
                  visible={this.state.modalVisible}
              >
                <View style={styles.modal}>
                  <DatePickerIOS
                      date={this.state.date}
                      mode="date"
                      timeZoneOffsetInMinutes={8 * 60}
                      onDateChange={(date)=>this.setState({date: date})}
                  />
                  <View style={{width: Dimensions.get('window').width - 20}}>
                    <ButtonControl
                        userClick={()=>this.setState({modalVisible: false})}
                        buttonStyle={styles.btnContainer}
                        buttonTextStyle={styles.btnText}
                        buttonText="确定"
                    />
                  </View>
                </View>
              </Modal>
            </View>

            <ButtonControl
                userClick={this._nextFun.bind(this)}
                buttonStyle={styles.btnContainer}
                buttonTextStyle={styles.btnText}
                buttonText="下一步"
            />
          </ScrollView>
        </View>
      )
    }

  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor:'#ffffff',
    height: Dimensions.get('window').height
  },
  viewContainer: {
    backgroundColor: '#FFFFFF'
  },
  header: {
    height:44,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
    borderStyle: 'solid',
    padding: 10
  },
  headerText: {
    color:'#3b3b3b',
    marginTop:4,
    fontSize: 15,
  },
  greyLine: {
    height: 10,
    flex: 1,
    backgroundColor: '#efeff4',
    alignSelf: 'stretch'
  },
  starView:{
    color:'red',
    position:'absolute',
    top:8,
    left:5,
    fontSize:12,
  },

  selectMe: {
    flex:7,
    marginRight:10,
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
    marginLeft:5,
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
    marginLeft:5,
  },
  selectMeRight:{
    color:'#a7a7a7',
    fontSize:15,
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
    color: '#3b3b3b',
    marginLeft:5,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    backgroundColor: '#FFFFFF'
  },
  selectDate:{
    flex:7,
    marginRight:10,

  },
  dateTextIOS:{
    fontSize:15,
    color:'#a7a7a7',
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
