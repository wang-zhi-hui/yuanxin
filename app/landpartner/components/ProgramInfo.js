import React, {
  Component,
  Platform,
  Dimensions,
  StyleSheet,
  Text,
  Picker,
  ScrollView,
  View
} from 'react-native'
import InputLabel from './InputLabel'
import ButtonControl from '../../control/ButtonControl'
import ActionBar from '../../control/ActionBar'
import LandIndex from '../LandIndex'
import Recommend from '../Recommend'
import StorageUtil from '../../utils/StorageUtil'
import SelectPhotoControl from '../../control/SelectPhotoControl'
import OSSUtil from '../../utils/OSSUtil'
import Util from '../../utils/Util'
var typeinData = {
  LandInfo: {},
  ProjectInfo: {},
  ProjectImageInfoList: []
}

var ProgramInfo = React.createClass({
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
            Util.AlertMessage("提交成功")
            this.props.jumpReplacePage(Recommend, 'recommend')
          } else {
            Util.AlertMessage("提交失败")
            this.props.jumpReplacePage(LandIndex, 'landIndex')
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

    if (selectData.FilePath) {
      imgBase = JSON.parse(selectData.FilePath)
    }
    if (imgBase) {
      let photoArray = this.state.photoArray
      for (let i = 0; i < imgBase.length; i++) {
        photoArray.push({url: imgBase[i], base: imgItems[i]})
      }
      this.setState({
        photoArray: photoArray
      })
    } else {
      let photoArray = []
      for (let item of imgItems) {
        photoArray.push({url: item})
      }
      this.setState({
        photoArray: photoArray
      })
    }
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
            Util.AlertMessage("提交成功")
            this.props.jumpReplacePage(Recommend, 'recommend')
          } else {
            Util.AlertMessage("提交失败")
            this.props.jumpReplacePage(Recommend, 'recommend')
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
  // deleteSelectPhone(url, tag){
  //     if (tag == 'photoArray')
  //         this.state.photoArray = [];
  //     this.setState(this.state);
  // },
  deleteSelectPhone(url, tag){
    if (tag == 'photoArray') {
        for (let i = 0; i < this.state.photoArray.length; i++) {
            if (url == this.state.photoArray[i].url) {
                this.state.photoArray.splice(i, 1);
                break;
            }
        }
    }
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
            Util.AlertMessage("保存成功")
            this.props.jumpReplacePage(Recommend, 'recommend')
          } else {
            Util.AlertMessage("保存失败")
            this.props.jumpReplacePage(Recommend, 'recommend')
          }
        }
      })
    }
  },
  render() {
    let photoProps = {
      selectPhoto: this.state.photoArray,
      maxCount: 9,
      selectTag: 'photoArray',
      deleteSelectPhone: this.deleteSelectPhone,
      selectPhotoHandler: this.props.selectPhotoHandler,
      selectPhotoSuccess: this.selectPhotoSuccess
    }
    return (
      <View style={styles.container}>
        <ActionBar actionName="项目信息" isDefaultBack={this.props.jumpPop} />
        <ScrollView>
          <InputLabel label="公司名称" tabs="CompanyName" getValue={this.getValue} />
          <InputLabel label="联系人" tabs="Contacts" getValue={this.getValue} />
          <InputLabel label="联系电话" boardType="numeric" tabs="ContactPhone" getValue={this.getValue} />
          <InputLabel label="建设情况" tabs="ConstructionSituation" getValue={this.getValue} />
          <InputLabel label="其他信息" tabs="OtherInfo" getValue={this.getValue} />
          <View style={styles.photoContainer}>
            <Text style={styles.photoText}>上传图片</Text>
            <View style={styles.photo}>
              <SelectPhotoControl {...photoProps} />
            </View>
          </View>
          <View style={styles.btnGroup}>
            <ButtonControl
                userClick={this._save}
                buttonStyle={styles.btnContainer}
                buttonTextStyle={styles.btnText}
                buttonText="保存"
            />
            <ButtonControl
                userClick={this._save}
                buttonStyle={styles.btnContainer}
                buttonTextStyle={styles.btnText}
                buttonText="提交"
            />
          </View>
        </ScrollView>
      </View>

    )
  }
})
const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
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
    fontSize: 15,
    marginTop:8,
    color:'#3b3b3b'
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
    height: 80,
    flexDirection: 'row',
    overflow: 'hidden'
  },
  photoText: {
    margin: 10,
    fontSize: 15,
    color: '#3b3b3b'
  },
  photo: {
    position: 'absolute',
    top: -70,
    left: 100
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
module.exports = ProgramInfo;
