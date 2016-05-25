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
import ActionBar from '../../control/ActionBar'
import SelectDataInfo from '../../control/SelectDataInfo'
import TabNavigator from '../../control/TabNavigator'
import StorageUtil from '../../utils/StorageUtil'
import Util from '../../utils/Util'
var typeinData = {
  LandInfo: {}
}
export default class AddRecomEdit extends Component{
  constructor(props) {
    super(props)
    this.state = {
      date: new Date(),
      actionName: '招拍挂',
      LaunchTime: '请选择日期',
      modalVisible: false,
      isShowSelectArea: 0,
      LandNature: [],
      AssignmentForm: [],
      RelocatesSituation: [],
      LevelingCondition: paramsAddRecom.MunicipalSupporName,
      LandScope: paramsAddRecom.LandScope,
      BuildLandAreas: paramsAddRecom.BuildLandAreas,
      PlanBuildAreas: paramsAddRecom.PlanBuildAreas,
      GreeninGate: paramsAddRecom.GreeninGate,
      HighLimit: paramsAddRecom.HighLimit,
      StartingPrice: paramsAddRecom.StartingPrice,
      LandNatureCode: paramsAddRecom.LandNatureCode,
      TransferFormCode: paramsAddRecom.TransferFormCode,
      MunicipalSupportCode: paramsAddRecom.MunicipalSupportCode,
      DemolitionSituationCode: paramsAddRecom.DemolitionSituationCode,
    }
  }
  componentWillMount() {
    StorageUtil.getStorageItem('Partner', (error, result) =>{
      if (result) {
        let partnerData = JSON.parse(result)
        let LandNature = []
        let AssignmentForm = []
        let RelocatesSituation = []

        let listLandNature = partnerData.data.LandNature.data
        for (let i = 0; i < listLandNature.length; i++) {
          if (listLandNature[i].Code == paramsAddRecom.LandNatureCode) {
            LandNature.push({text: listLandNature[i].Name, selected: true, code: listLandNature[i].Code, click: ()=>this.setValue(i, "LandNature")})
          } else {
            LandNature.push({text: listLandNature[i].Name, selected: false, code: listLandNature[i].Code, click: ()=>this.setValue(i, "LandNature")})
          }

        }
        let listAssignmentForm = partnerData.data.AssignmentForm.data
        for (let i = 0; i < listAssignmentForm.length; i++) {
          if (listAssignmentForm[i].Code == paramsAddRecom.TransferFormCode) {
            AssignmentForm.push({text: listAssignmentForm[i].Name, selected: true, code: listAssignmentForm[i].Code, click: ()=>this.setValue(i, "AssignmentForm")})
          } else {
            AssignmentForm.push({text: listAssignmentForm[i].Name, selected: false, code: listAssignmentForm[i].Code, click: ()=>this.setValue(i, "AssignmentForm")})
          }
        }
        let listRelocatesSituation = partnerData.data.RelocatesSituation.data
        for (let i = 0; i < listRelocatesSituation.length; i++) {
          if (listRelocatesSituation[i].Code == paramsAddRecom.DemolitionSituationCode) {
            RelocatesSituation.push({text: listRelocatesSituation[i].Name, selected: true, code: listRelocatesSituation[i].Code, click: ()=>this.setValue(i, "RelocatesSituation")})
          } else {
            RelocatesSituation.push({text: listRelocatesSituation[i].Name, selected: false, code: listRelocatesSituation[i].Code, click: ()=>this.setValue(i, "RelocatesSituation")})
          }
        }
        this.setState({
          LandNature: LandNature,
          AssignmentForm: AssignmentForm,
          RelocatesSituation: RelocatesSituation
        })
      } else {
        this.props.sendPostJSON({
          url: 'http://www.yuanxin2015.com/MobileBusiness/LandInfoService/api/LandInfo/GenerateDataDictionary',
          success: (response) => {
            let partnerData = JSON.parse(response.message)
            let LandNature = []
            let AssignmentForm = []
            let RelocatesSituation = []

            let listLandNature = partnerData.data.LandNature.data
            for (let i = 0; i < listLandNature.length; i++) {
              if (listLandNature[i].Code == paramsAddRecom.LandNatureCode) {
                LandNature.push({text: listLandNature[i].Name, selected: true, code: listLandNature[i].Code, click: ()=>this.setValue(i, "LandNature")})
              } else {
                LandNature.push({text: listLandNature[i].Name, selected: false, code: listLandNature[i].Code, click: ()=>this.setValue(i, "LandNature")})
              }
            }
            let listAssignmentForm = partnerData.data.AssignmentForm.data
            for (let i = 0; i < listAssignmentForm.length; i++) {
              if (listAssignmentForm[i].Code == paramsAddRecom.TransferFormCode) {
                AssignmentForm.push({text: listAssignmentForm[i].Name, selected: true, code: listAssignmentForm[i].Code, click: ()=>this.setValue(i, "AssignmentForm")})
              } else {
                AssignmentForm.push({text: listAssignmentForm[i].Name, selected: false, code: listAssignmentForm[i].Code, click: ()=>this.setValue(i, "AssignmentForm")})
              }
            }
            let listRelocatesSituation = partnerData.data.RelocatesSituation.data
            for (let i = 0; i < listRelocatesSituation.length; i++) {
              if (listRelocatesSituation[i].Code == paramsAddRecom.DemolitionSituationCode) {
                RelocatesSituation.push({text: listRelocatesSituation[i].Name, selected: true, code: listRelocatesSituation[i].Code, click: ()=>this.setValue(i, "RelocatesSituation")})
              } else {
                RelocatesSituation.push({text: listRelocatesSituation[i].Name, selected: false, code: listRelocatesSituation[i].Code, click: ()=>this.setValue(i, "RelocatesSituation")})
              }
            }
            this.setState({
              LandNature: LandNature,
              AssignmentForm: AssignmentForm,
              RelocatesSituation: RelocatesSituation
            })
          }
        })
      }
		})
    typeinData.LandInfo.LandNatureCode = paramsAddRecom.LandNatureCode
    typeinData.LandInfo.TransferFormCode = paramsAddRecom.TransferFormCode
    typeinData.LandInfo.MunicipalSupportCode = paramsAddRecom.MunicipalSupportCode
    typeinData.LandInfo.DemolitionSituationCode = paramsAddRecom.DemolitionSituationCode
    typeinData.LandInfo.LandScope = paramsAddRecom.LandScope
    typeinData.LandInfo.PlanBuildAreas = paramsAddRecom.PlanBuildAreas
    typeinData.LandInfo.BuildLandAreas = paramsAddRecom.BuildLandAreas
    typeinData.LandInfo.GreeninGate = paramsAddRecom.GreeninGate
    typeinData.LandInfo.HighLimit = paramsAddRecom.HighLimit
    typeinData.LandInfo.LaunchTime = paramsAddRecom.LaunchTime
    typeinData.LandInfo.StartingPrice = paramsAddRecom.StartingPrice
  }
  getValue(value, label) {
    if (label == 'LandScope') {
      this.state.LandScope = value
    }
    if (label == 'PlanBuildAreas') {
      this.state.PlanBuildAreas = value
    }
    if (label == 'BuildLandAreas') {
      this.state.BuildLandAreas = value
    }
    if (label == 'GreeninGate') {
      this.state.GreeninGate = value
    }
    if (label == 'HighLimit') {
      this.state.HighLimit = value
    }
    if (label == 'LaunchTime') {
      this.state.LaunchTime = value
    }
    if (label == 'StartingPrice') {
      this.state.StartingPrice = value
    }
  }
  _submit() {
    if (!typeinData.LandInfo.LandNatureCode) {
      return Util.AlertMessage('请选择用地性质')
    }
    if (!typeinData.LandInfo.BuildLandAreas) {
      return Util.AlertMessage('请填写建设用地面积')
    }
    if (!typeinData.LandInfo.PlanBuildAreas) {
      return Util.AlertMessage('请填写用规划建筑面积')
    }
    if (this.state.LaunchTime != '请选择日期') {
      typeinData.LandInfo.LaunchTime = this.state.LaunchTime
    }
    typeinData.OperationType = 1
    typeinData.LandInfo.Code = paramsAddRecom.Code
    typeinData.LandInfo.LandSourcesCode = paramsAddRecom.LandSourcesCode
    typeinData.LandInfo.Province = paramsAddRecom.Province
    typeinData.LandInfo.City = paramsAddRecom.City
    typeinData.LandInfo.County = paramsAddRecom.County
    typeinData.LandInfo.AddressDetail = paramsAddRecom.AddressDetail
    typeinData.LandInfo.LandNatureCode = this.state.LandNatureCode
    typeinData.LandInfo.MunicipalSupportCode = this.state.MunicipalSupportCode
    typeinData.LandInfo.DemolitionSituationCode = this.state.DemolitionSituationCode
    typeinData.LandInfo.TransferFormCode = this.state.TransferFormCode

    this.props.maskViewHandler(true)
    this.props.sendPostJSON({
      url: 'http://www.yuanxin2015.com/MobileBusiness/LandInfoService/api/LandInfo/UpdateLandInfoToLandDataBaseAndSeagull2DataBase',
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
    typeinData = {
      LandInfo: {}
    }
  }
  async showPicker(stateKey, options) {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open(options)
        var date = new Date(year, month, day)
        this.state.LaunchTime = date.toLocaleDateString()
      this.setState(this.state)
    } catch ({code, message}) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  }
  setValue(item, result) {
    const {LandNature} = this.state
    const {AssignmentForm} = this.state
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
    if (result == "AssignmentForm") {
      for (let item of AssignmentForm) {
        item.selected = false
      }
      AssignmentForm[item].selected = true
      this.state.AssignmentForm = AssignmentForm
      this.state.TransferFormCode = AssignmentForm[item].code
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
    this.state.MunicipalSupportCode = id
    this.state.isShowSelectArea = 0
    this.state.LevelingCondition = name
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
      let listAssignmentForm = {
        tabList: this.state.AssignmentForm,
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
            style={styles.datePicker}
            onPress={this.showPicker.bind(this)}
        >
          <Text allowFontScaling={false} style={styles.dateText}>{this.state.LaunchTime}</Text>
        </TouchableHighlight>
      }
      return (
          <ScrollView style={styles.viewContainer} >
            <ActionBar actionName={this.state.actionName} isDefaultBack={this.props.jumpPop} />
            <InputLabel label="四至" boardType="default" tabs="LandScope" getValue={this.getValue.bind(this)} value={this.state.LandScope} />
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
              <InputLabel label="建设用地面积" boardType="numeric" tabs="BuildLandAreas" tags="m²" getValue={this.getValue.bind(this)} value={this.state.BuildLandAreas.toString()} />
            </View>
            <View>
              <Text allowFontScaling={false} style={styles.starView}>*</Text>
              <InputLabel label="规划建筑面积" boardType="numeric" tabs="PlanBuildAreas" tags="m²" getValue={this.getValue.bind(this)} value={this.state.PlanBuildAreas.toString()} />
            </View>
            <View style={styles.pickerControl}>
              <View style={styles.pickerTextContainer}>
                <Text allowFontScaling={false} style={styles.pickerText} >出让形式</Text>
              </View>
              <View style={styles.pickerLeftControl}>
                <View style={styles.selectMe}>
                  <TabNavigator {...listAssignmentForm} />
                </View>
              </View>
            </View>
            <InputLabel label="绿化率" boardType="numeric" tabs="GreeninGate" tags="%" getValue={this.getValue.bind(this)} value={this.state.GreeninGate.toString()} />
            <InputLabel label="限高" boardType="numeric" tabs="HighLimit" tags="m" getValue={this.getValue.bind(this)} value={this.state.HighLimit.toString()} />
            <InputLabel label="起始价" boardType="numeric" tabs="StartingPrice" tags="万元" getValue={this.getValue.bind(this)} value={this.state.StartingPrice.toString()} />
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
            <View style={styles.datepickerContainer}>
              <View style={styles.pickerTextContainer}>
                <Text allowFontScaling={false} style={styles.pickerTextRight} >推出时间</Text>
              </View>
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
                userClick={this._submit.bind(this)}
                buttonStyle={styles.btnContainer}
                buttonTextStyle={styles.btnText}
                buttonText="提交"
            />

          </ScrollView>
      )
    }

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
  starView:{
    color:'red',
    position:'absolute',
    top:8,
    left:5,
    fontSize:15,
  },
  selectMe: {
    flex:6,
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
  pickerLeftControl: {
    flex:6,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius:10
  },
  pickerTextContainer: {
    flex:4,
    justifyContent: 'center'
  },
  pickerTextContainerLeft: {
    flex:4,
    justifyContent: 'center'
  },
  pickerText: {
    flex:4,
    color:'#3b3b3b',
    fontSize:15,
    marginLeft:5,
  },
  pickerTextLeft: {
    flex:6,
    color:'#3b3b3b',
    fontSize:15,
    marginLeft:5,
  },
  pickerTextRight: {
    flex:4,
    color:'#3b3b3b',
    fontSize:15,
    marginTop:10,
    marginLeft:5,
  },
  datepickerContainer: {
    height: 40,
    flexDirection: 'row',
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb'
  },
  datePicker: {
    flex:6,
    height: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb'
  },
  dateText: {
    marginLeft:6,
    color:'#a7a7a7',
    fontSize: 15,
  },
  datePickerText: {
    marginLeft: 10,
    marginTop: 15,
    marginRight: 25,
    width: 100,
    height: 40,
    fontSize: 15,
    color: '#a7a7a7'
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    backgroundColor: '#FFFFFF'
  },
  selectDate:{
    flex:6,
    marginRight:10,
  },
  dateTextIOS:{
    fontSize:15,
    color:'#a7a7a7',
    marginTop:10,
  },
  btnGroup: {
    flexDirection: 'row',
  },
  btnContainer: {
    height:40,
    margin:10,
    marginTop: 20,
    marginBottom:20,
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
