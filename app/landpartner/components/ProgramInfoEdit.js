import React, {
  Component,
  Platform,
  StyleSheet,
  Text,
  Picker,
  ScrollView,
  View
} from 'react-native'
import InputLabel from './InputLabel'
import ActionBar from '../../control/ActionBar'
import StorageUtil from '../../utils/StorageUtil'
import SelectPhotoControl from '../../control/SelectPhotoControl'
import OSSUtil from '../../utils/OSSUtil'
var typeinData = {
  LandInfo: {},
  ProjectInfo: {},
  ProjectImageInfoList: []
}

var ProgramInfoEdit = React.createClass({
  getInitialState() {
    return {
      photoArray: []
    }
  },
  _nextFun() {
    if (typeinData.ProjectInfo.CompanyName == '') {
      return Util.AlertMessage('请填写公司名称')
    }
    if (typeinData.ProjectInfo.Contacts == '') {
      return Util.AlertMessage('请填写联系人')
    }
    if (typeinData.ProjectInfo.ContactPhone == '') {
      return Util.AlertMessage('请填写联系电话')
    }
    if (typeinData.ProjectInfo.ConstructionSituation == '') {
      return Util.AlertMessage('请填写建设情况')
    }
    typeinData.OperationType = 1
    typeinData.LandInfo = paramsProgramInfo.LandInfo
    let uploadImg = this.getUserSelectPhotoList()
    this.props.maskViewHandler(true)
    if (uploadImg.length > 0) {
      this.props.uploadFileHandler({
        data: uploadImg,
        callBack: this.uploadFileSuccess
      })
    } else {
      this.props.sendPostJSON({
        url: 'http://mobiletest.yuanxin2015.com/LandPartnerAPI/api/LandInfo/InsertLandInfo',
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
  },
  getValue(value, label) {
    if (label == 'CompanyName') {
      typeinData.ProjectInfo.CompanyName = value
    }
    if (label == 'Contacts') {
      typeinData.ProjectInfo.Contacts = value
    }
    if (label == 'ContactPhone') {
      typeinData.ProjectInfo.ContactPhone = value
    }
    if (label == 'ConstructionSituation') {
      typeinData.ProjectInfo.ConstructionSituation = value
    }
    if (label == 'OtherInfo') {
      typeinData.ProjectInfo.OtherInfo = value
    }
  },
  selectPhotoSuccess(selectData) {
    let imgItems = JSON.parse(selectData.data)
    let imgBase
    let photoArray = []
    if (selectData.FilePath) {
      imgBase = JSON.parse(selectData.FilePath)
    }
    if (imgBase) {
      photoArray.push({url: imgBase[0], base: imgItems[0]})
    } else {
      photoArray.push({url: imgItems[0]})
    }
    this.setState({
      photoArray: photoArray
    })
  },
  androidImageSuccess(imageList){
      let tempPhotoArray = this.state.photoArray
      for (let i = 0; i < imageList.length; i++) {
        tempPhotoArray = OSSUtil.setFileSuccess(imageList[i], tempPhotoArray)
      }
      this.state.photoArray = tempPhotoArray
      this.setState(this.state)
      typeinData.ProjectImageInfoList.push({ImageUrl: this.state.photoArray[0].UpdateLoadUrl})
      this.props.sendPostJSON({
        url: 'http://mobiletest.yuanxin2015.com/LandPartnerAPI/api/LandInfo/InsertLandInfo',
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


  },
  uploadFileSuccess(e){
      if (Platform.OS == 'android')
          this.androidImageSuccess(e);
      else
          this.uploadFileOneSuccess(e);
  },
  deleteSelectPhone(url, tag){
      if (tag == 'photoArray')
          this.state.photoArray = [];
      this.setState(this.state);
  },
  getUserSelectPhotoList(){
      let uploadList = [];
      OSSUtil.setUserSelectPhoto(uploadList, this.state.photoArray, 'photoArray')
      return uploadList;
  },
  _save() {
    typeinData.OperationType = 0
    typeinData.LandInfo = paramsProgramInfo.LandInfo
    let uploadImg = this.getUserSelectPhotoList()
    this.props.maskViewHandler(true)
    if (uploadImg.length > 0) {
      this.props.uploadFileHandler({
        data: uploadImg,
        callBack: this.uploadFileSuccess
      })
    } else {
      this.props.sendPostJSON({
        url: 'http://mobiletest.yuanxin2015.com/LandPartnerAPI/api/LandInfo/InsertLandInfo',
        body: JSON.stringify(typeinData),
        success: (response) => {
          this.props.maskViewHandler(false)
          if (JSON.parse(response.message).status == 'SUCCESS') {
            alert("提交成功")
            this.props.jumpPushPage(Recommend, 'recommend')
          } else {
            alert("提交失败")
            this.props.jumpPushPage(LandIndex, 'landIndex')
          }
        }
      })
    }
  },
  componentWillMount() {
    StorageUtil.getStorageItem('TransLand', (error, result) =>{
      typeinData.LandInfo = JSON.parse(result).LandInfo
    })
  },
  render() {
    let photoProps = {
      selectPhoto: this.state.photoArray,
      maxCount: 1,
      selectTag: 'photoArray',
      deleteSelectPhone: this.deleteSelectPhone,
      selectPhotoHandler: this.props.selectPhotoHandler,
      selectPhotoSuccess: this.selectPhotoSuccess
    }
    return (
      <ScrollView style={styles.container}  keyboardShouldPersistTaps={true}>
      <ActionBar actionName="推荐" isDefaultBack={this.props.jumpPop}/>

        <View style={styles.greyLine}>
        </View>
        <View style={styles.header}>
          <Text style={styles.headerText}>项目信息</Text>
        </View>
        <InputLabel label="公司名称" tabs="CompanyName" getValue={this.getValue} value={paramsProgramInfo.CompanyName.toString()} />
        <InputLabel label="联系人" tabs="Contacts" getValue={this.getValue} value={paramsProgramInfo.Contacts.toString()} />
        <InputLabel label="联系电话" boardType="numeric" tabs="ContactPhone" getValue={this.getValue} value={paramsProgramInfo.ContactPhone.toString()} />
        <InputLabel label="建设情况" tabs="ConstructionSituation" getValue={this.getValue} value={paramsProgramInfo.ConstructionSituation.toString()} />
        <InputLabel label="其他信息" tabs="OtherInfo" getValue={this.getValue} value={paramsProgramInfo.OtherInfo.toString()} />
        <View style={styles.photoContainer}>
          <Text style={styles.photoText}>上传图片</Text>
          <View style={styles.photo}>
            <SelectPhotoControl {...photoProps} />
          </View>
        </View>
        <View style={styles.btnGroup}>
          <ButtonControl
              userClick={this._save.bind(this)}
              buttonStyle={styles.btnContainer}
              buttonTextStyle={styles.btnText}
              buttonText="保存"
          />
          <ButtonControl
              userClick={this._submit.bind(this)}
              buttonStyle={styles.btnContainer}
              buttonTextStyle={styles.btnText}
              buttonText="提交"
          />
        </View>
      </ScrollView>
    )
  }
})
const styles = StyleSheet.create({
  container: {
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
  listItems: {
    padding: 5,
    backgroundColor: '#FFFFFF'
  },
  photoContainer: {
    height: Dimensions.get('window').height,
    flexDirection: 'column',
    overflow: 'hidden'
  },
  photoText: {
    margin: 10,
    fontSize: 16,
    color: '#000'
  },
  photo: {
    width:200,
    /*position: 'absolute',
    top: -70,
    left: 100,*/
    flexWrap:'wrap'
  },
  nexBtn: {
    margin: 10,
    flex: 1
  },
  btnGroup: {
    flexDirection: 'row'
  },
  btnContainer: {
    height:40,
    flex:5,
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
module.exports = ProgramInfoEdit;
