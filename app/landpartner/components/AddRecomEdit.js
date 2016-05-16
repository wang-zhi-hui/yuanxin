import React, {
  Component,
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
import Button from './button'
import ProcessNav from './ProcessNav'
import ActionBar from '../../control/ActionBar'
import StorageUtil from '../../utils/StorageUtil'
var typeinData = {
  LandInfo: {}
}
export default class AddRecomEdit extends Component{
  constructor(props) {
    super(props)
    this.state = {
      actionName: '推荐',
      LaunchTime: paramsAddRecom.LaunchTime,
      LandNature: [],
      AssignmentForm: [],
      RelocatesSituation: [],
      LevelingCondition: [],
      LandNatureName: paramsAddRecom.LandNatureName,
      LandNatureCode: paramsAddRecom.LandNatureCode,
      MunicipalSupporName: paramsAddRecom.MunicipalSupporName,
      MunicipalSupportCode: paramsAddRecom.MunicipalSupportCode,
      DemolitionSituationName: paramsAddRecom.DemolitionSituationName,
      DemolitionSituationCode: paramsAddRecom.DemolitionSituationCode,
      TransferFormName: paramsAddRecom.TransferFormName,
      TransferFormCode: paramsAddRecom.TransferFormCode
    }
  }
  componentWillMount() {
    StorageUtil.getStorageItem('Partner', (error, result) =>{
      if (result) {
        let partnerData = JSON.parse(result)
        this.state.LandNatureName = partnerData.data.LandNature.data[0].Name
        this.state.LandNatureCode = partnerData.data.LandNature.data[0].Code
        this.state.TransferFormName = partnerData.data.AssignmentForm.data[0].Name
        this.state.TransferFormCode = partnerData.data.AssignmentForm.data[0].Code
        this.state.MunicipalSupporName = partnerData.data.LevelingCondition.data[0].Name
        this.state.MunicipalSupportCode = partnerData.data.LevelingCondition.data[0].Code
        this.state.DemolitionSituationName = partnerData.data.RelocatesSituation.data[0].Name
        this.state.DemolitionSituationCode = partnerData.data.RelocatesSituation.data[0].Code

  			for (let item of partnerData.data.LandNature.data) {
  				 this.state.LandNature.push(<Picker.Item label={item.Name} value={item.Code} key={item.Code} />)
  			}
        for (let item of partnerData.data.AssignmentForm.data) {
  				 this.state.AssignmentForm.push(<Picker.Item label={item.Name} value={item.Code} key={item.Code} />)
  			}
        for (let item of partnerData.data.LevelingCondition.data) {
  				 this.state.LevelingCondition.push(<Picker.Item label={item.Name} value={item.Code} key={item.Code} />)
  			}
        for (let item of partnerData.data.RelocatesSituation.data) {
  				 this.state.RelocatesSituation.push(<Picker.Item label={item.Name} value={item.Code} key={item.Code} />)
  			}
        this.setState(this.state)
      } else {
        this.props.sendPostJSON({
          url: 'http://mobiletest.yuanxin2015.com/LandPartnerAPI/api/LandInfo/GenerateDataDictionary',
          success: (response) => {
            this.state.LandNatureName = response.message.data.LandNature.data[0].Name
            this.state.LandNatureCode = response.message.data.LandNature.data[0].Code
            this.state.TransferFormName = response.message.data.AssignmentForm.data[0].Name
            this.state.TransferFormCode = response.message.data.AssignmentForm.data[0].Code
            this.state.MunicipalSupporName = response.message.data.LevelingCondition.data[0].Name
            this.state.MunicipalSupportCode = response.message.data.LevelingCondition.data[0].Code
            this.state.DemolitionSituationName = response.message.data.RelocatesSituation.data[0].Name
            this.state.DemolitionSituationCode = response.message.data.RelocatesSituation.data[0].Code

            for (let item of response.message.data.LandNature.data) {
      				 this.state.LandNature.push(<Picker.Item label={item.Name} value={item.Code} key={item.Code} />)
      			}
            for (let item of response.message.data.AssignmentForm.data) {
      				 this.state.AssignmentForm.push(<Picker.Item label={item.Name} value={item.Code} key={item.Code} />)
      			}
            for (let item of response.message.data.LevelingCondition.data) {
      				 this.state.LevelingCondition.push(<Picker.Item label={item.Name} value={item.Code} key={item.Code} />)
      			}
            for (let item of response.message.data.RelocatesSituation.data) {
      				 this.state.RelocatesSituation.push(<Picker.Item label={item.Name} value={item.Code} key={item.Code} />)
      			}
            this.setState(this.state)
          }
        })
      }
		})
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
    if (label == 'LaunchTime') {
      typeinData.LandInfo.LaunchTime = value
    }
    if (label == 'StartingPrice') {
      typeinData.LandInfo.StartingPrice = value
    }
  }
  _submit() {
    if (this.state.LaunchTime != '请选择日期') {
      typeinData.LandInfo.LaunchTime = this.state.LaunchTime
    }
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
    if (typeinData.LandInfo.LandNatureCode == '') {
      return Util.AlertMessage('请填写用地性质')
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
          alert("提交成功")
          this.props.navigator.popToTop()
        } else {
          alert("提交失败")
          this.props.navigator.popToTop()
        }
      }
    })
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
  render() {
    return (
      <ScrollView style={styles.viewContainer}>
        <ActionBar actionName={this.state.actionName} isDefaultBack={this.props.jumpPop} />
        <View style={styles.header}>
          <Text style={styles.headerText}>招拍挂</Text>
        </View>
        <ProcessNav status={2} />
        <View style={styles.greyLine}>
        </View>
        <View style={styles.header}>
          <Text style={styles.headerText}>土地信息</Text>
        </View>
        <InputLabel label="四至" boardType="default" tabs="LandScope" getValue={this.getValue} value={paramsAddRecom.LandScope} />
        <View style={styles.pickerControl}>
          <Text style={styles.pickerText} >用地性质</Text>
          <Picker
            selectedValue={this.state.LandNatureCode}
            onValueChange={(value, label) => this.setState({LandNatureCode: value, LandNatureName: label})}
            mode="dropdown"
            style={styles.selectMe}>
              {this.state.LandNature}
          </Picker>
        </View>
        <InputLabel label="建设用地面积" boardType="numeric" tabs="BuildLandAreas" getValue={this.getValue} value={paramsAddRecom.BuildLandAreas.toString()} />
        <InputLabel label="规划建筑面积" boardType="numeric" tabs="PlanBuildAreas" getValue={this.getValue} value={paramsAddRecom.PlanBuildAreas.toString()} />
        <View style={styles.pickerControl}>
          <Text style={styles.pickerText} >出让形式</Text>
          <Picker
            selectedValue={this.state.TransferFormCode}
            onValueChange={(value, label) => this.setState({TransferFormCode: value, TransferFormName: label})}
            mode="dropdown"
            style={styles.selectMe}>
              {this.state.AssignmentForm}
          </Picker>
        </View>
        <InputLabel label="绿化率" boardType="numeric" tabs="GreeninGate" getValue={this.getValue} value={paramsAddRecom.GreeninGate.toString()} />
        <InputLabel label="限高" boardType="numeric" tabs="HighLimit" getValue={this.getValue} value={paramsAddRecom.HighLimit.toString()} />
        <View style={styles.pickerControl}>
          <Text style={styles.pickerText}>通平情况</Text>
          <Picker
            selectedValue={this.state.MunicipalSupportCode}
            onValueChange={(value, label) => this.setState({MunicipalSupportCode: value, MunicipalSupporName: label})}
            mode="dropdown"
            style={styles.selectMe}>
              {this.state.LevelingCondition}
          </Picker>
        </View>
        <View style={styles.pickerControl}>
          <Text style={styles.pickerText}>拆迁情况</Text>
          <Picker
            selectedValue={this.state.DemolitionSituationCode}
            onValueChange={(value, label) => this.setState({DemolitionSituationCode: value, DemolitionSituationName: label})}
            mode="dropdown"
            style={styles.selectMe}>
              {this.state.RelocatesSituation}
          </Picker>
        </View>
        <View style={styles.datepickerContainer}>
          <Text style={styles.datePickerText}>推出时间</Text>
          <TouchableHighlight
            style={styles.datePicker}
            onPress={this.showPicker.bind(this)}>
            <Text style={styles.dateText}>{this.state.LaunchTime}</Text>
          </TouchableHighlight>
        </View>
        <InputLabel label="起始价" boardType="numeric" tabs="StartingPrice" getValue={this.getValue} value={paramsAddRecom.StartingPrice.toString()} />
        <View style={styles.nexBtn}>
          <Button btnText="提交" clickFun={this._submit.bind(this)} />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: '#FFFFFF'
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
    width: 100
  },
  listStyle: {

  },
  listItems: {
    padding: 5,
    backgroundColor: '#FFFFFF'
  },
  pickerControl: {
    height: 50,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb',
    paddingLeft: 10
  },
  datepickerContainer: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb'
  },
  datePicker: {
    width: 150,
    height: 30,
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center'
  },
  dateText: {
    fontSize: 16
  },
  datePickerText: {
    marginLeft: 10,
    marginTop: 15,
    marginRight: 25,
    width: 100,
    height: 30,
    fontSize: 16,
    color: '#000'
  },
  nexBtn: {
    margin: 10,
		flex: 1,
		alignSelf: 'stretch'
  },
  pickerText: {
    width: 120,
		height: 50,
		lineHeight: 50,
		color:'#000',
		fontSize:16,
    marginTop: 13
  },
	btnGroup: {
    flexDirection: 'row'
  }
})
