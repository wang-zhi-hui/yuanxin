import React, {
  Component,
  Dimensions,
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native'
import ActionBar from '../../control/ActionBar'
import Button from './button'
import Recommend from '../Recommend'
import AddRecomEdit from './AddRecomEdit'
import TransLandEdit from './TransLandEdit'
var typeinData = {}
export default class RecommendDesc extends Component {
  constructor(props) {
    super(props)
    this.state = {
      btn: null
    }
  }
  _submit() {
    typeinData.Code = paramsRecommendDesc.Code
    this.props.sendPostJSON({
      url: 'http://mobiletest.yuanxin2015.com/LandPartnerAPI/api/LandInfo/UpdateLandInfoToLandDataBaseAndSeagull2DataBaseAboutCode',
      body: JSON.stringify(typeinData),
      success: (response) => {
        console.log(response.message);
        this.props.maskViewHandler(false)
        if (JSON.parse(response.message).status == 'SUCCESS') {
          alert("保存成功")
          this.props.jumpPop()
        } else {
          alert("保存失败")
          this.props.navigator.popToTop()
        }
      }
    })
  }
  editFun() {
    if (paramsRecommendDesc.LandSourcesName == '招拍挂') {
      this.props.jumpPushPage(AddRecomEdit, 'addRecomEdit', paramsAddRecom={...paramsRecommendDesc})
    } else {
      this.props.jumpPushPage(TransLandEdit, 'transLandEdit', paramsTransLand={...paramsRecommendDesc})
    }
  }
  render() {
    let actionBarProp = {
      actionName: '推荐详情',
      isDefaultBack: this.props.jumpPop
    }
    if (paramsRecommendDesc.StatusImageInfoCode == -2) {
      this.state.btn = <View style={styles.nexBtn}>
                        <Button btnText="提交" clickFun={this._submit.bind(this)}/>
                      </View>
      actionBarProp.actionBarRightProp = {
          text: '编辑',
          click: () => this.editFun()
      }
    }
    let address = paramsRecommendDesc.Province + '   ' + paramsRecommendDesc.City + '   '
    if (paramsRecommendDesc.County) {
      address += paramsRecommendDesc.County
    }
    return (
      <View style={styles.container}>
        <ActionBar {...actionBarProp} />
        <View style={styles.imgContainer}>
          <Image source={{uri: paramsRecommendDesc.StatusImageInfo[0].CommitUrl}} style={styles.topImg} />
          <Image source={{uri: paramsRecommendDesc.StatusImageInfo[0].AppraiseUrl}} style={styles.topImg}/>
          <Image source={{uri: paramsRecommendDesc.StatusImageInfo[0].ProtocolUrl}} style={styles.topImg}/>
          <Image source={{uri: paramsRecommendDesc.StatusImageInfo[0].CommisionUrl}} style={styles.topImg}/>
        </View>
        <View style={styles.greyLine}></View>
        <View style={styles.infoTop}>
          <View style={styles.h3Container}>
            <Text style={styles.h3}>位置信息：</Text>
          </View>
          <View style={styles.bottomInfo}>
            <Text style={styles.textItem}>土地来源：{paramsRecommendDesc.LandSourcesName}</Text>
            <Text style={styles.textItem}>所在地区：{address}</Text>
            <Text style={styles.textItem}>详细地址：{paramsRecommendDesc.AddressDetail}</Text>
          </View>
        </View>
        <View style={styles.greyLine}></View>
        <View style={styles.infoBottom}>
          <View style={styles.h3Container}>
            <Text style={styles.h3}>地块详情:</Text>
          </View>
          <Text style={styles.ls}>四至：{paramsRecommendDesc.LandScope}</Text>
          <View style={styles.bottomContain}>
            <View style={styles.bottomInfo}>
              <Text style={styles.textItem}>用地性质：{paramsRecommendDesc.LandNatureName}</Text>
              <Text style={styles.textItem}>规划建筑面积：{paramsRecommendDesc.PlanBuildAreas}</Text>
              <Text style={styles.textItem}>绿化率：{paramsRecommendDesc.GreeninGate}</Text>
              <Text style={styles.textItem}>通平情况：{paramsRecommendDesc.MunicipalSupporName}</Text>
              <Text style={styles.textItem}>推出时间：{paramsRecommendDesc.LaunchTime}</Text>
            </View>
            <View style={styles.bottomInfo}>
              <Text style={styles.textItem}>建设用地面积：{paramsRecommendDesc.BuildLandAreas}</Text>
              <Text style={styles.textItem}>出让形式：{paramsRecommendDesc.TransferFormName}</Text>
              <Text style={styles.textItem}>限高：{paramsRecommendDesc.HighLimit}</Text>
              <Text style={styles.textItem}>拆迁情况：{paramsRecommendDesc.DemolitionSituationName}</Text>
              <Text style={styles.textItem}>起始价：{paramsRecommendDesc.StartingPrice}</Text>
            </View>
          </View>
        </View>
        {this.state.btn}
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF'
  },
  imgContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10
  },
  greyLine: {
    height: 10,
    backgroundColor: '#efeff4',
    alignSelf: 'stretch'
  },
  topState: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  topImg: {
    width: 80,
    height: 57
  },
  infoTop: {
    flexDirection: 'column'
  },
  textItem: {
    margin: 5,

  },
  h3Container: {
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb'
  },
  h3: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10
  },
  ls: {
    margin: 10
  },
  bottomContain: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb'
  },
  bottomInfo: {
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 10,
    width: Dimensions.get('window').width / 2 - 10
  },
  nexBtn: {
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10
  },
})
