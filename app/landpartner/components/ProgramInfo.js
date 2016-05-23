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
import Home from '../../view/index/Home'
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
      photoArray: [],
    }
  },
  selectPhotoHandler(){
    if (this.props.maxCount > this.props.selectPhoto.length) {
      this.props.selectPhotoHandler({
        count: (this.props.maxCount - this.props.selectPhoto.length),
        tag: this.props.selectTag,
        callBack: this.props.selectPhotoSuccess
      });
    }
  },
  _nextFun() {
    if (!typeinData.ProjectInfo.CompanyName) {
      return Util.AlertMessage('请填写公司名称')
    }
    if (!typeinData.ProjectInfo.Contacts) {
      return Util.AlertMessage('请填写联系人')
    }
    if (!typeinData.ProjectInfo.ContactPhone) {
      return Util.AlertMessage('请填写联系电话')
    }
    if (!typeinData.ProjectInfo.ConstructionSituation) {
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
        url: 'http://www.yuanxin2015.com/MobileBusiness/LandInfoService/api/LandInfo/InsertLandInfo',
        body: JSON.stringify(typeinData),
        success: (response) => {
          console.log(response.message)
          this.props.maskViewHandler(false)
          if (JSON.parse(response.message).status == 'SUCCESS') {
            Util.AlertMessage("保存成功")
            this.props.navigator.popToTop()
          } else {
            Util.AlertMessage("保存失败")
            this.props.jumpReplacePage(Recommend, 'recommend')
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
        url: 'http://www.yuanxin2015.com/MobileBusiness/LandInfoService/api/LandInfo/InsertLandInfo',
        body: JSON.stringify(typeinData),
        success: (response) => {
          this.props.maskViewHandler(false)

        }
      })
  },
  submitMerchant(){
    this.props.sendPostJSON({
      url: 'http://www.yuanxin2015.com/MobileBusiness/LandInfoService/api/LandInfo/InsertLandInfo',
      body: JSON.stringify(typeinData),
      success: (response) => {
        this.props.maskViewHandler(false)
        if (JSON.parse(response.message).status == 'SUCCESS') {
          Util.AlertMessage("保存成功")
          this.props.navigator.popToTop()
        } else {
          Util.AlertMessage("保存失败")
          this.props.jumpReplacePage(Recommend, 'recommend')
        }
      }
    })
  },
  uploadFileOneSuccess(e) {
    let newsFileList
    newsFileList = OSSUtil.setFileSuccess(e[0], this.state.photoArray)
    this.state.photoArray = newsFileList
    this.setState(this.state)
    for (let i = 0; i < this.state.photoArray.length; i++) {
      typeinData.ProjectImageInfoList.push(OSSUtil.getItemFile(this.state.photoArray))
    }
    this.checkAllFileSuccess()


  },
  checkFileSuccess(fileList){
    let isAllSuccess = true;
    for (let i = 0; i < fileList.length; i++) {
      if (!fileList[i].UpdateLoadUrl) {
        isAllSuccess = false;
      }
    }
    return isAllSuccess;
  },
  checkAllFileSuccess(){
    let photoArray = this.checkFileSuccess(this.state.photoArray);
    if (photoArray) {
      this.submitMerchant();
    }
  },
  uploadFileSuccess(e){
      if (Platform.OS == 'android')
          this.androidImageSuccess(e);
      else
          this.uploadFileOneSuccess(e);
  },
  
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
        url: 'http://www.yuanxin2015.com/MobileBusiness/LandInfoService/api/LandInfo/InsertLandInfo',
        body: JSON.stringify(typeinData),
        success: (response) => {
          console.log(response.message)
          this.props.maskViewHandler(false)
          if (JSON.parse(response.message).status == 'SUCCESS') {
            Util.AlertMessage("保存成功")
            this.props.navigator.popToTop()
          } else {
            Util.AlertMessage("保存失败")
            this.props.jumpReplacePage(Recommend, 'recommend')
          }
        }
      })
    }
  },
  // _save() {
  //   if (!typeinData.ProjectInfo.CompanyName) {
  //     return Util.AlertMessage('请填写公司名称')
  //   }
  //   if (!typeinData.ProjectInfo.Contacts) {
  //     return Util.AlertMessage('请填写联系人')
  //   }
  //   if (!typeinData.ProjectInfo.ContactPhone) {
  //     return Util.AlertMessage('请填写联系电话')
  //   }
  //   if (!typeinData.ProjectInfo.ConstructionSituation) {
  //     return Util.AlertMessage('请填写建设情况')
  //   }
  //   typeinData.OperationType = 0
  //   typeinData.LandInfo = paramsProgramInfo.LandInfo
  //
  //   this.props.maskViewHandler(true)
  //   this.props.sendPostJSON({
  //     url: 'http://mobiletest.yuanxin2015.com/LandPartnerAPI/api/LandInfo/InsertLandInfo',
  //     body: JSON.stringify(typeinData),
  //     success: (response) => {
  //       this.props.maskViewHandler(false)
  //       if (JSON.parse(response.message).status == 'SUCCESS') {
  //         Util.AlertMessage("保存成功")
  //         this.props.navigator.popToTop()
  //       } else {
  //         Util.AlertMessage("保存失败")
  //         this.props.jumpReplacePage(LandIndex, 'landIndex')
  //       }
  //     }
  //   })
  //   let uploadImg = this.getUserSelectPhotoList()
  //   if (uploadImg.length > 0) {
  //     this.props.uploadFileHandler({
  //       data: uploadImg,
  //       callBack: this.uploadFileSuccess
  //     })
  //   }
  //
  //
  // },
  render() {
    let photoProps = {
      selectPhoto: this.state.photoArray,
      maxCount: 3,
      selectTag: 'photoArray',
      deleteSelectPhone: this.deleteSelectPhone,
      selectPhotoHandler: this.props.selectPhotoHandler,
      selectPhotoSuccess: this.selectPhotoSuccess
    }


    return (
      <View style={styles.container}>
        <ActionBar actionName="项目信息" isDefaultBack={this.props.jumpPop} />
        <ScrollView>
          <View>
            <Text allowFontScaling={false} style={styles.starView}>*</Text>
            <InputLabel label="公司名称" tabs="CompanyName" getValue={this.getValue} />
          </View>
          <View>
            <Text allowFontScaling={false} style={styles.starView}>*</Text>
            <InputLabel label="联系人" tabs="Contacts" getValue={this.getValue} />
          </View>
          <View>
            <Text allowFontScaling={false} style={styles.starView}>*</Text>
            <InputLabel label="联系电话" boardType="numeric" tabs="ContactPhone" getValue={this.getValue} />
          </View>
          <View>
            <Text allowFontScaling={false} style={styles.starView}>*</Text>
            <InputLabel label="建设情况" tabs="ConstructionSituation" getValue={this.getValue} />
          </View>
          <InputLabel label="其它信息" tabs="OtherInfo" getValue={this.getValue} />
          <View style={styles.photoContainer}>
            <Text allowFontScaling={false} style={styles.photoText}>上传图片（最多选3张）</Text>
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
                userClick={this._nextFun}
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
    backgroundColor: '#FFFFFF',

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
  starView:{
    color:'red',
    fontSize:12,
    position:'absolute',
    top:10,
    left:5,
  },
  listItems: {
    padding: 5,
    backgroundColor: '#FFFFFF'
  },
  photoContainer: {
    width:Dimensions.get('window').width,
    marginLeft:5,
  },
  photoText: {
    height:40,
    fontSize: 15,
    color:'#3b3b3b',
    marginLeft:10,
    marginTop:10,
  },
  photoTextBottom:{
    marginTop:5,
    marginLeft:15,
    fontSize: 11,
    color: '#a7a7a7',
  },
  photo: {

  },
  nexBtn: {
    margin: 10,
    flex: 1
  },
  btnGroup: {
    flexDirection: 'row',
    marginTop:20,
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
